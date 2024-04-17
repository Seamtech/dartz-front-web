import realUserService from './actual/user/userService';
import mockUserService from './mock/user/mockUserService';
const userService = import.meta.env.VITE_USE_MOCK === 'true' ? mockUserService : realUserService;
export default userService;