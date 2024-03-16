import realLeaderboardService from './actual/leaderboardService';
import mockleaderboardService from './mock/mockLeaderboardService';
const leaderboardService = import.meta.env.VITE_USE_MOCK === 'true' ? mockleaderboardService : realLeaderboardService;
export default leaderboardService;