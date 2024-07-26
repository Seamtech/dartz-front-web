import React, { useState } from "react";
import { leagueData as travelLeaguesData } from "../../../../data/leagueData";

const TravelLeaguePage = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Travel League</h1>
      <div className="content-box">
        <h2 className="sovjet-content-heading">Select Travel League</h2>
        <div className="LeagueSelection">
          {Object.keys(travelLeaguesData).map((league) => (
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

export default TravelLeaguePage;
