import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import useWebSocketService from '../services/webSocketService';

const WebSocketContext = createContext(null);

export const SocketProvider = ({ url, children }) => {
  const isAuthenticated = useSelector(state => state.user.refreshToken !== null);
  const { socket, subscribe, unsubscribe } = useWebSocketService(url, isAuthenticated);

  return (
    <WebSocketContext.Provider value={{ socket, subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useSocket = () => useContext(WebSocketContext);
