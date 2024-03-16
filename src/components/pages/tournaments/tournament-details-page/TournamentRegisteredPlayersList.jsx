import React, { useEffect, useState } from 'react';
import { DataTable } from '../../../global';
import { tournamentService } from '../../../../services';
import TournamentTeamModal from './TournamentTeamModal';

const TournamentRegisteredPlayersList = ({ tournamentId, tournamentType }) => {
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchRegisteredTeams = async () => {
      const teams = await tournamentService.getRegisteredPlayers(tournamentId);
      setRegisteredTeams(teams);
    };

    fetchRegisteredTeams();
  }, [tournamentId]);

  const handleTeamNameClick = (team) => {
    setSelectedTeam(team);
  };

  const renderTeamNameCell = (team) => (
<button onClick={() => handleTeamNameClick(team)} style={{ cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}>
          {team.teamName}
        </button>
  );
  
    const columns = tournamentType === 'SingleZ' ? [
      {
        field: 'first_name', 
        headerName: 'Name', 
        // Adjust this line to correctly extract the first_name from membersDetails
        renderCell: (row) => row.membersDetails[0]?.username || 'N/A'
      },
      {
        field: 'checkedIn', 
        headerName: 'Checked In', 
        renderCell: (row) => row.membersDetails[0]?.checkedIn ? '✓' : ''
      },
    ] : [
      {
        field: 'teamName', 
        headerName: 'Team Name', 
        renderCell: (row) => renderTeamNameCell(row)
      },
      {
        field: 'checkedIn', 
        headerName: 'Checked In', 
        // Assuming a team is checked in if any of its members are checked in
        renderCell: (row) => row.membersDetails.some(member => member?.checkedIn) ? '✓' : '' 
      },
    ];
return (
  <>
          <h3 className="sovjet-section-heading">Registered Teams: {registeredTeams.length}</h3>
    <DataTable columns={columns} data={registeredTeams} hideColumnsOnMobile={['checkedIn']} />
    {selectedTeam && (
      <TournamentTeamModal
        team={selectedTeam}
        show={!!selectedTeam} // Pass show prop based on selectedTeam state
        onClose={() => setSelectedTeam(null)}
      />
    )}
  </>
);
};

export default TournamentRegisteredPlayersList;
