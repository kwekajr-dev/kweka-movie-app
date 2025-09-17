import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          
          <div className="p-6">
            {/* User Profile Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Information</h2>
              <div className="flex items-center mb-4">
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName}
                  className="h-16 w-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user?.fullName}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Notifications
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Actions Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Update Profile
                </button>
                
                <button className="w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md ml-0 md:ml-2">
                  Change Password
                </button>
                
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-0 md:ml-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;