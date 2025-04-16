
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Linkedin, Briefcase, Mail, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === 'login') {
        await login(email, password);
        toast({
          title: "Login successful",
          description: "Welcome back to CareerFlow!",
        });
      } else {
        await signup(email, name, password);
        toast({
          title: "Account created",
          description: "Welcome to CareerFlow! Your account has been created.",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication error",
        description: error instanceof Error ? error.message : "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    
    // Simulate login delay
    setTimeout(() => {
      toast({
        title: "Demo Mode",
        description: `Social login with ${provider} is not available in demo mode. Please use email login.`,
      });
      setSocialLoading(null);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {type === 'login' ? 'Log In to Your Account' : 'Create Your Account'}
      </h2>
      
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          This is a demo application. Use any email and password to login.
        </AlertDescription>
      </Alert>
      
      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          type="button" 
          className="w-full bg-[#0077b5] hover:bg-[#0077b5]/90" 
          onClick={() => handleSocialLogin('LinkedIn')}
          disabled={!!socialLoading}
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
          onClick={() => handleSocialLogin('Indeed')}
          disabled={!!socialLoading}
        >
          {socialLoading === 'Indeed' ? (
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
              Continue with Indeed
            </>
          )}
        </Button>
      </div>
      
      <div className="relative my-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
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
              {type === 'login' ? 'Login with Email' : 'Create Account'}
            </span>
          )}
        </Button>
      </form>
      
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
