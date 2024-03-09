import realAuthService from './actual/authService';
import mockAuthService from './mock/mockAuthService';
const authService = process.env.REACT_APP_USE_MOCK === 'true' ? mockAuthService : realAuthService;
export default authService;