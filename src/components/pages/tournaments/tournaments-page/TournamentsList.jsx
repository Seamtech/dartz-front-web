import React from 'react';
import { DataTable } from '../../../global';
import { Link } from 'react-router-dom';
import './TournamentsItem.css';

const TournamentList = ({ tournaments }) => {
  const tournamentFields = [
    { field: 'name', headerName: 'Name', renderCell: (row) => <Link to={`/tournaments/${row.id}`}>{row.name}</Link> },
    { field: 'tournamentType', headerName: 'Type' },
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'entryFeeAmount', headerName: 'Entry', renderCell: (row) => `${row.entryFeeAmount} ${row.entryFeeType}` },
    { field: 'gameName', headerName: 'Game' },
    { field: 'playerCount', headerName: 'Teams' },
  ];

  return (
    <div className="tournament-list">
      <DataTable columns={tournamentFields} data={tournaments} hideColumnsOnMobile={[]} />
    </div>
  );
};

export default TournamentList;
