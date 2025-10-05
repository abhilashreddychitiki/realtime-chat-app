// Online users sidebar component
import React from 'react';
import './OnlineUsers.css';

function OnlineUsers({ users, currentUser }) {
  return (
    <div className="online-users">
      <div className="users-header">
        <h3>Online Users</h3>
        <span className="user-count">{users.length}</span>
      </div>
      
      <div className="users-list">
        {users.length === 0 ? (
          <div className="no-users">
            <p>No users online</p>
          </div>
        ) : (
          users.map((username, index) => (
            <div
              key={index}
              className={`user-item ${username === currentUser ? 'current-user' : ''}`}
            >
              <div className="user-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">
                  {username}
                  {username === currentUser && ' (You)'}
                </span>
                <span className="user-status">● Online</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OnlineUsers;
