
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFooterProps {
  type: 'login' | 'signup';
}

const AuthFooter: React.FC<AuthFooterProps> = ({ type }) => {
  return (
    <div className="mt-6 text-center text-sm">
      {type === 'login' ? (
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthFooter;
