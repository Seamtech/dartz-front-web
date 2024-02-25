import React from 'react';
import { Link } from 'react-router-dom';

const TournamentItem = ({ tournament }) => (
  <div className="tournament-item">
    <h3 className="sovjet-section-heading">
      <Link to={`/tournaments/${tournament.id}`} className="tournament-link">{tournament.name}</Link>
    </h3>
    <ul>
      <li className="tournament-item-details">Date: {tournament.date}</li>
      <li className="tournament-item-details">Time: {tournament.time}</li>
      <li className="tournament-item-details">Location: {tournament.location}</li>
      <li className="tournament-item-details">Format: {tournament.format}</li>
      <li className="tournament-item-details">Entry Fee: {tournament.entryFee}</li>
      <li className="tournament-item-details">Player Rating Limit: {tournament.playerRatingLimit}</li>
      <li className="tournament-item-details">Max Participants: {tournament.maxParticipants}</li>
      <li className="tournament-item-details">Handicap: {tournament.handicap}</li>
      <li className="tournament-item-details">Zenemy: ${tournament.zenemy}</li>
    </ul>
    <Link to={`/tournaments/${tournament.id}`} className="tournament-view-button">View</Link>
  </div>
);

export default TournamentItem;
