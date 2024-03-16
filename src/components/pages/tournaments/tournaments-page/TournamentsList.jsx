// TournamentList.js
import React from 'react';
import { DataTable } from '../../../global';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './TournamentsItem.css'

const TournamentList = ({ tournaments }) => {
  console.log(tournaments)
  const tournamentFields = [
    { field: 'name', headerName: 'Name', renderCell: (row) => <Link to={`/tournaments/${row.id}`}>{row.name}</Link> }, // Render the name as a clickable link
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'type', headerName: 'Type' },
    { field: 'entryFee', headerName: 'Entry' },
    { field: 'playerRatingLimit', headerName: 'Cap' },
    { field: 'game', headerName: 'Game' },

  ];

  return (
    <div className="tournament-list">
      <DataTable columns={tournamentFields} data={tournaments} hideColumnsOnMobile={[]} />
    </div>
  );
};

export default TournamentList;
