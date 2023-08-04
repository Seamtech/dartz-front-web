import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { user_statistics } from "../../data/user_statistics";
import { users } from "../../data/users"; // import your users data

const leaderboardTypes = [
  { Name: "Total Games Played", field: "total_games_played" },
  { Name: "Total Games Won", field: "total_games_won" },
  { Name: "Total Games Lost", field: "total_games_lost" },
  { Name: "PPD", field: "ppd" },
  { Name: "MPD", field: "mpd" },
  { Name: "Tournaments Won", field: "tournaments_won" },
  { Name: "Tournaments Played", field: "tournaments_played" },
  { Name: "Tournament Winnings", field: "tournament_winnings" },
  { Name: "Z Championships", field: "z_championships" },
  { Name: "Z Winnings", field: "z_winnings" },
  { Name: "Total Winnings", field: "total_winnings" },
  { Name: "Z Seasons Played", field: "z_seasons_played" },
  { Name: "Z Rating", field: "z_rating" },
  { Name: "Player Rating", field: "player_rating" },
];

const LeaderBoardsPage = () => {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(null);
  const [usersMap, setUsersMap] = useState({});

  // create a map of user IDs to user objects when the component mounts
  useEffect(() => {
    const map = {};
    users.forEach((user, i) => {
      map[user.id] = user;
      map[user.rank] = i;
    });
    setUsersMap(map);
  }, []);

  const sorteduser_statistics = selectedLeaderboard
    ? [...user_statistics].sort(
        (a, b) => b[selectedLeaderboard.field] - a[selectedLeaderboard.field]
      )
    : [];

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Leaderboards</h1>
      <div className="LeaderBoardsPage">
        <div className="content-box">
          <h2 className="sovjet-content-heading">Select Leaderboard</h2>
          <div className="LeaderboardSelection">
            {leaderboardTypes.map((type) => (
              <span
                key={type.field}
                onClick={() => setSelectedLeaderboard(type)}
                className={selectedLeaderboard === type ? "selected" : ""}
              >
                {type.Name}
              </span>
            ))}
          </div>
          <hr />
          {selectedLeaderboard && (
            <div>
              <h3 className="sovjet-section-heading">
                {selectedLeaderboard.Name}
              </h3>
              <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>{selectedLeaderboard.Name}</th>
                  </tr>
                </thead>
                <tbody>
                  {sorteduser_statistics.map((statistic, index) => {
                    // get the user corresponding to this statistic
                    const user = usersMap[statistic.user_id];
                    return (
                      <tr key={index}>
                        <td>#</td>
                        <td className="sovjet-text">
                          <Link to={`/players/${user.id}`}>
                            {user.first_name} {user.last_name} - {user.city},{" "}
                            {user.state}
                          </Link>
                        </td>
                        <td>{statistic[selectedLeaderboard.field]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LeaderBoardsPage;
