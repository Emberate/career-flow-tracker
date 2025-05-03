
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const attemptAutoLogin = async () => {
      if (!isAuthenticated) {
        try {
          // Use dummy credentials for automatic login
          await login("demo@example.com", "password123");
          navigate('/dashboard');
        } catch (error) {
          console.error("Auto-login failed:", error);
          // If auto-login fails, user can still use the form
        }
      } else {
        navigate('/dashboard');
      }
    };

    attemptAutoLogin();
  }, [isAuthenticated, navigate, login]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;
