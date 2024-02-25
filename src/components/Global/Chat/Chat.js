import React, { useState, useEffect } from "react";
import { messages } from "../data/chats";
import { Link } from "react-router-dom";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setChatMessages(messages);
  }, []);

  const handleSend = () => {
    console.log(newMessage);
    setNewMessage("");
  };

  return (
    <div className="content-box">
      <h2 className="sovjet-content-heading"> DartZ Public Chat</h2>
      <p>Any abusive language and/or messages will result in suspension and/or possible ban. This is a ZERO tolerance policy.</p>
      <div className="chat-container">
          {chatMessages.map((message, index) => (
            <div className={`chat-messages ${index % 2 === 0 ? 'chat-messages-even' : 'chat-messages-odd'}`} key={index}>
              <Link to={`/players/${message.user_id}`} className="general-link">
                {message.senderName}
              </Link>
              <span className="chat-timestamp"> at {message.timestamp}
                </span>
              <p>{message.message}</p>
            </div>
          ))}
      </div>
      <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSend}>Send</button>
        </div>
    </div>
  );
};

export default Chat;