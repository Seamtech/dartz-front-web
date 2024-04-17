// src/services/webSocketService.js
import io from 'socket.io-client';

let socket = null;

const connect = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!socket) {
            socket = io(url, { ...options, withCredentials: true });

            socket.on('connect', () => {
                resolve(socket); // Resolve the promise upon successful connection
            });

            socket.on('disconnect', () => {
            });

            socket.on('connect_error', (error) => {
                console.error('Connection Error:', error);
                reject(error); // Reject the promise on connection error
            });
        } else {
            resolve(socket); // Resolve immediately if the socket is already initialized
        }
    });
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

const isActive = () => {
    return socket !== null && socket.connected;
};

const eventListeners = new Map();

const subscribe = (roomName, callback) => {
    try {
        if (socket && socket.connected) {
            if (!eventListeners.has(roomName)) {
                eventListeners.set(roomName, new Set());
                // Emit event to join room
                socket.emit('joinRoom', roomName);
            }

            if (!eventListeners.get(roomName).has(callback)) {
                socket.on(roomName, callback); // Listen to events for this room
                eventListeners.get(roomName).add(callback);
                console.log(`Subscribed to ${roomName}`);
            } else {
                console.log(`Already subscribed to ${roomName} with provided callback.`);
            }
        } else {
            console.log("Socket not connected or does not exist.");
        }
    } catch (error) {
        console.error(`Error subscribing to ${roomName}:`, error);
    }
};

const unsubscribe = (roomName, callback) => {
    try {
        if (socket && eventListeners.has(roomName)) {
            if (callback) {
                socket.off(roomName, callback); // Stop listening to events for this room
                eventListeners.get(roomName).delete(callback);

                // Check if no more listeners for this room, then leave the room
                if (eventListeners.get(roomName).size === 0) {
                    socket.emit('leaveRoom', roomName); // Emit event to leave room
                    eventListeners.delete(roomName);
                }

                console.log(`Unsubscribed specific callback from ${roomName}`);
            } else {
                socket.off(roomName); // This removes all listeners for the room
                socket.emit('leaveRoom', roomName); // Emit event to leave room
                eventListeners.delete(roomName);
            }
        }
    } catch (error) {
        console.error(`Error unsubscribing from ${roomName}:`, error);
    }
};

const crudActions = (update, currentData) => {
    if (!update || !update.message || typeof update.message !== 'object') {
        console.error('Invalid update format:', update);
        return currentData;
    }

    const { type, data } = update.message;

    if (!data || !data.id) {
        console.error('Invalid data format or missing id in update:', update);
        return currentData;
    }

    try {
        switch (type) {
            case 'add':
                // Ensure that we do not add an item that already exists.
                if (!currentData.some(item => item.id === data.id)) {
                    return [...currentData, data];
                }
                return currentData;

            case 'remove':
                return currentData.filter(item => item.id !== data.id);

            case 'update':
                // Here, we use {...item, ...data} to merge the updated properties
                // This allows for partial updates where `data` might not contain all properties
                console.log(data);
                const returnData = currentData.map(item => item.id === data.id ? { ...item, ...data } : item);
                console.log(returnData);
                return returnData;
            default:
                console.error('Unhandled update type:', type);
                return currentData;
        }
    } catch (error) {
        console.error('Error processing CRUD operation:', error);
        return currentData; // Return the current data unchanged in case of error
    }
};

export const webSocketService = {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    isActive,
    crudActions,
};

export default webSocketService;