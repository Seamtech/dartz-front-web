import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SignupForm from './SignupForm'; // Update with the correct path

const SignupPage = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard
  }
  return (
    <div className="main-content">
      <SignupForm />
    </div>

  );
};

export default SignupPage;