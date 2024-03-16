import realWebSocketService from './actual/webSocketService';
import mockWebSocketService from './mock/mockWebSocketService';
const webSocketService = process.env.REACT_APP_USE_MOCK === 'true' ? mockWebSocketService : realWebSocketService;
export default webSocketService;