import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Accessing isLoggedIn state

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3>Dashboard</h3>
      </Container>
    </main>
  );
};

export default DashboardPage;
