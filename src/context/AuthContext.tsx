
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        if (currentSession?.user) {
          // Fetch user profile when session changes
          // Use setTimeout to avoid potential deadlock with Supabase
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      
      toast({
        title: "Redirecting...",
        description: `Connecting to ${provider}...`,
      });
      
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Authentication failed",
        description: error.message || `Could not authenticate with ${provider}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If authentication fails, try direct signup and login
        if (error.message.includes('Invalid login credentials')) {
          // Try signup first
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: email.split('@')[0], // Use part of email as name
              },
            }
          });
          
          // If signup worked or user already exists, try login again
          if (!signUpError || signUpError.message.includes('User already registered')) {
            // Try login again
            const { error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            
            // If login still fails, show specific error
            if (retryError) {
              throw retryError;
            }
          } else {
            throw signUpError;
          }
        } else {
          throw error;
        }
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to ProspectPath!",
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific errors
      if (error.message && error.message.includes('Email not confirmed')) {
        // If email not confirmed, use demo mode
        sessionStorage.setItem('demoMode', 'true');
        toast({
          title: "Using guest mode",
          description: "Continuing as a guest user",
        });
        window.location.href = '/dashboard';
        return;
      }
      
      toast({
        title: "Login failed",
        description: "Please try with social login or continue as guest",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    try {
      setIsLoading(true);
      // Create the user without email confirmation
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        // If user already exists, try direct login
        if (error.message.includes('User already registered')) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (signInError) {
            if (signInError.message.includes('Email not confirmed')) {
              // If email not confirmed, use demo mode
              sessionStorage.setItem('demoMode', 'true');
              toast({
                title: "Using guest mode",
                description: "Continuing as a guest user",
              });
              window.location.href = '/dashboard';
              return;
            }
            throw signInError;
          }
          
          toast({
            title: "Login successful",
            description: "Welcome back to ProspectPath!",
          });
          return;
        }
        throw error;
      }
      
      // If we got a session, proceed to dashboard
      if (data?.session) {
        toast({
          title: "Signup successful",
          description: "Welcome to ProspectPath!",
        });
      } else {
        // If no session but signup worked, try direct login
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          // If login fails due to email confirmation, use demo mode
          if (signInError.message.includes('Email not confirmed')) {
            sessionStorage.setItem('demoMode', 'true');
            toast({
              title: "Using guest mode",
              description: "Continuing as a guest user",
            });
            window.location.href = '/dashboard';
            return;
          }
          throw signInError;
        }
        
        toast({
          title: "Signup successful",
          description: "Welcome to ProspectPath!",
        });
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "Please try with social login or continue as guest",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear demo mode if active
      sessionStorage.removeItem('demoMode');
      
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: error.message || "An error occurred while updating your profile",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      session,
      login, 
      signup, 
      logout, 
      isAuthenticated,
      isLoading,
      updateUserProfile,
      signInWithProvider
    }}>
      {children}
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
