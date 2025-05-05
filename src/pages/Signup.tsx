
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already in demo mode
  useEffect(() => {
    if (sessionStorage.getItem('demoMode') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleDemoSignup = () => {
    // Set demo mode flag in session storage
    sessionStorage.setItem('demoMode', 'true');
    
    // Simple demo signup - in a real app this would create an account
    toast({
      title: "Demo account created",
      description: "Welcome to the dashboard!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthForm type="signup" />
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                or try the demo
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full py-6 text-lg"
            onClick={handleDemoSignup}
          >
            Skip & Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
