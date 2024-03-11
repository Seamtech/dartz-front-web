import realLeaderboardService from './actual/leaderboardService';
import mockleaderboardService from './mock/mockLeaderboardService';
const leaderboardService = process.env.REACT_APP_USE_MOCK === 'true' ? mockleaderboardService : realLeaderboardService;
export default leaderboardService;