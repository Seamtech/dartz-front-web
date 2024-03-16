import React from 'react';
import { Link } from 'react-router-dom';

const PlayerProfile = ({ player }) => {
  return (
    <div>
      <Link className="player-lookup-link" to={`/players/${player.id}`}>
        {player.first_name} {player.last_name}
      </Link>
      <div>ID: {player.id}</div>
      <div>Email: {player.email}</div>
      <div>Mobile Number: {player.mobile_number}</div>
      <div>State: {player.state}</div>
      <div>Default Location: {player.default_location}</div>
    </div>
  );
};

export default PlayerProfile;