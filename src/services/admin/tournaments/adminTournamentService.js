import { authApiService } from '../..';

export const createTournament = async (tournamentData) => {
  try {
    console.log('tournamentData:', tournamentData);
    const response = await authApiService.post('/tournaments', tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

const adminTournamentService = {
  createTournament,
};

export default adminTournamentService;
