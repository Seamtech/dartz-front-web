import React, { createContext, useContext, useEffect, useState } from 'react';
import { webSocketService } from '../services'; // Adjust the import path as needed
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        webSocketService.connect(import.meta.env.VITE_SOCKET_URL)
            .then(() => {
                if (webSocketService.isActive()) {
                    setIsConnected(true);
                }
            })
            .catch(error => console.error("WebSocket connection failed:", error));
    
        return () => {
            webSocketService.disconnect();
        };
    }, []);

    // Providing both the webSocketService and the connection status
    const value = { webSocketService, isConnected };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
