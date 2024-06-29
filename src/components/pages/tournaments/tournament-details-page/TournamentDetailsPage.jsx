import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import tournamentService from "../../../../services/tournaments/tournamentService";
import roleBasedAccessService from "../../../../services/user/roleBasedAccessService";
import { DataTable } from "../../../global";
import TournamentRegistrationForm from "./TournamentRegistrationForm";
import { Container } from "react-bootstrap";
import TournamentRegisteredPlayersList from "./TournamentRegisteredPlayersList";
import "./TournamentDetailsPage.css";
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout";

const TournamentDetailsPage = () => {
  const { tournamentId } = useParams();
  const user = useSelector((state) => state.user);
  const [tournament, setTournament] = useState(null);

  const flattenTournamentData = (tournament) => {
    const scheduledStart = new Date(tournament.details.scheduledStart);
    const date = scheduledStart.toLocaleDateString();
    const time = scheduledStart.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      ...tournament,
      date,
      time,
      tournamentName: tournament.details.tournamentName || "Unnamed Tournament",
      maxPlayers: tournament.details.maxPlayers,
      currentRound: tournament.details.currentRound,
      tournamentStatus: tournament.details.tournamentStatus,
      description: tournament.details.tournamentDescription,
      gameName: tournament.game.name,
      gameDescription: tournament.game.description,
      baseGame: tournament.game.base_game,
      handicapType: tournament.game.handicap_type,
      bullType: tournament.game.bull_type,
      outType: tournament.game.out_type,
      playerCount: tournament.teams
        ? tournament.teams.reduce((acc, team) => acc + team.players.length, 0)
        : 0,
      tournamentFormat: tournament.tournamentFormat,
      platform: tournament.platform,
      teams: tournament.teams || [],
    };
  };

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const fetchedTournament = await tournamentService.getTournamentById(
          tournamentId
        );
        const flattenedTournament = flattenTournamentData(fetchedTournament);
        setTournament(flattenedTournament);
      } catch (error) {
        console.error("Failed to fetch tournament details:", error);
      }
    };

    fetchTournament();
  }, [tournamentId]);

  const handleRegister = async (formData) => {
    try {
      await tournamentService.registerTeam(
        formData.tournamentId,
        formData.team
      );
      const updatedTournament = await tournamentService.getTournamentById(
        tournamentId
      );
      setTournament(flattenTournamentData(updatedTournament));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleUpdatePlayerStatus = async (
    tournamentId,
    teamId,
    playerId,
    status
  ) => {
    try {
      await tournamentService.updatePlayerStatus(
        tournamentId,
        teamId,
        playerId,
        status
      );
      const updatedTournament = await tournamentService.getTournamentById(
        tournamentId
      );
      setTournament(flattenTournamentData(updatedTournament));
    } catch (error) {
      console.error(`Failed to update player status to ${status}:`, error);
    }
  };

  const tournamentFields = tournament
    ? [
        { field: "tournamentName", headerName: "Tournament Name" },
        { field: "tournamentType", headerName: "Type" },
        { field: "date", headerName: "Start Date" },
        { field: "time", headerName: "Start Time" },
        {
          field: "entryFeeAmount",
          headerName: "Entry Fee",
          renderCell: (row) => `${row.entryFeeAmount} ${row.entryFeeType}`,
        },
        { field: "gameName", headerName: "Game" },
        { field: "playerCount", headerName: "Teams Participating" },
        { field: "maxPlayers", headerName: "Max Players" },
        { field: "currentRound", headerName: "Current Round" },
        { field: "tournamentStatus", headerName: "Status" },
        { field: "description", headerName: "Description" },
        { field: "tournamentFormat", headerName: "Format" },
        { field: "platform", headerName: "Platform" },
      ]
    : [];

  if (!tournament) {
    return <div>Loading tournament details...</div>;
  }

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
          layoutType="card"
        />
        {roleBasedAccessService.isLoggedIn() ? (
          <TournamentRegistrationForm
            tournamentType={tournament.tournamentFormat}
            onRegister={handleRegister}
            onUpdatePlayerStatus={handleUpdatePlayerStatus} // Make sure this function is defined and passed
            tournamentId={Number(tournamentId)}
            teams={tournament.teams}
          />
        ) : (
          <div>
            <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>{" "}
            to register.
          </div>
        )}
        <TournamentRegisteredPlayersList
          teams={tournament.teams}
          tournamentType={tournament.tournamentFormat}
        />
      </section>
    </ThreeColumnLayout>
  );
};

export default TournamentDetailsPage;
