import realPlayerService from './actual/playerService';
import mockPlayerService from './mock/mockPlayerService';
const playerService = process.env.REACT_APP_USE_MOCK === 'true' ? mockPlayerService : realPlayerService;
export default playerService;