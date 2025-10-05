// Message list component - Displays all chat messages
import React, { useEffect, useRef } from 'react';
import './MessageList.css';

function MessageList({ messages, currentUser, typingUsers }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isOwnMessage = (sender) => sender === currentUser;

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation! 👋</p>
          </div>
        ) : (
          messages.map((message, index) => {
            if (message.type === 'system') {
              // System messages (user joined/left)
              return (
                <div key={message._id || index} className="system-message">
                  <span className="system-text">{message.content}</span>
                  <span className="system-time">{formatTime(message.timestamp)}</span>
                </div>
              );
            } else {
              // Regular user messages
              const isOwn = isOwnMessage(message.sender_username);
              return (
                <div
                  key={message._id || index}
                  className={`message ${isOwn ? 'own-message' : 'other-message'}`}
                >
                  <div className="message-content">
                    {!isOwn && (
                      <div className="message-sender">{message.sender_username}</div>
                    )}
                    <div className="message-bubble">
                      <p className="message-text">{message.content}</p>
                      <span className="message-time">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            <div className="typing-content">
              <span className="typing-text">
                {typingUsers.length === 1
                  ? `${typingUsers[0]} is typing`
                  : `${typingUsers.length} people are typing`}
              </span>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default MessageList;
