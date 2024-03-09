import realAuthService from './actual/authService';
import mockAuthService from './mock/mockAuthService';
await console.log(process.env.REACT_APP_USE_MOCK);
const authService = process.env.REACT_APP_USE_MOCK === 'true' ? mockAuthService : realAuthService;
export default authService;