import api from './api/apiService';

const ping = async () => {
  try {
    const response = await api.get('/ping');
    return response.data;
  } catch (error) {
    console.error('Error sending ping request:', error);
    throw new Error('Failed to send ping request');
  }
};

export const pingService = {
  ping,
};

export default pingService;
