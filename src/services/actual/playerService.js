import axios from 'axios';

const API_URL = import.meta.env.API_URL;

// Adjusted to accept and use an object with type and value for the search
const getPlayerDetails = async ({ type, value }) => {
  // Assuming the backend expects a POST request with a body containing type and value
  const response = await axios.post(`${API_URL}/findPlayer`, { type, value });
  return response.data;
};

export const playerService = {
  getPlayerDetails,
};
export default playerService;