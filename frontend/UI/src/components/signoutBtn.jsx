import React from 'react';
import { Navigate } from 'react-router-dom';

const SignOutButton = () => {
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('loginStateChange')); 
    Navigate('/');
    console.log('User signed out');
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;