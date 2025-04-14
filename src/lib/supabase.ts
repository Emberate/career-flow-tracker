
import { createClient } from '@supabase/supabase-js';

// Secure, configurable Supabase client setup
const FALLBACK_URL = 'https://umgvcprfekjcshaujxua.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ3ZjcHJmZWtqY3NoYXVqeHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDQwMjMsImV4cCI6MjA2MDE4MDAyM30.0u3C55ZzrFmzxArsUMkeBx3cO3rWPkdWsmu3Va9tjXQ';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY;

if (supabaseUrl === FALLBACK_URL || supabaseAnonKey === FALLBACK_KEY) {
  console.warn(
    'Using fallback Supabase credentials. Please set up Supabase integration securely.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return supabaseUrl !== FALLBACK_URL && supabaseAnonKey !== FALLBACK_KEY;
};

// Helper function to ensure the jobs table exists
export const ensureJobsTable = async (userId: string) => {
  try {
    // First, check if the jobs table exists
    const { error: tableCheckError } = await supabase
      .from('jobs')
      .select('id', { count: 'exact', head: true });
    
    // If the table doesn't exist, create it
    if (tableCheckError && tableCheckError.code === '42P01') {
      console.log('Jobs table does not exist, creating...');
      
      // Execute a direct SQL query to create the jobs table
      const { error: sqlError } = await supabase.rpc('create_jobs_table');
      
      if (sqlError) {
        console.error('Error creating jobs table:', sqlError);
        
        // Try an alternative approach with direct SQL if RPC fails
        const { error: directSqlError } = await supabase.rpc('execute_sql', {
          sql_query: `
            CREATE TABLE IF NOT EXISTS public.jobs (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              user_id UUID NOT NULL,
              title TEXT NOT NULL,
              company TEXT NOT NULL,
              dateApplied TEXT NOT NULL,
              status TEXT NOT NULL,
              notes TEXT,
              jobLink TEXT,
              resumeLink TEXT,
              coverLetterLink TEXT,
              companyNotes TEXT,
              interviewDate TEXT,
              interviewNotes TEXT,
              reminderDate TEXT,
              reminderNote TEXT,
              tags TEXT[] DEFAULT '{}',
              questions JSONB DEFAULT '[]',
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
            
            ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
            
            CREATE POLICY "Users can only access their own jobs"
              ON public.jobs
              FOR ALL
              USING (auth.uid() = user_id);
              
            CREATE INDEX IF NOT EXISTS jobs_user_id_idx ON public.jobs (user_id);
          `
        });
        
        if (directSqlError) {
          console.error('Error with direct SQL creation:', directSqlError);
          return false;
        }
      }
      
      console.log('Jobs table created successfully');
      return true;
    }
    
    console.log('Jobs table exists');
    return true;
  } catch (error) {
    console.error('Error ensuring jobs table exists:', error);
    return false;
  }
};

// Helper function to fix UUID generation issues
export const fixJobsUuid = async (job: any) => {
  // Make sure we're using a proper UUID
  if (!job.id || job.id.length < 32) {
    job.id = crypto.randomUUID();
  }
  return job;
};
