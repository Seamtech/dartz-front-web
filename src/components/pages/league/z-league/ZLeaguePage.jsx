import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { players } from "../../../../data/zLeaguePlayers";

const leaguesData = {
  Social: players, // Replace with the playersData array for Social
  Intermediate: players, // Replace with the playersData array for League 2
  Master: players, // Replace with the playersData array for League 4
  "Grand Master": players, // Replace with the playersData array for League 4
};

const ZLeaguePage = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const players = selectedLeague ? leaguesData[selectedLeague] : [];
  const [playerBrackets, setPlayerBrackets] = useState([]);

  useEffect(() => {
    let brackets = [];
    for (let i = 0; i < players.length; i += 6) {
      brackets.push(players.slice(i, i + 6));
    }
    setPlayerBrackets(brackets);
  }, [players]);

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Z-League</h1>
        <div className="ZLeaguePage">
          <div className="content-box">
            <h2 className="sovjet-content-heading">Select Z League</h2>
            <div className="ZLeagueSelection">
            {Object.keys(leaguesData).map((league) => (
                <span key={league} onClick={() => setSelectedLeague(league)} className={selectedLeague === league ? 'selected' : ''}>
  {league}
</span>
            ))}
          </div>
          <hr  />
          {selectedLeague &&
            playerBrackets.map((bracket, index) => (
              <div key={index}>
                <h3 className="sovjet-section-heading">{`${selectedLeague}-Z-${
                  index + 1
                }`}</h3>
                <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Player</th>
                      {bracket.map((player, idx) => (
                        <th key={idx}>{`${player.name}`}</th>
                      ))}
                      <th>Wins</th>
                      <th>Losses</th>
                      <th>Ties</th>
                      <th>Game Wins</th>
                      <th>Game Losses</th>
                      <th>Win %</th>
                      <th>Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bracket.map((player, idx) => (
                      <tr key={idx}>
                        <td className="sovjet-text">{`${player.name}`}</td>
                        {bracket.map((opponent, idy) =>
                          idx === idy ? (
                            <td key={idy}>
                              <Link to={`/message/${player.id}`}>Message</Link>
                            </td>
                          ) : (
                            <td key={idy}>
                              {player.scoreAgainst[opponent.id]}
                            </td>
                          )
                        )}
                        <td>{player.Wins}</td>
                        <td>{player.Losses}</td>
                        <td>{player.Ties}</td>
                        <td>{player.GameWins}</td>
                        <td>{player.GameLosses}</td>
                        <td>{player.WinPercentage}</td>
                        <td>{player.TotalPoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default ZLeaguePage;
