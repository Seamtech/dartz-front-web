import React, { useEffect, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import roleBasedAccessService from '../../../../services/user/roleBasedAccessService';
import tournamentService from '../../../../services/tournaments/tournamentService';
import TournamentsList from '../../../pages/tournaments/tournaments-page/TournamentsList';
import ThreeColumnLayout from '../../../global/three-column-layout/ThreeColumnLayout';

const TournamentAdminPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roleBasedAccessService.isLoggedIn() || !roleBasedAccessService.hasRequiredRole('director')) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const data = await tournamentService.getTournaments();
      const formattedTournaments = data.map(tournament => ({
        id: tournament.id,
        name: tournament.details?.tournamentName || 'Unnamed Tournament',
        tournamentFormat: tournament.tournamentFormat,
        date: new Date(tournament.details?.scheduledStart).toLocaleDateString(),
        time: new Date(tournament.details?.scheduledStart).toLocaleTimeString(),
        entryFeeAmount: tournament.entryFeeAmount,
        entryFeeType: tournament.entryFeeType,
        gameName: tournament.game?.name,
        playerCount: tournament.teams?.length | 0,
        details: tournament.details,
        game: tournament.game,
      }));
      setTournaments(formattedTournaments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setError('Failed to fetch tournaments. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleCreateTournamentClick = () => {
    navigate('/admin/tournaments/create-tournament');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ThreeColumnLayout>
      <Container className="content-box">
        <h3>Welcome to the Admin Dashboard</h3>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Button variant="primary" onClick={handleCreateTournamentClick}>
          Create Tournament
        </Button>
        <h3 className="sovjet-section-heading">Tournaments</h3>
        <TournamentsList tournaments={tournaments} />
      </Container>
    </ThreeColumnLayout>
  );
};

export default TournamentAdminPage;
