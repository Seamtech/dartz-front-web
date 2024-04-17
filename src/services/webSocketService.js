import realWebSocketService from './actual/webSocketService';
import mockWebSocketService from './mock/mockWebSocketService';
const webSocketService = realWebSocketService;
//const webSocketService = import.meta.env.VITE_USE_MOCK === 'true' ? mockWebSocketService : realWebSocketService;
export default webSocketService;