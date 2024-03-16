import realTournamentService from './actual/tournaments/tournamentService';
import mockTournamentService from './mock/tournaments/mockTournamentService';
const tournamentService = process.env.REACT_APP_USE_MOCK === 'true' ? mockTournamentService : realTournamentService;
export default tournamentService;