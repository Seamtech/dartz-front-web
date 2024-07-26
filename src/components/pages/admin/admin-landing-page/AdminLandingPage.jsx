import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import roleBasedAccessService from '../../../../services/user/roleBasedAccessService'; // Adjust the import path as needed
import FormButton from '../../../global/forms/FormButton';
import Loading from '../../../global/loading/Loading'; // Import the Loading component

const AdminLandingPage = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading with a 10-second timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10-second timeout

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // Check if the user is logged in and has at least 'director' level access
  useEffect(() => {
    if (!roleBasedAccessService.isLoggedIn() || !roleBasedAccessService.hasRequiredRole('director')) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle navigation to the Create Tournament page
  const handleCreateTournamentClick = () => {
    navigate('/admin/tournaments');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3>Welcome to the Admin Dashboard</h3>
        <FormButton variant="primary" onClick={handleCreateTournamentClick}>
          Tournaments
        </FormButton>
        {/* Add more admin-specific buttons or links here as needed */}
      </Container>
    </main>
  );
};

export default AdminLandingPage;
