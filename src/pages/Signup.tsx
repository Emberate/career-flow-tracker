
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';
import { useToast } from '@/components/ui/use-toast';
import { isSupabaseConfigured } from '../lib/supabase';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Signup = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {!isSupabaseConfigured() && (
          <Alert variant="destructive" className="max-w-md w-full mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>
              You need to configure Supabase to use authentication. Please update the Supabase URL and anon key in src/lib/supabase.ts.
            </AlertDescription>
          </Alert>
        )}
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default Signup;
