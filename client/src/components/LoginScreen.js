// Simple username entry screen for V1
import React, { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (trimmedUsername === '') {
      setError('Please enter a username');
      return;
    }
    
    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }
    
    // Simple validation passed
    onLogin(trimmedUsername);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <h1>💬 Chat App</h1>
          <p>Enter your username to join the conversation</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              maxLength={20}
              autoFocus
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="join-button">
            Join Chat
          </button>
        </form>
        
        <div className="login-footer">
          <p>V1.0 - Real-time messaging powered by Socket.IO</p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
