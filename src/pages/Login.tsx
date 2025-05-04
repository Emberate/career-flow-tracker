
import React from 'react';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Demo Mode</h2>
          <p className="text-gray-500 mt-2">Use the Quick Login button below to access the dashboard.</p>
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;
