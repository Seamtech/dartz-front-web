import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { roleBasedAccessService } from '../../../services';
const DashboardPage = () => {

  // This page is accessible to both 'user' and 'admin' roles, hence checking for 'user' role suffices
  console.log(roleBasedAccessService.isLoggedIn());
  console.log(roleBasedAccessService.hasRequiredRole('user'));
  if (!roleBasedAccessService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3>User Dashboard</h3>
        {/* User-specific content goes here */}
      </Container>
    </main>
  );
};

export default DashboardPage;
