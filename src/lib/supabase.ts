
import { createClient } from '@supabase/supabase-js';

// Hard-coded fallback values for development purposes only
// Replace these with your actual Supabase URL and anon key
const FALLBACK_URL = 'https://your-project-url.supabase.co';
const FALLBACK_KEY = 'your-anon-key';

// Try to get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY;

// Log a warning if using fallback values
if (supabaseUrl === FALLBACK_URL || supabaseAnonKey === FALLBACK_KEY) {
  console.warn(
    'Using fallback Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables or update the fallback values in src/lib/supabase.ts with your actual Supabase URL and anon key.'
  );
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== FALLBACK_URL && supabaseAnonKey !== FALLBACK_KEY;
};
