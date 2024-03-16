import React, { useState, useEffect } from 'react';
import Chat from '../Chat';

const ChatPage = () => {
  return (
    <main className="main-content">

        <h1 className="sovjet-page-heading">Global Chat</h1>
        <Chat />
    </main>
  );
};

export default ChatPage;