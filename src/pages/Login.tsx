
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { SignIn, useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoaded, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated with Clerk
  React.useEffect(() => {
    if (isLoaded && userId) {
      navigate('/dashboard');
    }
  }, [isLoaded, userId, navigate]);

  // Redirect if already in demo mode
  React.useEffect(() => {
    if (sessionStorage.getItem('demoMode') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // Set demo mode flag in session storage
    sessionStorage.setItem('demoMode', 'true');
    
    // Simple demo login - in a real app this would validate credentials
    setTimeout(() => {
      toast({
        title: "Demo login successful",
        description: "Welcome to the dashboard!",
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b bg-blue-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animate-delay-200"></div>
        
        <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 rounded-xl">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h2>
              <p className="text-gray-500">Sign in to your account to continue</p>
            </div>
            
            <div className="mb-6">
              {isLoaded ? (
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "w-full mx-auto",
                      card: "shadow-none p-0 border-0 bg-transparent",
                      header: "pb-2",
                      footer: "hidden"
                    }
                  }}
                  redirectUrl="/dashboard" 
                  signUpUrl="/signup"
                />
              ) : (
                <div className="w-full flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              )}
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  or try it instantly
                </span>
              </div>
            </div>
            
            <Button 
              className="w-full py-6 text-lg transition-all hover:shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              onClick={handleDemoLogin}
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
                "Continue as Demo User"
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* Additional decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
    </div>
  );
};

export default Login;
