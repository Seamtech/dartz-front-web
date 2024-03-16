import React, { useState, useEffect } from "react";
import { LeaderboardsSelector, LeaderboardsDisplay } from "./";
import { leaderboardService } from "../../../services"; // Adjust the import path as needed
import "./LeaderboardsPage.css";

const leaderboardTypes = [
  { Name: "Wins", field: "total_games_won" },
  { Name: "PPD", field: "ppd" },
  { Name: "MPR", field: "mpr" },
  { Name: "Tournaments Won", field: "tournaments_won" },
  { Name: "Tournaments Played", field: "tournaments_played" },
  { Name: "Z Championships", field: "z_championships" },
  { Name: "Z Rating", field: "z_rating" }
];

const LeaderBoardsPage = () => {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(
    leaderboardTypes[0]
  );
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        // Fetch leaderboard data for the selected type
        const data = await leaderboardService.getLeaderboard(
          selectedLeaderboard.field
        );
        setLeaderboardData(data); // Assuming this data includes user details
      } catch (error) {
        console.error("Failed to fetch leaderboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [selectedLeaderboard]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main-content">
      <div className="LeaderBoardsPage">
      <h2 className="sovjet-page-heading">Leaderboards</h2>
        <div className="content-box">
          <h2 className="sovjet-content-heading">Select Leaderboard</h2>
          <LeaderboardsSelector
            leaderboardTypes={leaderboardTypes}
            selectedLeaderboard={selectedLeaderboard}
            onSelect={setSelectedLeaderboard}
          />
          <hr />
          <LeaderboardsDisplay
            selectedLeaderboard={selectedLeaderboard}
            leaderboardData={leaderboardData}
            leaderboardTypes={leaderboardTypes} // Pass leaderboardTypes as a prop
          />
        </div>
      </div>
    </main>
  );
};

export default LeaderBoardsPage;
