import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {roleBasedAccessService} from '../../../../services/authService'; // Adjust the import path as needed

const AdminLandingPage = () => {
  const userState = useSelector((state) => state.user);

  // Check both login status and role
  if (!roleBasedAccessService.isLoggedIn(userState) || !roleBasedAccessService.hasRequiredRole('user')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3>Admin Dashboard</h3>
        {/* Admin-specific content goes here */}
      </Container>
    </main>
  );
};

export default AdminLandingPage;