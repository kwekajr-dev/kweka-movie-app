import React from 'react';
import { SignedIn, RedirectToSignIn } from '@clerk/clerk-react';
import { Verify, useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
};

export default ProtectedRoute;