import apiInstance from '../api/apiService';

const signup = async (userData) => {
  try {
    console.log(userData);
    const response = await apiInstance.post('/signup', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const login = async (userData) => {
  try {
    const response = await apiInstance.post('/login', userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const logout = async (refreshToken) => {
  try {
    const response = await apiInstance.post('/logout', { token: refreshToken });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const response = await apiInstance.post('/refresh-token', { refreshToken });
    return response.data; // This should return the new refresh token
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.error.message);
  } else if (error.request) {
    throw new Error('No response from server. Please try again later.');
  } else {
    throw new Error('Error setting up request. Please try again.;' + error);
  }
};

const authService = {
  signup,
  login,
  logout,
  refreshToken,
};

export default authService;