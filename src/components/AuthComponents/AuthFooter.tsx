
import React from 'react';

interface AuthFooterProps {
  type: 'login' | 'signup';
}

const AuthFooter: React.FC<AuthFooterProps> = ({ type }) => {
  return (
    <div className="mt-6 text-center text-sm">
      {type === 'login' ? (
        <p>
          Don't have an account?{' '}
          <a href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>
      ) : (
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-primary font-medium hover:underline">
            Log in
          </a>
        </p>
      )}
    </div>
  );
};

export default AuthFooter;
