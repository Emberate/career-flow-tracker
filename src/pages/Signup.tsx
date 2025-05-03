
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const attemptAutoSignup = async () => {
      if (!isAuthenticated) {
        try {
          // Use dummy credentials for automatic signup
          await signup("demo@example.com", "Demo User", "password123");
          navigate('/dashboard');
        } catch (error) {
          console.error("Auto-signup failed:", error);
          // If auto-signup fails, user can still use the form
        }
      } else {
        navigate('/dashboard');
      }
    };

    attemptAutoSignup();
  }, [isAuthenticated, navigate, signup]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default Signup;
