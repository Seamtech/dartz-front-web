let listeners = {};

const emitEvent = (eventName, data) => {
  if (listeners[eventName]) {
    listeners[eventName].forEach(callback => callback(data));
  }
};

const connect = async (url, options = {}) => {
  console.log('Mock WebSocket Connected', {url, options});
  // Simulate connection established after a delay
  setTimeout(() => emitEvent('connect', {}), 100);
};

const disconnect = () => {
  console.log('Mock WebSocket Disconnected');
  listeners = {}; // Reset event listeners
};

const subscribe = (eventName, callback) => {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }
  listeners[eventName].push(callback);
  console.log(`Subscribed to event: ${eventName}`);
};

const unsubscribe = (eventName) => {
  if (listeners[eventName]) {
    delete listeners[eventName];
    console.log(`Unsubscribed from event: ${eventName}`);
  }
};

// Exposing a method to manually trigger events for testing purposes
const trigger = (eventName, data) => {
  emitEvent(eventName, data);
};

export const mockWebSocketService = {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    trigger, // Only for testing purposes
};

export default mockWebSocketService;