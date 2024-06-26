import React from "react";
import DataTable from "../../global/table/DataTable"; // Adjust the import path as needed
import { Link } from "react-router-dom";

const LeaderboardsDisplay = ({
  selectedLeaderboard,
  leaderboardData,
  leaderboardTypes,
}) => {
  // Generate a list of column fields to hide on mobile, excluding the selected field
  const hideColumnsOnMobile = leaderboardTypes
    .filter((type) => type.field !== selectedLeaderboard.field)
    .map((type) => type.field);

  // Dynamically generate columns based on leaderboardTypes
  const dynamicColumns = leaderboardTypes.map((type) => ({
    field: type.field,
    headerName: type.Name,
    // Apply 'selected-column' class only to the selected field for styling or identification
    className:
      type.field === selectedLeaderboard.field ? "selected-column" : "",
  }));

  const columns = [
    { field: "rank", headerName: "Rank", className: "" }, // Rank always shown
    {
      field: "player",
      headerName: "Player",
      className: "", // Player name always shown
      renderCell: (row) => (
        <Link to={`/players/playerProfile?id=${row.userId}`}>
          {row.username}
        </Link>
      ),
    },
    ...dynamicColumns,
  ];

  // Map leaderboardData to include a 'player' field for DataTable compatibility
  const data = leaderboardData.map((item, index) => ({
    ...item,
    rank: index + 1,
    player: `${item.username}`, // Assuming 'username' field exists
  }));

  return (
    <div>
      {selectedLeaderboard && (
        <div>
          <h3 className="sovjet-section-heading">{selectedLeaderboard.Name}</h3>
          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={data}
              hideColumnsOnMobile={hideColumnsOnMobile}
              layoutType="card"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardsDisplay;
