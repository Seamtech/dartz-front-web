import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SignupForm from './SignupForm'; // Update with the correct path
import { Container } from 'react-bootstrap';

const SignupPage = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard
  }
  return (
    <main className="main-content">
    <Container className="form-container">
      <h3 className="sovjet-content-heading">Signup</h3>
      <SignupForm />
    </Container>
  </main>

  );
};

export default SignupPage;