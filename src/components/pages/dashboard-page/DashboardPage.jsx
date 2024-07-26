import React, { useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { roleBasedAccessService } from '../../../services/';
import { ThreeColumnLayout } from '../../global';

const DashboardPage = () => {
  const [error, setError] = useState(null);

  if (!roleBasedAccessService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }


  return (
    <ThreeColumnLayout>
      <Container className="form-container">
        <h3>User Dashboard</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    </ThreeColumnLayout>
  );
};

export default DashboardPage;
