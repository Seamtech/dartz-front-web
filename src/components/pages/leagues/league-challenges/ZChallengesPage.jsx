import React, { useState } from "react";
import { players } from "../../../../data/zLeaguePlayers"; // Import your players data

const ZChallengesPage = () => {
  const [challengeType, setChallengeType] = useState("individual"); // "individual" or "team"
  const [selectedOpponent, setSelectedOpponent] = useState(null);

  // Filter players or teams based on the challenge type
  const availableOpponents = players.filter(player => {
    // Filter logic here
    // Example: return player.type === challengeType;
    return true; // Placeholder return, adjust based on your data structure
  });

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Z Challenges</h1>
      <div className="ZChallengesPage">
        <div className="content-box">
          <h2 className="sovjet-content-heading">Challenge Type</h2>
          <div className="ChallengeTypeSelection">
            <button onClick={() => setChallengeType("individual")}>Individual</button>
            <button onClick={() => setChallengeType("team")}>Team</button>
          </div>
          <h2 className="sovjet-content-heading">Select Opponent</h2>
          <div className="OpponentSelection">
            {availableOpponents.map((opponent, index) => (
              <span key={index} onClick={() => setSelectedOpponent(opponent)} className={selectedOpponent === opponent ? 'selected' : ''}>
                {opponent.name} {/* Assuming a 'name' property, adjust as necessary */}
              </span>
            ))}
          </div>
          {selectedOpponent && (
            <div>
              <p>Challenging: {selectedOpponent.name}</p>
              {/* Add more interactive elements here, such as setting a match date, defining rules, etc. */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ZChallengesPage;
