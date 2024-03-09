import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const findPlayer = async (searchCriteria) => {
  const response = await axios.post(`${API_URL}/findPlayer`, searchCriteria);
  return response.data;
};

export const playerService = {
  findPlayer,
};
