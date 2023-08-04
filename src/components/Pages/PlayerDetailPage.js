import React from 'react';
import { users } from '../../data/users';
import { user_statistics } from '../../data/user_statistics';
import { useParams, Link } from 'react-router-dom';
const PlayerDetailsPage = ({ match }) => {
  const {playerID} = useParams()
  const profile = users.find(profile => profile.id === playerID);
  const statistics = user_statistics.find(statistics => statistics.user_id.toString() === playerID);

  return (
    profile && statistics ? (
      <main className="main-content">
        <h1 className="sovjet-page-heading">Player Profile</h1>
        <hr  />
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
      <div>
        <p>Player not found!</p>
      </div>
    )
  );
};

export default PlayerDetailsPage;