import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tournaments } from "../../data/tournaments";
import { locations } from "../../data/locations";
import { teams } from "../../data/teams";
import { team_members } from "../../data/team_members";
import { tournament_teams } from "../../data/tournament_teams";
import { users } from "../../data/users";
import Chat from '../Chat';

const findTeamMembers = (teamId) =>
  team_members.filter((member) => member.team_id === teamId);

const TournamentDetailPage = () => {
  const { tournamentId } = useParams();

  // Find the tournament object based on tournamentId
  const tournament = tournaments.find((t) => t.id === parseInt(tournamentId));

  const [isRegistering, setIsRegistering] = useState(false);
  const [zenemy, setZenemy] = useState(false);
  const [location, setLocation] = useState("");
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState(
    Array(tournament.type === "Singles" ? 1 : tournament.type === "Doubles" ? 2 : tournament.type === "Trips" ? 3 : 4).fill("")
  );

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting registration", { zenemy, location, agreedToRules, teamName, teamMembers });
    setIsRegistering(false);
  };

  if (!tournament) {
    return <div>Tournament not found.</div>;
  }

  return (
    <main className="main-content">
      <div className="content-box">
      <h2 className="sovjet-content-heading">{tournament.name}</h2>
      <hr />
      <p>Date: {tournament.date}</p>
      <p>Time: {tournament.time}</p>
      <p>Location: {tournament.location}</p>
      <p>Format: {tournament.format}</p>
      <p>Entry Fee: {tournament.entryFee}</p>
      <p>Player Rating Limit: {tournament.playerRatingLimit}</p>
      <p>Max Participants: {tournament.maxParticipants}</p>
      <p>Type: {tournament.type}</p>              
      <p>Zenemy Fee: ${tournament.zenemy}</p>
        {isRegistering ? (
          <form onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="teamName">Team Name</label>
              <input type="text" id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} disabled={tournament.type === "Singles"} />
            </div>
            {teamMembers.map((member, idx) => (
              <div key={idx}>
                <label htmlFor={`teamMember-${idx}`}>Team Member {idx + 1}</label>
                <input type="text" id={`teamMember-${idx}`} value={member} onChange={(e) => {
                  const newMembers = [...teamMembers];
                  newMembers[idx] = e.target.value;
                  setTeamMembers(newMembers);
                }} list="users" />
              </div>
            ))}
            <datalist id="users">
              {users.map((user, i) => (
                <option key={i} value={`${user.first_name} ${user.last_name}`} />
              ))}
            </datalist>
            <fieldset>
              <legend>Register for Zenemy?</legend>
              <div className="radio-container">
                <input
                  type="radio"
                  id="zenemy-yes"
                  name="zenemy"
                  onChange={() => setZenemy(true)}
                  checked={zenemy}
                />
                <label htmlFor="zenemy-yes">Yes</label>
                <input
                  type="radio"
                  id="zenemy-no"
                  name="zenemy"
                  onChange={() => setZenemy(false)}
                  checked={!zenemy}
                />
                <label htmlFor="zenemy-no">No</label>
              </div>
            </fieldset>
            <div>
              <label htmlFor="location">Location you will be playing at.</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="custom-select"
              >
                {locations.map((loc, i) => (
                  <option key={i} value={loc.id}>
                    {loc.name + " - " + loc.operator}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="checkbox"
                id="rules"
                checked={agreedToRules}
                onChange={() => setAgreedToRules(!agreedToRules)}
              />
              <label htmlFor="rules">I have read and agree to the rules</label>
            </div>
            <button type="submit">Submit Registration</button>
          </form>
        ) : (
          <button onClick={handleRegisterClick}>Register</button>
        )}
        <p></p>
      </div>
      <div className="content-box">
      <h2 className="sovjet-content-heading">Registered Teams: {tournament_teams.length}</h2>
      <div className="table-responsive">
        <table className="registered-teams-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Location</th>
              <th>Zenemy</th>
            </tr>
          </thead>
          <tbody>
            {tournament_teams.map((teamData, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/teams/${teamData.team_id}`}>
                    {
                      teams.find((team) => team.id === teamData.team_id)
                        .team_name
                    }
                  </Link>
                </td>
                <td>
                  {locations.find((loc) => loc.id === teamData.location).name}
                </td>
                <td>{teamData.zenemy ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        <div className="content-box">
          <Chat />
        </div>
    </main>
  );
};

export default TournamentDetailPage;