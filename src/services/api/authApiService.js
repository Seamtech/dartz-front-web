import apiInstance from './apiService';
import { store } from '../../redux/store';
import { logout, setRefreshToken } from '../../redux/slices/userSlice';
import authService from '../authService'; // Adjust the import path

const authApi = apiInstance;

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
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        // Resend the original request without altering headers as the cookie is automatically included
        return apiInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
