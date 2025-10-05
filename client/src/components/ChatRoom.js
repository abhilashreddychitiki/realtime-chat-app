// Main chat room component with real-time functionality
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './ChatRoom.css';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsers from './OnlineUsers';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';

function ChatRoom({ username }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const originalTitle = useRef(document.title);
  const isWindowFocused = useRef(true);
  const notificationSound = useRef(null);

  // Initialize socket connection and load chat history
  useEffect(() => {
    // Create socket connection
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('✅ Connected to server');
      setIsConnected(true);
      
      // Join the chat with username
      newSocket.emit('user_join', username);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('join_success', (data) => {
      console.log('✅ Successfully joined as:', data.username);
      
      // Load chat history from API
      loadChatHistory();
    });

    // Message event handlers
    newSocket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
      
      // Trigger notification if window is not focused
      if (!isWindowFocused.current && message.sender_username !== username) {
        handleNewMessageNotification();
      }
    });

    newSocket.on('user_joined', (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    newSocket.on('user_left', (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    newSocket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('user_typing', (data) => {
      if (data.isTyping) {
        setTypingUsers((prev) => {
          if (!prev.includes(data.username)) {
            return [...prev, data.username];
          }
          return prev;
        });
      } else {
        setTypingUsers((prev) => prev.filter(u => u !== data.username));
      }
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message || 'An error occurred');
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [username]);

  // Load chat history from backend
  const loadChatHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/messages?limit=50');
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  // Handle window focus/blur for notifications
  useEffect(() => {
    const handleFocus = () => {
      isWindowFocused.current = true;
      setUnreadCount(0);
      document.title = originalTitle.current;
    };

    const handleBlur = () => {
      isWindowFocused.current = false;
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Update document title with unread count
  useEffect(() => {
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) New Message${unreadCount > 1 ? 's' : ''} - Chat App`;
    } else {
      document.title = originalTitle.current;
    }
  }, [unreadCount]);

  // Initialize notification sound
  useEffect(() => {
    notificationSound.current = new Audio('/notification.mp3');
    notificationSound.current.volume = 0.3;
  }, []);

  const handleNewMessageNotification = () => {
    // Increment unread count
    setUnreadCount((prev) => prev + 1);

    // Play notification sound (if available)
    if (notificationSound.current) {
      notificationSound.current.play().catch((err) => {
        console.log('Could not play notification sound:', err);
      });
    }
  };

  const handleSendMessage = (content) => {
    if (socket && isConnected) {
      socket.emit('send_message', {
        username,
        content
      });
    }
  };

  const handleTyping = (isTyping) => {
    if (socket && isConnected) {
      socket.emit('typing', {
        username,
        isTyping
      });
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <h2>💬 Chat Room</h2>
            <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? '● Connected' : '● Disconnected'}
            </span>
          </div>
          <div className="header-right">
            <span className="current-user">👤 {username}</span>
          </div>
        </div>

        {/* Main content area */}
        <div className="chat-content">
          {/* Sidebar with online users */}
          <OnlineUsers users={onlineUsers} currentUser={username} />

          {/* Messages area */}
          <div className="messages-section">
            <MessageList 
              messages={messages} 
              currentUser={username}
              typingUsers={typingUsers}
            />
            <MessageInput 
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
