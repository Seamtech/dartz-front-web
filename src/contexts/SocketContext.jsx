import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useWebSocket } from '../components/hooks';

const WebSocketContext = createContext(null);

export const SocketProvider = ({ url, children }) => {
  const isAuthenticated = useSelector(state => state.user.refreshToken !== null);
  const { socket, subscribe, unsubscribe } = useWebSocket(url, isAuthenticated);

  return (
    <WebSocketContext.Provider value={{ socket, subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useSocket = () => useContext(WebSocketContext);
