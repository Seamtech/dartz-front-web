import React from 'react';

const LeaderboardsSelector = ({ leaderboardTypes, selectedLeaderboard, onSelect }) => (
  <div className="LeaderboardSelection">
    {leaderboardTypes.map((type) => (
      <span
        key={type.field}
        onClick={() => onSelect(type)}
        className={selectedLeaderboard === type ? "selected" : ""}
      >
        {type.Name}
      </span>
    ))}
  </div>
);

export default LeaderboardsSelector;
