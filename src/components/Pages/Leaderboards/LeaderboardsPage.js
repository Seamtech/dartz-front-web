import React, { useState, useEffect } from "react";
import { user_statistics, users } from "../../data"; // Adjust import paths as needed
import LeaderboardSelector from "./LeaderboardSelector";
import LeaderboardDisplay from "./LeaderboardDisplay";

const leaderboardTypes = [/* ... */]; // Your leaderboardTypes array

const LeaderBoardsPage = () => {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(null);
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    const map = users.reduce((acc, user, i) => ({
      ...acc,
      [user.id]: user,
      [user.rank]: i,
    }), {});
    setUsersMap(map);
  }, []);

  const sortedStatistics = selectedLeaderboard
    ? [...user_statistics].sort((a, b) => b[selectedLeaderboard.field] - a[selectedLeaderboard.field])
    : [];

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Leaderboards</h1>
      <div className="LeaderBoardsPage">
        <div className="content-box">
          <h2 className="sovjet-content-heading">Select Leaderboard</h2>
          <LeaderboardSelector
            leaderboardTypes={leaderboardTypes}
            selectedLeaderboard={selectedLeaderboard}
            onSelect={setSelectedLeaderboard}
          />
          <hr />
          <LeaderboardDisplay
            selectedLeaderboard={selectedLeaderboard}
            sortedStatistics={sortedStatistics}
            usersMap={usersMap}
          />
        </div>
      </div>
    </main>
  );
};

export default LeaderBoardsPage;
