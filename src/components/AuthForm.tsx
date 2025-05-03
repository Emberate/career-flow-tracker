
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Linkedin, Briefcase, Mail, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickLogin = async () => {
    setIsLoading(true);
    try {
      // Use dummy credentials
      const email = "demo@example.com";
      const password = "password123";

      if (type === 'login') {
        await login(email, password);
      } else {
        await signup(email, "Demo User", password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: `Quick ${type} failed`,
        description: "There was an issue with the authentication. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {type === 'login' ? 'Log In to Your Account' : 'Create Your Account'}
      </h2>
      
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          Click the button below to access the dashboard with demo credentials.
          No real authentication required!
        </AlertDescription>
      </Alert>
      
      {/* Quick Access Button */}
      <Button 
        type="button" 
        className="w-full mb-6" 
        onClick={handleQuickLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            {type === 'login' ? 'Quick Login to Dashboard' : 'Quick Signup & Access Dashboard'}
          </span>
        )}
      </Button>
      
      <div className="relative my-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or use social login</span>
        </div>
      </div>
      
      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          type="button" 
          className="w-full bg-[#0077b5] hover:bg-[#0077b5]/90" 
          onClick={() => setSocialLoading('LinkedIn')}
          disabled={!!socialLoading || isLoading}
        >
          {socialLoading === 'LinkedIn' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <Linkedin className="mr-2 h-4 w-4" />
              Continue with LinkedIn
            </>
          )}
        </Button>
        
        <Button 
          type="button" 
          className="w-full bg-[#003A9B] hover:bg-[#003A9B]/90" 
          onClick={() => setSocialLoading('Google')}
          disabled={!!socialLoading || isLoading}
        >
          {socialLoading === 'Google' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <Briefcase className="mr-2 h-4 w-4" />
              Continue with Google
            </>
          )}
        </Button>
      </div>
      
      <div className="mt-6 text-center text-sm">
        {type === 'login' ? (
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-primary font-medium hover:underline">
              Log in
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
