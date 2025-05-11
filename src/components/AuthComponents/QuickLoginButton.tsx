
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface QuickLoginButtonProps {
  type: 'login' | 'signup';
  className?: string;
}

const QuickLoginButton: React.FC<QuickLoginButtonProps> = ({ type, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGuestAccess = async () => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    
    try {
      // Set demo mode flag in session storage
      sessionStorage.setItem('demoMode', 'true');
      
      toast({
        title: "Guest Access",
        description: "Exploring in guest mode. No account required.",
      });
      
      // Navigate to dashboard directly
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Guest mode error:', error);
      toast({
        title: "Error",
        description: "Failed to access guest mode. Please try again.",
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
      onClick={handleGuestAccess}
      disabled={isLoading}
      variant="outline"
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center">
          <LogIn className="mr-2 h-4 w-4" />
          Continue as Guest
        </span>
      )}
    </Button>
  );
};

export default QuickLoginButton;
