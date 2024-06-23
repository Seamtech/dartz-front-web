import axios from 'axios';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiInstance = axios.create({
  baseURL: DEFAULT_API_URL,
  withCredentials: true,
});

export default apiInstance;