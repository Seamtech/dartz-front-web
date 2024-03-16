import realTournamentService from './actual/tournaments/tournamentService';
import mockTournamentService from './mock/tournaments/mockTournamentService';
const tournamentService = import.meta.env.VITE_USE_MOCK === 'true' ? mockTournamentService : realTournamentService;
export default tournamentService;