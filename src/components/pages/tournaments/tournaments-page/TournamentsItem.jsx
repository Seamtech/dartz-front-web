import React from 'react';
import { Link } from 'react-router-dom';

const TournamentItem = ({ tournament }) => (
  <div className="tournament-item">
    <h3 className="sovjet-section-heading">
      <Link to={`/tournaments/${tournament.id}`} className="tournament-link">{tournament.name}</Link>
    </h3>
    <ul>
      <li className="tournament-item-details">Type: {tournament.tournamentType}</li>
      <li className="tournament-item-details">Start Date: {tournament.date || 'TBD'}</li>
      <li className="tournament-item-details">Start Time: {tournament.time || 'TBD'}</li>
      <li className="tournament-item-details">Entry Fee: {`${tournament.entryFeeAmount} ${tournament.entryFeeType}`}</li>
      <li className="tournament-item-details">Game: {tournament.game.name}</li>
      <li className="tournament-item-details">Description: {tournament.game.description}</li>
      <li className="tournament-item-details">Max Teams: {tournament.details.maxPlayers || 'No limit'}</li>
      <li className="tournament-item-details">Current Status: {tournament.details.tournamentStatus}</li>
    </ul>
    <Link to={`/tournaments/${tournament.id}`} className="tournament-view-button">View</Link>
  </div>
);

export default TournamentItem;
