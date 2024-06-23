import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import playerService from '../../../../services/playerService';
import { Container } from 'react-bootstrap';
import DataTable from '../../../global/table/DataTable';
import ThreeColumnLayout from '../../../global/three-column-layout/ThreeColumnLayout';

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

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        setIsLoading(true);
        const searchType = id ? 'id' : 'username';
        const searchValue = id || username;

        const details = await playerService.getPlayerDetails({type: searchType, value: searchValue});
        if (details && details.length > 0) {
          const user = details[0];
          setPlayerDetails({
            username: user.username,
            email: user.email,
            mobileNumber: user.userProfile.mobileNumber,
            state: user.userProfile.state,
            totalGamesPlayed: user.userStatistics.totalGamesPlayed,
            totalGamesWon: user.userStatistics.totalGamesWon,
            totalGamesLost: user.userStatistics.totalGamesLost,
            ppd: user.userStatistics.ppd,
            mpd: user.userStatistics.mpd,
            zRating: user.userStatistics.zRating,
            playerRating: user.userStatistics.playerRating,
          });
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

  const columns = [
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email' },
    { field: 'mobileNumber', headerName: 'Mobile Number' },
    { field: 'state', headerName: 'State' },
    { field: 'totalGamesPlayed', headerName: 'Total Games Played' },
    { field: 'totalGamesWon', headerName: 'Total Games Won' },
    { field: 'totalGamesLost', headerName: 'Total Games Lost' },
    { field: 'ppd', headerName: 'PPD' },
    { field: 'mpd', headerName: 'MPD' },
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
