import React from 'react';
import { DataTable } from '../../../global';
import { Link } from 'react-router-dom';
import './TournamentsItem.css';

const TournamentList = ({ tournaments }) => {
  const tournamentFields = [
    { field: 'id', headerName: 'ID', renderCell: (row) => <Link to={`/tournaments/${row.id}`}>{row.id}</Link> },
    { field: 'name', headerName: 'Name'},
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'tournamentFormat', headerName: 'Format' },
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
