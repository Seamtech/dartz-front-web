import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm'; // Adjust the import path as necessary
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook


const LoginPage = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard
  }

  return (
      <Container className="main-content">
                <h3 className="sovjet-page-heading">Login</h3>
      <section className="content-box">
        <LoginForm />
      </section>
      </Container>
  );
};

export default LoginPage;
