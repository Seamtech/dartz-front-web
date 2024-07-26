import api from '../api/apiService';

const flattenPlayerDetails = (player) => {
  return {
    ...player,
    totalGamesPlayed: player.playerStatistics.totalGamesPlayed,
    totalGamesWon: player.playerStatistics.totalGamesWon,
    totalGamesLost: player.playerStatistics.totalGamesLost,
    ppd: player.playerAverageStatistics.ppd,
    mpr: player.playerAverageStatistics.mpr,
    playerRating: player.playerAverageStatistics.playerRating,
    zRating: player.playerAverageStatistics.zRating,
  };
};

const getPlayerDetails = async ({ type, value }) => {
  try {
    const response = await api.get(`/findPlayer`, { params: { type, value } });
    console.log('Player details:', response.data);
    return response.data.map(flattenPlayerDetails);
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw new Error('Failed to fetch player details');
  }
};

const getPlayerBasicDetails = async ({ type, value }) => {
  try {
    const response = await api.get(`/findPlayerBasicDetails`, {
      params: { type, value },
    });
    console.log('Player basic details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching player basic details:', error);
    throw new Error('Failed to fetch player basic details');
  }
};

const batchPlayerLookup = async (lookups) => {
  try {
    const response = await api.post(`/batchPlayerLookup`, lookups);
    console.log('Batch player lookup:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during batch player lookup:', error);
    throw new Error('Failed to perform batch player lookup');
  }
};

export const playerService = {
  getPlayerDetails,
  getPlayerBasicDetails,
  batchPlayerLookup,
};

export default playerService;
