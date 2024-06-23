import React, { useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { roleBasedAccessService, pingService } from '../../../services';
import ThreeColumnLayout from '../../global/three-column-layout/ThreeColumnLayout';

const DashboardPage = () => {
  const [pingResponse, setPingResponse] = useState(null);
  const [error, setError] = useState(null);

  const handlePing = async () => {
    try {
      const response = await pingService.ping();
      setPingResponse(response);
    } catch (err) {
      setError('Ping request failed');
    }
  };

  if (!roleBasedAccessService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const renderPingResponse = () => {
    if (!pingResponse) return null;

    return (
      <ListGroup>
        <ListGroup.Item><strong>Greeting:</strong> {pingResponse.greeting}</ListGroup.Item>
        <ListGroup.Item><strong>Date:</strong> {pingResponse.date}</ListGroup.Item>
        <ListGroup.Item><strong>URL:</strong> {pingResponse.url}</ListGroup.Item>
        <ListGroup.Item><strong>Headers:</strong>
          <ul>
            {Object.entries(pingResponse.headers).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </ListGroup.Item>
      </ListGroup>
    );
  };

  return (
    <ThreeColumnLayout>
      <Container className="form-container">
        <h3>User Dashboard</h3>
        <Button onClick={handlePing}>Ping</Button>
        {pingResponse && (
          <div>
            <h5>Ping Response:</h5>
            {renderPingResponse()}
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    </ThreeColumnLayout>
  );
};

export default DashboardPage;
