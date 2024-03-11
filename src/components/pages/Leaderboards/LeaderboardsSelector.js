import React from 'react';

const LeaderboardsSelector = ({ leaderboardTypes, selectedLeaderboard, onSelect }) => {
  // Handle change event for the select dropdown
  const handleChange = (event) => {
    // Find the selected leaderboard type object based on the selected value
    const selectedType = leaderboardTypes.find(type => type.Name === event.target.value);
    onSelect(selectedType);
  };

  return (
    <div className="LeaderboardSelection">
      <select value={selectedLeaderboard.Name} onChange={handleChange}>
        {leaderboardTypes.map((type) => (
          <option key={type.Name} value={type.Name}>
            {type.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeaderboardsSelector;
