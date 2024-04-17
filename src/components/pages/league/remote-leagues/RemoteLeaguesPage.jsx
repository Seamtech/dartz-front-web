import React, { useState } from "react";
import { leagueData as remoteLeaguesData } from "../../../../data/leagueData"; // Import your remote leagues data

const RemoteLeaguesPage = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Remote Leagues</h1>
      <div className="content-box">
        <h2 className="sovjet-content-heading">Select Remote League</h2>
        <div className="LeagueSelection">
          {Object.keys(remoteLeaguesData).map((league) => (
            <span key={league} onClick={() => setSelectedLeague(league)} className={selectedLeague === league ? 'selected' : ''}>
              {league}
            </span>
          ))}
        </div>
        {selectedLeague && (
          <div>
            {/* Display league details here */}
          </div>
        )}
      </div>
    </main>
  );
};

export default RemoteLeaguesPage;
