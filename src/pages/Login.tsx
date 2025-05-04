
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoLogin = () => {
    // Simple demo login - in a real app this would validate credentials
    toast({
      title: "Demo login successful",
      description: "Welcome to the dashboard!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Demo Mode</h2>
            <p className="mt-2 text-center text-gray-600">
              This is a demo application. Click below to continue to the dashboard.
            </p>
          </div>
          <div className="mt-6">
            <Button 
              className="w-full py-6 text-lg"
              onClick={handleDemoLogin}
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
