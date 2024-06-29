import api from '../api/apiService';

// Fetch all tournaments
export const getTournaments = async () => {
  try {
    const response = await api.get('/tournaments');
    console.log('Returned Fetched tournaments:', JSON.stringify(response.data)); // Debug log
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tournaments:', error);
    throw error;
  }
};

// Fetch tournament by ID
export const getTournamentById = async (id) => {
  try {
    const response = await api.get(`/tournaments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tournament:', error);
    throw error;
  }
};

// Adjusted to take a single object parameter
export const registerTeam = async ({tournamentId, team}) => {
  try {
    const response = await api.post(`/tournaments/${tournamentId}/register-team`, team);
    return response.data;
  } catch (error) {
    console.error('Failed to register team:', error);
    throw error;
  }
};

// Update player status for a tournament (check-in or check-out)
export const updatePlayerStatus = async (tournamentId, teamId, playerId, status) => {
  try {
    console.log(`Updating status to ${status} for player ID ${playerId} in team ID ${teamId} for tournament ID ${tournamentId}`); // Debug log
    const response = await api.post('/tournaments/update-player-status', { tournamentId, teamId, playerId, status });
    return response.data;
  } catch (error) {
    console.error(`Failed to update player status to ${status}:`, error);
    throw error;
  }
};

const tournamentService = {
  getTournaments,
  getTournamentById,
  registerTeam,
  updatePlayerStatus,
};

export default tournamentService;
