
import React from 'react';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';

const Login = () => {
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
