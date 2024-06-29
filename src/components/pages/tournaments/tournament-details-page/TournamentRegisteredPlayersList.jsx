import React, { useState } from 'react';
import { DataTable } from '../../../global';
import TournamentTeamModal from './TournamentTeamModal';

const TournamentRegisteredPlayersList = ({ teams, tournamentFormat }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(tournamentFormat);
  const CheckMark = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.44z"/>
    </svg>
  );

  const handleTeamNameClick = (team) => {
    setSelectedTeam(team);
    setShowModal(true); // Show the modal when a team is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal explicitly when needed
  };

  const renderTeamNameCell = (team) => {
    const player1 = team.players[0];
    return (
      tournamentFormat === 'SingleZ'
        ? <a href={`/players/playerProfile?id=${player1.profileId}`}>{player1.profile.username}</a>
        : <button onClick={() => handleTeamNameClick(team)} style={{ cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}>
            {player1.profile.username}
          </button>
    );
  };

  const columns = tournamentFormat === 'SingleZ' ? [
    {
      field: 'name',
      headerName: 'Name',
      renderCell: (row) => renderTeamNameCell(row)
    },
    {
      field: 'checkedIn',
      headerName: 'Checked In',
      renderCell: (row) => row.players[0]?.status === 'Checked In' ? <CheckMark /> : '-'
    },
  ] : [
    {
      field: 'name',
      headerName: 'Team Name',
      renderCell: (row) => renderTeamNameCell(row)
    },
    {
      field: 'checkedIn',
      headerName: 'Checked In',
      renderCell: (row) => row.players.every(player => player.status === 'Checked In') ? <CheckMark /> : '-'
    },
  ];

  return (
    <>
      <h3 className="sovjet-section-heading">Registered Teams: {teams.length}</h3>
      <DataTable columns={columns} data={teams} hideColumnsOnMobile={['']} />
      {showModal && (
        <TournamentTeamModal
          team={selectedTeam}
          show={showModal} // Use showModal state here instead of !!selectedTeam
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TournamentRegisteredPlayersList;
