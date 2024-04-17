import registerForTournament from './registerForTournament';
import getRegisteredPlayers from './getRegisteredPlayers';
import getTournamentById from './getTournamentById';
import getTournaments from './getTournaments';

/**
 * The mock tournament service that aggregates all mock tournament-related methods.
 */
export const tournamentService = {
  registerForTournament,
  getRegisteredPlayers,
  getTournamentById,
  getTournaments,
  // Add other tournament-related mock methods here as you create them
};

export default tournamentService;