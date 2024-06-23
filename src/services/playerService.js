import api from './api/authApiService';

const getPlayerDetails = async ({ type, value }) => {
  try {
    const response = await api.get(`/findPlayer`, { params: { type, value } });
    console.log('Player details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw new Error('Failed to fetch player details');
  }
};

export const playerService = {
  getPlayerDetails,
};

export default playerService;
