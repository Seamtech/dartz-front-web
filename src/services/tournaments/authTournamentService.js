import api from '../api/authApiService';

// Adjusted to take a single object parameter
export const registerTeam = async (team) => {
  try {
    console.log('Registering team:', team); // Debug log
    const response = await api.post(`/tournaments/register-team`, team);
    return response.data;
  } catch (error) {
    console.error('Failed to register team:', error);
    throw error;
  }
};

// Update player status for a tournament (check-in or check-out)
export const updatePlayerStatus = async (
  tournamentId,
  teamId,
  playerId,
  status
) => {
  try {
    console.log(
      `Updating status to ${status} for player ID ${playerId} in team ID ${teamId} for tournament ID ${tournamentId}`
    ); // Debug log
    const response = await api.post('/tournaments/update-player-status', {
      tournamentId,
      teamId,
      playerId,
      status,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update player status to ${status}:`, error);
    throw error;
  }
};

const authTournamentService = {
  registerTeam,
  updatePlayerStatus,
};

export default authTournamentService;
