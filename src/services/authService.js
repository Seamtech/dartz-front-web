import realAuthService from './actual/authService';
import mockAuthService from './mock/mockAuthService';
const authService = import.meta.env.VITE_USE_MOCK === 'true' ? mockAuthService : realAuthService;
export default authService;