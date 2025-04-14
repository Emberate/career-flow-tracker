
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

interface User {
  email: string;
  name: string;
  provider?: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  loginWithIndeed: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to transform Supabase user to our User type
  const transformUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
    if (!supabaseUser) return null;

    // Check if user profile exists in profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError);
    }

    // If profile doesn't exist, create one
    if (!profile) {
      const newProfile = {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        provider: supabaseUser.app_metadata.provider || 'email'
      };

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([newProfile]);

      if (insertError) {
        console.error('Error creating profile:', insertError);
      }

      return newProfile;
    }

    return {
      id: supabaseUser.id,
      email: profile.email || supabaseUser.email || '',
      name: profile.name || supabaseUser.user_metadata.name || 'User',
      provider: profile.provider || supabaseUser.app_metadata.provider || 'email'
    };
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const userData = await transformUser(session.user);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData = await transformUser(session.user);
          setUser(userData);
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
        } else if (event === 'USER_UPDATED' && session) {
          const userData = await transformUser(session.user);
          setUser(userData);
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      const userData = await transformUser(data.user);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login');
    }
  };

  // Sign up with email, password, and name
  const signup = async (email: string, name: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) throw error;

      // Create profile in profiles table
      if (data.user) {
        const newProfile = {
          id: data.user.id,
          email,
          name,
          provider: 'email'
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([newProfile]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        setUser(newProfile);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  // Login with LinkedIn (mock implementation)
  const loginWithLinkedIn = async () => {
    try {
      // In a real implementation, you would use Supabase OAuth
      // For now, we'll create a mock implementation
      toast({
        title: "LinkedIn Login",
        description: "OAuth is not fully implemented. Please use email login for now.",
      });
      
      // This is a placeholder for the real implementation
      // await supabase.auth.signInWithOAuth({
      //   provider: 'linkedin',
      // });
      
      // For demo purposes, we'll create a random user
      const randomId = Math.floor(Math.random() * 10000);
      const mockUser = {
        id: `linkedin_${randomId}`,
        email: `linkedin_user_${randomId}@example.com`,
        name: `LinkedIn User ${randomId}`,
        provider: 'linkedin'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login with LinkedIn');
    }
  };

  // Login with Indeed (mock implementation)
  const loginWithIndeed = async () => {
    try {
      // In a real implementation, you would use Supabase OAuth
      // For now, we'll create a mock implementation
      toast({
        title: "Indeed Login",
        description: "OAuth is not fully implemented. Please use email login for now.",
      });
      
      // For demo purposes, we'll create a random user
      const randomId = Math.floor(Math.random() * 10000);
      const mockUser = {
        id: `indeed_${randomId}`,
        email: `indeed_user_${randomId}@example.com`,
        name: `Indeed User ${randomId}`,
        provider: 'indeed'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login with Indeed');
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      // Update user metadata if name is changed
      if (updates.name) {
        await supabase.auth.updateUser({
          data: { name: updates.name }
        });
      }

      // Update profile in profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setUser({ ...user, ...updates });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      loginWithLinkedIn, 
      loginWithIndeed, 
      logout, 
      isAuthenticated,
      updateUserProfile
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
