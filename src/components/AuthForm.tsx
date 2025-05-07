
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import AuthFooter from './AuthComponents/AuthFooter';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simple frontend-only authentication simulation
    setTimeout(() => {
      console.log('Form submitted with:', { email, password, username });
      
      // Basic validation
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
      
      // Set demo mode flag in session storage
      sessionStorage.setItem('demoMode', 'true');

      // Show success message
      toast({
        title: type === 'login' ? "Login successful" : "Account created successfully",
        description: "Welcome to the dashboard!",
      });

      // Simulate successful login/signup - always direct to dashboard
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      {/* Regular login/signup form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {type === 'signup' && (
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id="username"
                type="text"
                placeholder="Enter your username"
                className="pl-10 bg-white/70 border-gray-200 focus:border-blue-300 h-12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 bg-white/70 border-gray-200 focus:border-blue-300 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 bg-white/70 border-gray-200 focus:border-blue-300 h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-medium transition-all bg-blue-600 hover:bg-blue-700"
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
            <span>{type === 'login' ? 'Log In' : 'Sign Up'}</span>
          )}
        </Button>
      </form>
      
      <AuthFooter type={type} />
    </div>
  );
};

export default AuthForm;
