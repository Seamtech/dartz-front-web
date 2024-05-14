import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import playerService from '../../../../services/playerService';
import { Container } from 'react-bootstrap';
import DataTable from '../../../global/table/DataTable';
import ThreeColumnLayout from '../../../global/three-column-layout/ThreeColumnLayout'; 

// Custom hook to parse the query string
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PlayerProfile = () => {
  const query = useQuery();
  const id = query.get('id');
  const username = query.get('username');

  const [playerDetails, setPlayerDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Define the list of public properties to display
  const publicProperties = [
    'username', 'email', 'mobile_number', 'state',
    'total_games_played', 'total_games_won', 'total_games_lost',
    'ppd', 'mpd', 'z_rating', 'player_rating'
  ];

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        setIsLoading(true);
        const searchType = id ? 'id' : 'username';
        const searchValue = id || username;
        
        const details = await playerService.getPlayerDetails({type: searchType, value: searchValue});
        if (details) {
          setPlayerDetails({ ...details.profile, ...details.statistics });
        } else {
          setError('Player not found');
        }
      } catch (err) {
        setError('An error occurred while fetching player details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id || username) {
        fetchPlayerDetails();
    }
  }, [id, username]);

  // Filter and format the details for DataTable columns
  const columns = publicProperties.map(prop => ({
    field: prop,
    headerName: prop.replace('_', ' ').replace(/\b(\w)/g, char => char.toUpperCase()), // Title Case and replace underscores
  }));

  // Prepare the data array for the DataTable
  const data = playerDetails ? [publicProperties.reduce((acc, property) => {
    if (playerDetails[property] !== undefined) { // Ensure the property exists in playerDetails
      acc[property] = playerDetails[property]?.toString() || 'N/A';
    }
    return acc;
  }, {})] : [];

  if (isLoading) {
    return <Container className="main-content"><div>Loading...</div></Container>;
  }

  if (error) {
    return <Container className="main-content"><div>{error}</div></Container>;
  }

  return (
    <ThreeColumnLayout>
    <main className="main-content">
    <h1 className="sovjet-page-heading">Find a Player</h1>
      <section className="content-box">
      <h1 className="sovjet-content-heading">Player Profile</h1>
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
