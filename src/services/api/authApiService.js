import apiInstance from './apiService';
import { store } from '../../redux/store';
import { logout, setRefreshToken } from '../../redux/slices/userSlice';
import authService from '../user/authService';

const authApi = apiInstance;

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

// Helper function to refresh token
const refreshAccessToken = async () => {
  const state = store.getState();
  const refreshToken = state.user.refreshToken;

  if (!refreshToken) {
    store.dispatch(logout());
    window.location.href = '/login'; // Redirect to login page
    return;
  }

  try {
    const response = await authService.refreshToken(refreshToken);
    store.dispatch(setRefreshToken(response.refreshToken)); // Update the new refreshToken in the Redux store
    isRefreshing = false;
    onRefreshed();
    // No need to return accessToken as it is set via HTTP-only cookies
  } catch (error) {
    store.dispatch(logout());
    window.location.href = '/login'; // Redirect to login page
    throw error;
  }
};

// Response interceptor to handle token refresh
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(() => {
            resolve(authApi(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAccessToken();
        return authApi(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
