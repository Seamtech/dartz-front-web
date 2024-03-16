import realPlayerService from './actual/playerService';
import mockPlayerService from './mock/mockPlayerService';
const playerService = import.meta.env.VITE_USE_MOCK === 'true' ? mockPlayerService : realPlayerService;
export default playerService;