import React, { createContext, useContext, useEffect } from 'react';
import { webSocketService } from '../services'; // Adjust the import path as needed

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        try {
            // Initialize WebSocket connection
            webSocketService.connect(import.meta.env.SOCKET_URL);
        } catch (error) {
            console.error("Failed to initialize WebSocket connection:", error);
        }

        return () => {
            try {
                console.log('Disconnecting from WebSocket server...');
                webSocketService.disconnect();
            } catch (error) {
                console.error("Failed to disconnect WebSocket:", error);
            }
        };
    }, []);
  
    return (
      <SocketContext.Provider value={useSocket}>
        {children}
      </SocketContext.Provider>
    );
  };
  
