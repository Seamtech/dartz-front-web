import React from 'react';
import TournamentItem from './TournamentItem'; // Update the import path as necessary

const TournamentList = ({ tournaments, refProp, title }) => (
  <div className="tournaments-column" ref={refProp}>
    <h2 className="sovjet-content-heading">{title}</h2>
    <hr />
    {tournaments.map(tournament => <TournamentItem key={tournament.id} tournament={tournament} />)}
  </div>
);

export default TournamentList