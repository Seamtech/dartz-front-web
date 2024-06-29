import api from '../api/apiService';

const getLeaderboard = async (field) => {
  try {
    const response = await api.get(`/leaderboard/${field}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    throw error;
  }
};

export const leaderboardService = {
  getLeaderboard,
};

export default leaderboardService;
