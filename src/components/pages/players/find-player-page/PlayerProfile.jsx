import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import DataTable from '../../../global/table/DataTable';
import ThreeColumnLayout from '../../../global/three-column-layout/ThreeColumnLayout';

const PlayerProfile = () => {
  const location = useLocation();
  const [playerDetails, setPlayerDetails] = useState(location.state?.player || null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (!location.state?.player) {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        const username = searchParams.get('username');

        if (!id && !username) {
          setError('No player identifier provided.');
          return;
        }

        try {
          setIsLoading(true);
          const searchType = id ? 'id' : 'username';
          const searchValue = id || username;

          const details = await playerService.getPlayerDetails({ type: searchType, value: searchValue });

          if (details && details.length > 0) {
            setPlayerDetails(details[0]);
          } else {
            setError('Player not found');
          }
        } catch (err) {
          setError('An error occurred while fetching player details');
          console.error('Fetch Player Details Error:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPlayerDetails();
  }, [location]);

  const columns = [
    { field: 'profileId', headerName: 'Player ID' },
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email' },
    { field: 'mobileNumber', headerName: 'Mobile Number' },
    { field: 'state', headerName: 'State' },
    { field: 'totalGamesPlayed', headerName: 'Total Games Played' },
    { field: 'totalGamesWon', headerName: 'Total Games Won' },
    { field: 'totalGamesLost', headerName: 'Total Games Lost' },
    { field: 'ppd', headerName: 'PPD' },
    { field: 'mpr', headerName: 'MPR' },
    { field: 'zRating', headerName: 'Z Rating' },
    { field: 'playerRating', headerName: 'Player Rating' },
  ];

  const data = playerDetails ? [playerDetails] : [];

  if (isLoading) {
    return <Container className="main-content"><div>Loading...</div></Container>;
  }

  if (error) {
    return <Container className="main-content"><div>{error}</div></Container>;
  }

  if (!data || data.length === 0) {
    return <Container className="main-content"><div>No player details found</div></Container>;
  }

  return (
    <ThreeColumnLayout>
      <main className="main-content">
        <h1 className="sovjet-page-heading">Player Profile</h1>
        <section className="content-box">
          <h4>Player: {data[0].firstName} {data[0].lastName}</h4>
          <DataTable
            columns={columns}
            data={data}
            hideColumnsOnMobile={[]}
            layoutType="card"
          />
        </section>
      </main>
    </ThreeColumnLayout>
  );
};

export default PlayerProfile;
