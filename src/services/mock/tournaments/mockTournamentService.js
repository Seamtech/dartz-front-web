import registerForTournament from './mockRegisterForTournament';
import getRegisteredPlayers from './mockGetRegisteredPlayers';
import getTournamentById from './mockGetTournamentById';

/**
 * The mock tournament service that aggregates all mock tournament-related methods.
 */
export const mockTournamentService = {
  registerForTournament,
  getRegisteredPlayers,
  getTournamentById,
  // Add other tournament-related mock methods here as you create them
};

export default mockTournamentService;