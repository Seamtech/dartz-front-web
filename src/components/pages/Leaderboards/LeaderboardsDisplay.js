import React from 'react';
import { Link } from 'react-router-dom';

const LeaderboardsDisplay = ({ selectedLeaderboard, sortedStatistics, usersMap }) => (
  <div>
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
              {sortedStatistics.map((statistic, index) => {
                const user = usersMap[statistic.user_id];
                return (
                  <tr key={index}>
                    <td>#</td>
                    <td className="sovjet-text">
                      <Link to={`/players/${user.id}`}>
                        {user.first_name} {user.last_name} - {user.city}, {user.state}
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
);

export default LeaderboardsDisplay;
