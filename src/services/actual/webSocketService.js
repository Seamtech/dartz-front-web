// src/services/webSocketService.js
import io from 'socket.io-client';

let socket = null;

const connect = async (url, options = {}) => {
    try {
        if (!socket) {
            socket = io(url, { ...options, withCredentials: true });

            socket.on('connect', () => console.log('WebSocket Connected'));
            socket.on('disconnect', () => console.log('WebSocket Disconnected'));
            socket.on('connect_error', (error) => console.error('Connection Error:', error));
        }
    } catch (error) {
        console.error('WebSocket Connection Failed:', error);
    }
};

const disconnect = () => {
    try {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    } catch (error) {
        console.error('Error disconnecting WebSocket:', error);
    }
};

const subscribe = (eventName, callback) => {
    try {
        if (socket && socket.connected) {
            socket.on(eventName, callback);
        } else {
            console.log("Socket not connected or does not exist.");
        }
    } catch (error) {
        console.error(`Error subscribing to ${eventName}:`, error);
    }
};

const unsubscribe = (eventName) => {
    try {
        if (socket) {
            socket.off(eventName);
        }
    } catch (error) {
        console.error(`Error unsubscribing from ${eventName}:`, error);
    }
};

export const webSocketService = {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
};

export default webSocketService;