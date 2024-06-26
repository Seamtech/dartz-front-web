import React, { useState, useEffect } from "react";
import TournamentsList from "./TournamentsList";
import { tournamentService } from "../../../../services";
import { useSocket } from "../../../../contexts/SocketContext";
import { crudActions } from "../../../.././utils/crudOperations";
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout";

const TournamentsPage = () => {
    // Retrieve socket connection and subscription functions from SocketContext
    const { subscribe, unsubscribe, socket } = useSocket();

    // State variables for managing tournaments, loading state, error handling, and subscription
    const [selectedType, setSelectedType] = useState("All");
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle updates received from the socket
    const handleTournamentUpdate = (update) => {
        // Update tournaments state based on CRUD actions
        if (update.type === "create" || update.type === "update" || update.type === "delete") {
            setTournaments(prevTournaments => crudActions(update, prevTournaments));
        } else if (update.type === "message") {
            console.log("Received message from server:", update.message);
        } else {
            console.error("Invalid update type:", update.type);
        }
    };

    // Fetch tournaments data and subscribe to socket updates when socket connection changes
    useEffect(() => {
        const fetchDataAndSubscribe = async () => {
            setLoading(true);
            try {
                // Fetch tournaments data from the service
                const data = tournamentService.getTournaments();
                // Update tournaments state with fetched data
                setTournaments(data);
                setLoading(false);
            } catch (err) {
                // Handle errors during data fetching
                console.error("Error fetching tournaments:", err);
                setError("Failed to fetch tournaments. Please try again later.");
                setLoading(false);
            }
        };

        fetchDataAndSubscribe();
    }, [socket]);

    // Subscribe to socket updates when tournaments data, loading state, and subscription state change
    useEffect(() => {
        if (!loading && !subscription && tournaments.length > 0 && subscribe) {
            subscribe("tournamentUpdate", handleTournamentUpdate);
            setSubscription(true);
        }
    }, [loading, subscription, tournaments, subscribe]);

    // Unsubscribe from socket updates when subscription state changes
    useEffect(() => {
        return () => {
            if (subscription) {
                unsubscribe("tournamentUpdate", handleTournamentUpdate);
            }
        };
    }, [subscription, unsubscribe]);

    // Handle change in selected tournament type
    const handleTypeChange = (e) => setSelectedType(e.target.value || "All");

    // Filter tournaments based on selected type
    const filteredTournaments = tournaments.filter(
        (t) => selectedType === "All" || t.type.toLowerCase() === selectedType.toLowerCase()
    );

    // Render loading indicator if data is being fetched
    if (loading) return <div>Loading...</div>;
    // Render error message if an error occurs
    if (error) return <div>Error: {error}</div>;

    // Render the tournaments page with three-column layout
    return (
        <ThreeColumnLayout>
            <main className="main-content">
                <h1 className="sovjet-page-heading">Upcoming Tournaments</h1>
                <section className="content-box">
                    <h2 className="sovjet-content-heading">Select Type</h2>
                    {/* Dropdown menu to select tournament type */}
                    <select value={selectedType} onChange={handleTypeChange}>
                        <option value="All">All</option>
                        <option value="SingleZ">SingleZ</option>
                        <option value="DoubleZ">DoubleZ</option>
                        <option value="TripZ">TripZ</option>
                        <option value="FourZ">FourZ</option>
                    </select>
                    {/* Display selected tournament type */}
                    <h3 className="sovjet-section-heading">{selectedType}</h3>
                    {/* Render list of tournaments based on selected type */}
                    <TournamentsList tournaments={filteredTournaments} />
                </section>
            </main>
        </ThreeColumnLayout>
    );
};

export default TournamentsPage;
