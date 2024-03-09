import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
//const API_KEY = process.env.REACT_APP_SECRET_KEY;

const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  };

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
    return response.data;   
};

const authService = {
  signup,
  login,
  logout

  // other auth related services
};

export default authService;