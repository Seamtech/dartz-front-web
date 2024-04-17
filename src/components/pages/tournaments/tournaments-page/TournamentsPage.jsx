import React, { useState, useEffect } from "react";
import TournamentsList from "./TournamentsList";
import { tournamentService } from "../../../../services";
import { useSocket } from "../../../../contexts/SocketContext";
const TournamentsPage = () => {
  const { webSocketService, isConnected } = useSocket();
  const [selectedType, setSelectedType] = useState("All");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to check mount status

    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const data = await tournamentService.getTournaments();
        if (isMounted) {
          setTournaments(data);
        }
      } catch (err) {
        console.error("Error fetching tournaments:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTournaments();

    const handleTournamentUpdate = (update) => {
      // Use tournamentsRef.current to access the latest state
      const updatedData = webSocketService.crudActions(update, tournaments);
      if (isMounted) setTournaments(updatedData);
    };

    if (isConnected) {
      webSocketService.subscribe("tournamentUpdate", handleTournamentUpdate);
    }

    return () => {
      isMounted = false;
      if (isConnected) {
        webSocketService.unsubscribe("tournamentUpdate", handleTournamentUpdate);
      }
    };
  }, [isConnected, webSocketService])

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value || "All");
  };
  const filteredTournaments =
    selectedType === "All"
      ? tournaments
      : tournaments.filter((t) => t.type === selectedType);

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Upcoming Tournaments</h1>
      <section className="content-box">
        <h2 className="sovjet-content-heading">Select Type</h2>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="All">All</option>
          <option value="SingleZ">SingleZ</option>
          <option value="DoubleZ">DoubleZ</option>
          <option value="TripZ">TripZ</option>
          <option value="FourZ">FourZ</option>
        </select>
      </section>
      <section className="content-box">
        <h2 className="sovjet-section-heading">{selectedType}</h2>
        <TournamentsList tournaments={filteredTournaments} />
      </section>
    </main>
  );
};

export default TournamentsPage;
