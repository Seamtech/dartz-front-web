import React, {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {tournaments} from '../../data/tournaments';

const TournamentsPage = () => {
  // Group the tournaments by type
  const singles = tournaments.filter(tournament => tournament.type === "SingleZ");
  const doubles = tournaments.filter(tournament => tournament.type === "DoubleZ");
  const trips = tournaments.filter(tournament => tournament.type === "TripZ");
  const fours = tournaments.filter(tournament => tournament.type === "FourZ");
  const singlesRef = useRef();
  const doublesRef = useRef();
  const tripsRef = useRef();
  const foursRef = useRef();

  const scrollToRef = (ref) => {
    if(ref.current) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      ref.current.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest', top: ref.current.offsetTop - headerHeight })
    }
  };
  const activeTournamentType = ""; // Could be SingleZ, DoubleZ, etc.
const activeRef = useRef();

  useEffect(() => {
    switch(activeTournamentType) {
      case "SingleZ":
        activeRef.current = singlesRef.current;
        break;
      case "DoubleZ":
        activeRef.current = doublesRef.current;
        break;
        case "TripZ":
          activeRef.current = tripsRef.current;
          break;
        case "FourZ":
          activeRef.current = foursRef.current;
          break;
          
      // Add other tournament types here...
      default:
        activeRef.current = singlesRef.current;
        break;
    }
    scrollToRef(activeRef);
  }, [activeTournamentType]); 

  // Component to render each tournament
  const TournamentItem = ({tournament}) => (
    <div className="tournament-item" key={tournament.id}>
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

  return (
    <main className="main-content">
<div className="content-box">
        <span onClick={() => scrollToRef(singlesRef)} className="TournamentsSpan">Scroll to SingleZ</span>
        <span onClick={() => scrollToRef(doublesRef)} className="TournamentsSpan">Scroll to DoubleZ</span>
        <span onClick={() => scrollToRef(tripsRef)} className="TournamentsSpan">Scroll to TripZ</span>
        <span onClick={() => scrollToRef(foursRef)} className="TournamentsSpan">Scroll to FourZ</span>
    <div className="tournaments-list-container">
      <h1 className="sovjet-page-heading">Upcoming TournamentZ</h1>
        <div className="tournaments-list">
          <div className="tournaments-column" ref={singlesRef}>
            <h2 className="sovjet-content-heading">SingleZ</h2>
            <hr  />
            {singles.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
          <div className="tournaments-column" ref={doublesRef}>
            <h2 className="sovjet-content-heading">DoubleZ</h2>
            <hr  />
            {doubles.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
          <div className="tournaments-column" ref={tripsRef}>
            <h2 className="sovjet-content-heading">TripZ</h2>
            <hr  />
            {trips.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
          <div className="tournaments-column" ref={foursRef}>
            <h2 className="sovjet-content-heading">FourZ</h2>
            <hr  />
            {fours.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
        </div>
      </div>
      </div>
      <div className="content-box">
      <div className="tournaments-list-container">
      <h1 className="sovjet-page-heading">Past TournamentZ</h1>
        <div className="tournaments-list">
          <div className="tournaments-column">
            <h2 className="sovjet-content-heading">SingleZ</h2>
            <hr  />
            {singles.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
          <div className="tournaments-column">
            <h2 className="sovjet-content-heading">DoubleZ</h2>
            <hr  />
            {doubles.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
          <div className="tournaments-column">
            <h2 className="sovjet-content-heading">TripZ</h2>
            <hr  />
            {trips.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
          <div className="tournaments-column">
            <h2 className="sovjet-content-heading">FourZ</h2>
            <hr  />
            {fours.map(tournament => <TournamentItem tournament={tournament} />)}
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default TournamentsPage;