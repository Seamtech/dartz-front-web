import registerForTournament from './mockRegisterForTournament';
import getRegisteredPlayers from './mockGetRegisteredPlayers';
import getTournamentById from './mockGetTournamentById';
import getTournaments from './mockGetTournaments';
/**
 * The mock tournament service that aggregates all mock tournament-related methods.
 */
export const mockTournamentService = {
  registerForTournament,
  getRegisteredPlayers,
  getTournamentById,
  getTournaments,
  // Add other tournament-related mock methods here as you create them
};

export default mockTournamentService;