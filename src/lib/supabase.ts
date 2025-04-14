
import { createClient } from '@supabase/supabase-js';

// Supabase public URL and anon key (safe to use in browser)
// These are automatically available through the Lovable integration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
