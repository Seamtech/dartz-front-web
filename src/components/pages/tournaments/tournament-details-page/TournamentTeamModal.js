import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { GlobalModal } from '../../../global'; // Import GlobalModal from global
const TournamentTeamModal = ({ team, show, onClose }) => {
  return (
    <GlobalModal
      title={`Team: ${team.teamName}`}
      show={show}
      onClose={onClose}
      footerButtons={[{ text: 'Close', variant: 'secondary', onClick: onClose }]}
    >
      <ul>
        {team.membersDetails?.map((member, index) => (
          member ? (
            <li key={index}>
              <Link to={`/players/playerProfile?username=${member.username}`}>{member.first_name} {member.last_name}</Link>
            </li>
          ) : null
        ))}
      </ul>
    </GlobalModal>
  );
};

export default TournamentTeamModal;
