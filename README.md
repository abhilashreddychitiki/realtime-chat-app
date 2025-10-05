# 💬 Real-Time Chat Application

A full-stack real-time chat application built with **Node.js**, **Socket.IO**, **MongoDB**, and **React**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## 🚀 Features

### ✅ Phase 1: Core Chat Functionality
- ✨ Real-time messaging with Socket.IO
- 👤 Simple username-based authentication (no complex login for V1)
- 💾 Message persistence in MongoDB
- 📜 Chat history loading on join

### ✅ Phase 2: Message Storage
- 🗄️ All messages saved to database
- 📚 Load last 50 messages on connection
- ⏰ Timestamp for each message

### ✅ Phase 3: Notifications
- 🔔 Browser tab title notifications for new messages
- 🔊 Sound notifications (when notification.mp3 is added)
- 📊 Unread message counter

### ✅ Phase 4: Live Updates
- 🟢 User online/offline status
- 👥 Live online users list
- ✍️ Typing indicators
- 📣 Join/leave notifications

## 🏗️ Architecture

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────┐
│   Client 1      │◄─────►│  Backend Server  │◄─────►│  MongoDB    │
│ (React/Browser) │       │ (Node.js/Socket) │       │  Database   │
└─────────────────┘       └──────────────────┘       └─────────────┘
        ▲                          ▲
        │    WebSocket (Real-time) │
        │                          │
        ▼                          ▼
┌─────────────────┐
│   Client 2      │
│ (React/Browser) │
└─────────────────┘
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** (comes with Node.js)

## 🛠️ Installation & Setup

### 1️⃣ Clone or Navigate to the Project

```bash
cd realtime-chat-app
```

### 2️⃣ Install Dependencies

Install both backend and frontend dependencies:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

Or use the convenient script:

```bash
npm run install-all
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

Verify MongoDB is running by connecting to it:
```bash
mongosh
# or
mongo
```

### 4️⃣ Configure Environment Variables

The `.env` file should already exist with default values:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/chatapp
CLIENT_URL=http://localhost:3000
```

**Note:** If using MongoDB Atlas (cloud), update `MONGODB_URI` with your connection string.

### 5️⃣ Start the Application

You have two options:

**Option A: Run both backend and frontend separately (Recommended for Development)**

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run client
```

**Option B: Run backend only (Frontend needs separate terminal)**

```bash
npm start
```

Then in another terminal:
```bash
cd client
npm start
```

### 6️⃣ Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

### 7️⃣ Test Real-Time Chat

1. Open **multiple browser windows** or tabs
2. Enter different usernames in each
3. Start chatting!
4. Watch messages appear instantly across all windows
5. See typing indicators and online users

## 📁 Project Structure

```
realtime-chat-app/
├── server/                      # Backend (Node.js + Express + Socket.IO)
│   ├── index.js                # Main server entry point
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/
│   │   ├── Message.js          # Message schema
│   │   └── User.js             # User schema
│   ├── routes/
│   │   ├── messages.js         # Message API routes
│   │   └── users.js            # User API routes
│   └── socket/
│       └── socketHandler.js    # Socket.IO event handlers
├── client/                      # Frontend (React)
│   ├── public/
│   │   ├── index.html
│   │   └── notification.mp3    # (Optional) Add notification sound
│   └── src/
│       ├── components/
│       │   ├── LoginScreen.js  # Username entry screen
│       │   ├── ChatRoom.js     # Main chat interface
│       │   ├── MessageList.js  # Message display
│       │   ├── MessageInput.js # Message input field
│       │   └── OnlineUsers.js  # Online users sidebar
│       ├── App.js              # Main React component
│       └── index.js            # React entry point
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Backend dependencies
└── README.md                    # This file
```

## 🔌 API Endpoints

### REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/messages?limit=50` | Retrieve chat history |
| POST | `/api/messages` | Save a new message |
| GET | `/api/users` | Get all users |
| GET | `/api/users/online` | Get online users |

### Socket.IO Events

**Client → Server:**
- `user_join` - User joins the chat with username
- `send_message` - Send a new message
- `typing` - User typing status
- `disconnect` - User disconnects

**Server → Client:**
- `join_success` - Confirmation of successful join
- `receive_message` - New message received
- `user_joined` - Someone joined the chat
- `user_left` - Someone left the chat
- `online_users` - Updated list of online users
- `user_typing` - Someone is typing
- `error` - Error message

## 🎨 Features in Detail

### Real-Time Messaging
- Messages are sent instantly via WebSocket
- No page refresh needed
- Messages persist in MongoDB

### User Presence
- See who's online in real-time
- Join/leave notifications
- Last seen timestamp

### Typing Indicators
- See when someone is typing
- Automatically clears after 1 second of inactivity

### Notifications
- Browser tab updates with unread count
- Example: "(3) New Messages - Chat App"
- Optional sound notification support

### Chat History
- Loads last 50 messages on join
- Messages are stored with timestamps
- Chronological order maintained

## 🧪 Testing

### Manual Testing (V1)

1. **Single User Test:**
   - Open the app
   - Enter username
   - Send messages
   - Verify messages appear

2. **Multi-User Test:**
   - Open in 2-3 browser windows/tabs
   - Use different usernames
   - Send messages from different windows
   - Verify real-time updates

3. **Connection Test:**
   - Stop the server
   - Check "Disconnected" status
   - Restart server
   - Verify reconnection

4. **Persistence Test:**
   - Send messages
   - Close browser
   - Reopen and join again
   - Verify chat history loads

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoDB Connection Error`

**Solutions:**
- Ensure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify MONGODB_URI in `.env` file
- Try using MongoDB Atlas (cloud) instead

### Port Already in Use

**Error:** `Port 3001 is already in use`

**Solutions:**
- Kill the process using the port (Windows: `netstat -ano | findstr :3001`)
- Change PORT in `.env` file
- Restart your computer

### Socket Connection Failed

**Error:** `WebSocket connection failed`

**Solutions:**
- Ensure backend is running on port 3001
- Check firewall settings
- Verify CLIENT_URL in `.env` matches frontend URL

### Messages Not Appearing

**Solutions:**
- Check browser console for errors
- Verify socket connection status (should show "Connected")
- Ensure MongoDB is running and accessible
- Check server logs for errors

## 🚀 Future Enhancements (V2+)

- [ ] User authentication (login/register)
- [ ] Private messaging (DMs)
- [ ] Message editing and deletion
- [ ] File/image sharing
- [ ] Emoji picker
- [ ] Message reactions
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Message search
- [ ] User profiles with avatars
- [ ] Chat rooms/channels
- [ ] End-to-end encryption
- [ ] Video/voice calling

## 📝 Development Notes

### Code Structure Philosophy
- **Keep it simple:** V1 focuses on working functionality
- **Separation of concerns:** Backend, database, and frontend are clearly separated
- **Clear naming:** Variables and functions use descriptive names
- **Error handling:** Basic try-catch blocks prevent crashes

### Key Technologies
- **Socket.IO:** Real-time bidirectional communication
- **Mongoose:** MongoDB object modeling
- **React Hooks:** Modern React with useState, useEffect, useRef
- **Express:** RESTful API endpoints

## 📄 License

ISC License - Feel free to use this project for learning and development!

## 👨‍💻 Contributing

This is a V1 project focused on getting things working. Contributions are welcome for:
- Bug fixes
- Performance improvements
- Documentation updates
- Feature enhancements

## 🙏 Acknowledgments

Built following best practices for real-time applications with a focus on simplicity and functionality.

---

**Made with ❤️ using Node.js, Socket.IO, MongoDB, and React**
