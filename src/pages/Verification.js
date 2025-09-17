import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Verification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please check your email for the verification code
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <SignUp 
            routing="path"
            path="/sign-up/verify"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-none bg-transparent",
                headerTitle: "text-2xl font-bold text-gray-900 dark:text-white",
                headerSubtitle: "text-gray-600 dark:text-gray-400",
                formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                footerActionLink: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Verification;