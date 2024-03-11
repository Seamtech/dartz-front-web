import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const getLeaderboard = async (field) => {
  try {
    // Replace this with a real API call
    const response = await axios.get(`${API_URL}/leaderboard/${field}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    throw error; // Re-throw to handle it in the calling component
  }
};

export const leaderboardService = {
  getLeaderboard,
};

export default leaderboardService;
