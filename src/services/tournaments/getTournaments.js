import api from '../api/apiService';

const getTournaments = async () => {
  try {
    const response = await api.get(`/tournaments`);
    console.log
    return response.data;
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    throw error;
  }
};

export default getTournaments;
