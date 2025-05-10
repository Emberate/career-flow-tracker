
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
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

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If the error is about email not confirmed, try to sign up again
        if (error.message.includes('Email not confirmed')) {
          console.log("Email not confirmed, attempting to create/verify account...");
          
          // Try to sign up with the same credentials
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: "User",
              },
            }
          });
          
          if (signUpError) {
            if (signUpError.message.includes('User already registered')) {
              toast({
                title: "Email verification required",
                description: "Please check your email inbox and click the confirmation link to verify your account.",
                variant: "destructive",
              });
              throw new Error("Please verify your email before logging in");
            }
            throw signUpError;
          }
          
          // Try directly signing in again - this works in development with confirmations disabled
          const { error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (retryError) {
            toast({
              title: "Email verification required",
              description: "Please check your email inbox and click the confirmation link to verify your account.",
              variant: "destructive",
            });
            throw retryError;
          }
        } else {
          throw error;
        }
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to CareerFlow!",
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific errors
      if (error.message && error.message.includes('rate limit')) {
        toast({
          title: "Login temporarily unavailable",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      } else if (error.message && error.message.includes('Email not confirmed')) {
        toast({
          title: "Email verification required",
          description: "Please check your email and click the verification link",
          variant: "destructive",
        });
      } else if (error.message && error.message.includes('invalid')) {
        toast({
          title: "Login failed",
          description: "Please check your email format and try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login failed",
          description: error.message || "An error occurred during login",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    try {
      // Create the user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) {
        // Handle specific errors
        if (signUpError.message.includes('rate limit')) {
          throw new Error("Too many signup attempts. Please try again in a moment.");
        } else if (signUpError.message.includes('invalid')) {
          throw new Error("Please use a valid email format.");
        } else if (signUpError.message.includes('User already registered')) {
          console.log("User already registered, trying to sign in directly");
          // If user is already registered, try to sign in directly
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (signInError) {
            if (signInError.message.includes('Email not confirmed')) {
              toast({
                title: "Email verification required",
                description: "Please check your email inbox and click the confirmation link.",
                variant: "destructive",
              });
              throw new Error("Please verify your email before logging in");
            }
            throw signInError;
          }
          
          toast({
            title: "Login successful",
            description: "Welcome back to CareerFlow!",
          });
          
          return;
        }
        throw signUpError;
      }
      
      // Check if email confirmation is required
      if (data?.user && !data.session) {
        toast({
          title: "Signup successful",
          description: "Please check your email inbox and click the confirmation link.",
        });
        return;
      }
      
      // If we got here, it means email confirmation is not required
      // Let's try to sign in directly
      if (!data?.session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
      }
      
      toast({
        title: "Signup successful",
        description: "Welcome to CareerFlow! Your account has been created.",
      });
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
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
      updateUserProfile
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
