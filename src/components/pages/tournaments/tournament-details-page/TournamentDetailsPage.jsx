import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DataTable, FormButton, GlobalModal, Loading, ThreeColumnLayout } from '../../../global';
import { TournamentEditForm, TournamentRegistrationForm, TournamentRegisteredPlayersList } from './';
import { useTournament } from '../../../hooks';
import { roleBasedAccessService } from '../../../../services';
import './TournamentDetailsPage.css';

const TournamentDetailsPage = () => {
  const { tournamentId } = useParams();
  const user = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const { tournament, loading, error, updateTournament, registerTeam, updatePlayerStatus } = useTournament(tournamentId);

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Loading redirect={false} errorMessage={`Error loading tournament details: ${error.message}`} />;
  }

  const tournamentFields = tournament
    ? [
      { field: 'date', headerName: 'Start Date' },
      { field: 'time', headerName: 'Start Time' },
      { field: 'description', headerName: 'Description' },
      { field: 'gameName', headerName: 'Game' },
      { field: 'tournamentType', headerName: 'Type' },
      { field: 'tournamentFormat', headerName: 'Format' },
      { field: 'platform', headerName: 'Platform' },
      { field: 'maxPlayers', headerName: 'Max Players' },
      {
        field: 'entryFeeAmount',
        headerName: 'Entry Fee',
        renderCell: (row) => `${row.entryFeeAmount} ${row.entryFeeType}`,
      },
    ]
    : [];

  const userTeam = tournament?.teams?.find((team) =>
    team.players.some((player) => player.profileId === user.profileId)
  );
  const userPlayer = userTeam?.players?.find((player) => player.profileId === user.profileId);

  return (
    <ThreeColumnLayout>
      <h1 className="sovjet-page-heading">Tournament</h1>
      <section className="content-box">
        <h2 className="sovjet-content-heading">{tournament.tournamentName}</h2>
        <hr />
        <DataTable
          columns={tournamentFields}
          data={[tournament]}
          hideColumnsOnMobile={[]}
          layoutType="card" />
        {roleBasedAccessService.hasRequiredRole('host') && (
          <FormButton onClick={openEditModal}>Edit Tournament</FormButton>
        )}
        {roleBasedAccessService.isLoggedIn() ? (
          <TournamentRegistrationForm
            tournamentFormat={tournament.tournamentFormat}
            onRegister={registerTeam}
            onUpdatePlayerStatus={updatePlayerStatus}
            tournamentId={Number(tournamentId)}
            teams={tournament.teams}
          />
        ) : (
          <div>
            <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to register.
          </div>
        )}
        {console.log('tournamentFormat', tournament.tournamentFormat)}
        <TournamentRegisteredPlayersList
          teams={tournament.teams}
          tournamentFormat={tournament.tournamentFormat}
        />
      </section>
      {roleBasedAccessService.hasRequiredRole('host') && (
        <GlobalModal
          title="Edit Tournament"
          show={showEditModal}
          onClose={closeEditModal}
          footerButtons={[
            {
              text: 'Save Changes',
              onClick: () => document.getElementById('editTournamentForm').submit(),
            },
            {
              text: 'Cancel',
              variant: 'secondary',
              onClick: closeEditModal,
            },
          ]}
        >
          <TournamentEditForm
            initialValues={tournament}
            onSubmit={updateTournament} />
        </GlobalModal>
      )}
    </ThreeColumnLayout>
  );
};

export default TournamentDetailsPage;
