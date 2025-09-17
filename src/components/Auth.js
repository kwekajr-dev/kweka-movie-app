import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const Auth = ({ mode = 'signin' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          {mode === 'signin' ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Auth;