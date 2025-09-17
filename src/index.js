// index.js (updated)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ScrollToTop } from './components';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      routing="path"
      path="/"
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/verify-email"
      afterSignOutUrl="/home"
      appearance={{
        elements: {
          formButtonPrimary: "bg-[#F54927] hover:bg-[#d93e20] text-sm normal-case",
          socialButtonsBlockButton: 'hidden',
          formFieldInput: "border-gray-300 focus:border-[#F54927] focus:ring-[#F54927] dark:bg-gray-800 dark:border-gray-700 dark:text-white",
        }
      }}
    >
      <Router>
        <ScrollToTop/>
        <App />
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();