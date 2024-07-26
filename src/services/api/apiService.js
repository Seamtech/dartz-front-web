import axios from 'axios';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const MAX_REQUESTS_PER_INTERVAL = 100;
const INTERVAL_MS = 1 * 60 * 1000; // 15 minutes

let requestCount = 0;
let isRequestCountReset = false;

const apiInstance = axios.create({
  baseURL: DEFAULT_API_URL,
  withCredentials: true,
});

const resetRequestCount = () => {
  setTimeout(() => {
    requestCount = 0;
    isRequestCountReset = false;
  }, INTERVAL_MS);
};

// Request interceptor for rate limiting
apiInstance.interceptors.request.use(
  (config) => {
    if (requestCount >= MAX_REQUESTS_PER_INTERVAL) {
      return Promise.reject(
        new Error('Too many requests, please try again later.')
      );
    }
    requestCount += 1;
    if (!isRequestCountReset) {
      resetRequestCount();
      isRequestCountReset = true;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;
