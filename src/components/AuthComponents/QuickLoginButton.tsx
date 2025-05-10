
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface QuickLoginButtonProps {
  type: 'login' | 'signup';
  className?: string;
}

const QuickLoginButton: React.FC<QuickLoginButtonProps> = ({ type, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use a pre-defined demo account
  const demoEmail = "demo@example.com"; 
  const demoPassword = "Demo123456!";
  const demoName = "Demo User";

  const handleQuickAccess = async () => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    
    try {
      // Skip real authentication and use demo mode directly
      sessionStorage.setItem('demoMode', 'true');
      
      toast({
        title: "Using demo mode",
        description: "Continuing in demo mode without authentication",
      });
      
      // Navigate to dashboard directly
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Demo mode error:', error);
      toast({
        title: "Error",
        description: "Failed to enter demo mode. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      className={`w-full ${className}`}
      onClick={handleQuickAccess}
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
          {type === 'login' ? 'Skip & Continue as Guest' : 'Skip & Continue as Guest'}
        </span>
      )}
    </Button>
  );
};

export default QuickLoginButton;
