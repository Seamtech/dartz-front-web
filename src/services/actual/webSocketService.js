import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Global variable to hold the shared socket instance
let sharedSocket = null;

const useWebSocketService = (url, shouldConnect, maxRetryAttempts = 5, retryInterval = 3000) => {
  // Ref to keep track of retry attempts and retry status
  const retryCountRef = useRef(0);
  const isRetryingRef = useRef(false);

  useEffect(() => {
    let retryTimer;

    // Function to connect the socket
    const connectSocket = () => {
      const newSocket = io(url, { withCredentials: true });

      newSocket.on('connect', () => {
        console.log("WebSocket connected.");
        retryCountRef.current = 0; // Reset retry count on successful connection
        isRetryingRef.current = false;
      });
      newSocket.on('disconnect', () => console.log("WebSocket disconnected."));
      newSocket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
        // Retry connection if not already retrying and max attempts not reached
        if (!isRetryingRef.current && retryCountRef.current < maxRetryAttempts) {
          isRetryingRef.current = true;
          retryTimer = setTimeout(connectSocket, retryInterval);
          retryCountRef.current += 1;
        } else if (retryCountRef.current >= maxRetryAttempts) {
          console.error(`Maximum retry attempts (${maxRetryAttempts}) reached. Giving up.`);
          // You can add UI notifications here to inform the user about the connection issue
        }
      });

      sharedSocket = newSocket;
    };

    // Connect socket only if shouldConnect is true and sharedSocket is not already initialized
    if (shouldConnect && !sharedSocket) {
      connectSocket();
    }

    return () => {
      // Clear retry timer and disconnect socket on cleanup
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      if (sharedSocket && sharedSocket.connected) {
        sharedSocket.disconnect();
      }
    };
  }, [url, shouldConnect, maxRetryAttempts, retryInterval]);

  useEffect(() => {
    // Reconnect socket if it's not connected when the component mounts
    if (sharedSocket && !sharedSocket.connected) {
      sharedSocket.connect();
    }
  }, []);

  useEffect(() => {
    // Disconnect socket when shouldConnect becomes false (e.g., on user logout)
    if (!shouldConnect && sharedSocket && sharedSocket.connected) {
      sharedSocket.disconnect();
    }
  }, [shouldConnect]);

  // Function to subscribe to a room
  const subscribe = (roomName, handler) => {
    if (sharedSocket && sharedSocket.connected) {
      sharedSocket.on(roomName, handler);
      sharedSocket.emit('joinRoom', roomName);
      console.log(`Subscribed to ${roomName}`);
    } else {
      console.error("Socket is not connected. Cannot subscribe.");
      // You can add UI notifications here to inform the user about the connection issue
    }
  };

  // Function to unsubscribe from a room
  const unsubscribe = (roomName, handler) => {
    if (sharedSocket && sharedSocket.connected) {
      sharedSocket.off(roomName, handler);
      sharedSocket.emit('leaveRoom', roomName);
      console.log(`Unsubscribed from ${roomName}`);
    } else {
      console.error("Socket is not connected. Cannot unsubscribe.");
      // You can add UI notifications here to inform the user about the connection issue
    }
  };

  // Return shared socket instance along with subscribe and unsubscribe functions
  return { socket: sharedSocket, subscribe, unsubscribe };
};

export default useWebSocketService;
