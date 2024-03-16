import { teams, tournamentsData, users } from '../../../data';

const mockGetRegisteredTeams = (tournamentId) => {
  // Find all team_ids registered for the given tournamentId
  const registeredTeamIds = tournamentsData
    .filter(team => team.tournament_id === tournamentId.toString())
    .map(team => team.team_id);

  // Fetch detailed team info for each registered team_id
  const registeredTeamsWithDetails = teams.filter(team =>
    registeredTeamIds.includes(team.team_id)
  );

  // Optionally enrich team objects with additional details if necessary
  return registeredTeamsWithDetails.map(team => ({
    ...team,
    // Example: Adding dynamically computed fields or merging additional data
    membersDetails: team.members.map(userId =>
      // Assuming `users` is an array of user objects
      users.find(user => user.id === userId)
    ),
  }));
};

export default mockGetRegisteredTeams;
