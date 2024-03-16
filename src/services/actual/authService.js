import axios from 'axios';

const API_URL = import.meta.env.API_URL;
//const API_KEY = import.meta.env.SECRET_KEY;

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