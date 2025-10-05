// Socket.IO event handlers - Core real-time logic
const Message = require('../models/Message');
const User = require('../models/User');

// Track connected users in memory (for quick access)
const connectedUsers = new Map(); // socketId -> { username, socketId }

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 New socket connection: ${socket.id}`);

    // Handle user joining the chat
    socket.on('user_join', async (username) => {
      try {
        if (!username || username.trim() === '') {
          socket.emit('error', { message: 'Username is required' });
          return;
        }

        const trimmedUsername = username.trim();

        // Store user info in memory
        connectedUsers.set(socket.id, {
          username: trimmedUsername,
          socketId: socket.id
        });

        // Update or create user in database
        await User.findOneAndUpdate(
          { username: trimmedUsername },
          {
            socketId: socket.id,
            isOnline: true,
            lastSeen: new Date()
          },
          { upsert: true, new: true }
        );

        console.log(`👤 User joined: ${trimmedUsername} (${socket.id})`);

        // Notify user they've successfully joined
        socket.emit('join_success', { username: trimmedUsername });

        // Create and save system message
        const systemMessage = new Message({
          sender_username: 'System',
          content: `${trimmedUsername} joined the chat`,
          type: 'system'
        });
        await systemMessage.save();

        // Broadcast to all clients (including sender)
        io.emit('user_joined', {
          username: trimmedUsername,
          message: systemMessage
        });

        // Send updated online users list
        const onlineUsersList = Array.from(connectedUsers.values()).map(u => u.username);
        io.emit('online_users', onlineUsersList);

      } catch (error) {
        console.error('Error in user_join:', error);
        socket.emit('error', { message: 'Failed to join chat' });
      }
    });

    // Handle incoming messages
    socket.on('send_message', async (data) => {
      try {
        const { username, content } = data;

        if (!content || content.trim() === '') {
          socket.emit('error', { message: 'Message content cannot be empty' });
          return;
        }

        // Create and save message to database
        const message = new Message({
          sender_username: username,
          content: content.trim(),
          type: 'user'
        });
        await message.save();

        console.log(`💬 Message from ${username}: ${content.substring(0, 50)}...`);

        // Broadcast message to all connected clients
        io.emit('receive_message', {
          _id: message._id,
          sender_username: message.sender_username,
          content: message.content,
          timestamp: message.timestamp,
          type: message.type
        });

      } catch (error) {
        console.error('Error in send_message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle user typing indicator
    socket.on('typing', (data) => {
      const { username, isTyping } = data;
      // Broadcast typing status to all other users (not sender)
      socket.broadcast.emit('user_typing', {
        username,
        isTyping
      });
    });

    // Handle user disconnect
    socket.on('disconnect', async () => {
      try {
        const userInfo = connectedUsers.get(socket.id);

        if (userInfo) {
          const { username } = userInfo;

          // Remove from connected users map
          connectedUsers.delete(socket.id);

          // Update user in database
          await User.findOneAndUpdate(
            { username },
            {
              isOnline: false,
              lastSeen: new Date()
            }
          );

          console.log(`👋 User left: ${username} (${socket.id})`);

          // Create and save system message
          const systemMessage = new Message({
            sender_username: 'System',
            content: `${username} left the chat`,
            type: 'system'
          });
          await systemMessage.save();

          // Broadcast to remaining clients
          io.emit('user_left', {
            username,
            message: systemMessage
          });

          // Send updated online users list
          const onlineUsersList = Array.from(connectedUsers.values()).map(u => u.username);
          io.emit('online_users', onlineUsersList);
        }
      } catch (error) {
        console.error('Error in disconnect:', error);
      }
    });
  });

  console.log('✅ Socket.IO handlers initialized');
};
