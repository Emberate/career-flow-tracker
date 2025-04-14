
-- Run this in your Supabase SQL Editor to create the necessary stored procedures and table

-- Create extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the stored procedure to create the jobs table if it doesn't exist
CREATE OR REPLACE FUNCTION create_jobs_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the jobs table already exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'jobs'
  ) THEN
    -- Create the jobs table
    CREATE TABLE public.jobs (
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
    
    -- Add RLS policies
    ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
    
    -- Create a policy that allows users to see only their own jobs
    CREATE POLICY "Users can only access their own jobs"
      ON public.jobs
      FOR ALL
      USING (auth.uid() = user_id);
      
    -- Create index for better performance
    CREATE INDEX jobs_user_id_idx ON public.jobs (user_id);
  END IF;
END;
$$;

-- Create a general purpose SQL execution function (use with caution in production)
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_query;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION create_jobs_table() TO anon;
GRANT EXECUTE ON FUNCTION create_jobs_table() TO authenticated;
GRANT EXECUTE ON FUNCTION create_jobs_table() TO service_role;

GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO service_role;
