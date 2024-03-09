import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import playerService from '../../../../services/playerService'; // Ensure the import path is correct

const PlayerProfile = () => {
  const { playerID } = useParams();
  const [profile, setProfile] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const playerDetails = await playerService.getPlayerDetails(playerID);
        if (playerDetails) {
          setProfile(playerDetails.profile);
          setStatistics(playerDetails.statistics);
        } else {
          setError('Player not found');
        }
      } catch (err) {
        setError('An error occurred while fetching player details');
        console.error(err);
      }
    };

    fetchPlayerDetails();
  }, [playerID]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    profile && statistics ? (
      <main className="main-content">
        <h1 className="sovjet-page-heading">Player Profile</h1>
        <hr />
        <div className="player-profile">
          <h2 className="sovjet-content-heading">{profile.first_name} {profile.last_name}</h2>
          <p>Email: {profile.email}</p>
          <p>Mobile Number: {profile.mobile_number}</p>
          <p>State: {profile.state}</p>
          <h3 className="sovjet-section-heading">Player Statistics</h3>
          <p>Total Games Played: {statistics.total_games_played}</p>
          <p>Total Games Won: {statistics.total_games_won}</p>
          <p>Total Games Lost: {statistics.total_games_lost}</p>
          <p>PPD: {statistics.ppd}</p>
          <p>MPD: {statistics.mpd}</p>
          <p>Z Rating: {statistics.z_rating}</p>
          <p>Player Rating: {statistics.player_rating}</p>
        </div>
      </main>
    ) : (
      <div>Loading...</div>
    )
  );
};

export default PlayerProfile;
