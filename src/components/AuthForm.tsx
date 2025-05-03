import React from 'react';
import { Separator } from '@/components/ui/separator';
import AuthAlert from './AuthComponents/AuthAlert';
import QuickLoginButton from './AuthComponents/QuickLoginButton';
import SocialButtons from './AuthComponents/SocialButtons';
import AuthFooter from './AuthComponents/AuthFooter';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {type === 'login' ? 'Log In to Your Account' : 'Create Your Account'}
      </h2>
      
      <AuthAlert />
      
      {/* Quick Access Button */}
      <QuickLoginButton type={type} />
      
      <div className="relative my-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or use social login</span>
        </div>
      </div>
      
      {/* Social Login Buttons */}
      <SocialButtons />
      
      <AuthFooter type={type} />
    </div>
  );
};

export default AuthForm;
