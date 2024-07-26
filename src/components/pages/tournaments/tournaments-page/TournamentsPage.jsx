import React, { useEffect, useState } from 'react';
import TournamentsList from './TournamentsList';
import { useSocket } from '../../../../contexts/SocketContext';
import { crudActions } from '../../../../utils/';
import { ThreeColumnLayout, Loading } from '../../../global';
import { useTournaments } from '../../../hooks';

const TournamentsPage = () => {
  const { subscribe, unsubscribe, socket } = useSocket();
  const [selectedType, setSelectedType] = useState('All');
  const { tournaments, loading, error, setTournaments } = useTournaments();
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    const handleTournamentUpdate = (update) => {
      setTournaments((prevTournaments) => crudActions(update, prevTournaments));
    };

    if (!loading && !subscription && tournaments.length > 0 && subscribe) {
      subscribe('tournamentUpdate', handleTournamentUpdate);
      setSubscription(true);
    }

    return () => {
      if (subscription && unsubscribe) {
        unsubscribe('tournamentUpdate', handleTournamentUpdate);
      }
    };
  }, [loading, subscription, tournaments, subscribe, unsubscribe, setTournaments]);

  const handleTypeChange = (e) => setSelectedType(e.target.value || 'All');

  const filteredTournaments = tournaments.filter(
    (t) => selectedType === 'All' || t.tournamentFormat.toLowerCase() === selectedType.toLowerCase()
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Loading redirect={false} errorMessage={`Error loading tournaments: ${error.message}`} />;
  }

  return (
    <ThreeColumnLayout>
      <main className="main-content">
        <h1 className="sovjet-page-heading">Upcoming Tournaments</h1>
        <section className="content-box">
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="All">All</option>
            <option value="SingleZ">SingleZ</option>
            <option value="DoubleZ">DoubleZ</option>
            <option value="TripZ">TripZ</option>
            <option value="FourZ">FourZ</option>
          </select>
          <h3 className="sovjet-section-heading">{selectedType}</h3>
          <TournamentsList tournaments={filteredTournaments} />
        </section>
      </main>
    </ThreeColumnLayout>
  );
};

export default TournamentsPage;
