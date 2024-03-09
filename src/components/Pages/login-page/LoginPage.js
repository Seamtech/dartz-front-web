import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm'; // Adjust the import path as necessary
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const LoginPage = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard
  }

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3 className="sovjet-content-heading">Login</h3>
        <LoginForm />
      </Container>
    </main>
  );
};

export default LoginPage;
