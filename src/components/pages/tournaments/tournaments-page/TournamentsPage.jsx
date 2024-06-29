import React, { useEffect, useState } from "react";
import TournamentsList from "./TournamentsList";
import tournamentService from "../../../../services/tournaments/tournamentService";
import { useSocket } from "../../../../contexts/SocketContext";
import { crudActions } from "../../../../utils/crudOperations";
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout";

const TournamentsPage = () => {
  const { subscribe, unsubscribe, socket } = useSocket();
  const [selectedType, setSelectedType] = useState("All");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(false);
  const [error, setError] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const flattenTournamentData = (data) => {
    return data.map(tournament => {
      const scheduledStart = new Date(tournament.details.scheduledStart);
      const date = scheduledStart.toLocaleDateString();
      const time = scheduledStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      const playerCount = tournament.teams.reduce((acc, team) => acc + (team.players ? team.players.length : 0), 0);
  
      return {
        ...tournament,
        name: tournament.details.tournamentName || "Unnamed Tournament",
        scheduledStart: tournament.details.scheduledStart,
        date,
        time,
        playerCount,
        gameName: tournament.game.name,
        entryFeeAmount: tournament.entryFeeAmount,
        entryFeeType: tournament.entryFeeType,
      };
    });
  };

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const data = await tournamentService.getTournaments();
      const flattenedData = flattenTournamentData(data);
      setTournaments(flattenedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      setError("Failed to fetch tournaments. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();

    const id = setInterval(fetchTournaments, 5 * 60 * 1000);
    setIntervalId(id);

    return () => {
      clearInterval(id);
      if (subscription && unsubscribe) {
        unsubscribe("tournamentUpdate");
      }
    };
  }, [socket]);

  useEffect(() => {
    const handleTournamentUpdate = (update) => {
      setTournaments(crudActions(update, tournaments));
    };

    if (!loading && !subscription && tournaments.length > 0 && subscribe) {
      subscribe("tournamentUpdate", handleTournamentUpdate);
      setSubscription(true);
    }

    return () => {
      if (subscription && unsubscribe) {
        unsubscribe("tournamentUpdate", handleTournamentUpdate);
      }
    };
  }, [loading, subscription, tournaments]);

  const handleTypeChange = (e) => setSelectedType(e.target.value || "All");

  const filteredTournaments = tournaments.filter(t =>
    selectedType === "All" || t.tournamentFormat.toLowerCase() === selectedType.toLowerCase()
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
