import React from 'react';
import { UserProfile as ClerkUserProfile } from '@clerk/clerk-react';

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <ClerkUserProfile />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;