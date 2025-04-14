
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
