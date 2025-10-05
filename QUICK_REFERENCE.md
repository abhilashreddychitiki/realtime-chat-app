# ⚡ Quick Reference Card

## 🚀 Startup Commands (Copy & Paste)

### Terminal 1: MongoDB
```bash
mongod
```

### Terminal 2: Backend
```bash
npm run dev
```

### Terminal 3: Frontend
```bash
cd client
npm start
```

---

## 🔗 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main chat interface |
| Backend | http://localhost:3001 | API server |
| Health Check | http://localhost:3001/health | Server status |
| MongoDB | mongodb://localhost:27017 | Database |

---

## 📡 API Endpoints

### REST API
```
GET  /health                      # Server health check
GET  /api/messages?limit=50       # Get message history
POST /api/messages                # Save new message
GET  /api/users                   # Get all users
GET  /api/users/online            # Get online users
```

### Socket.IO Events

**Client → Server:**
```javascript
socket.emit('user_join', username)
socket.emit('send_message', { username, content })
socket.emit('typing', { username, isTyping })
```

**Server → Client:**
```javascript
socket.on('join_success', (data) => {})
socket.on('receive_message', (message) => {})
socket.on('user_joined', (data) => {})
socket.on('user_left', (data) => {})
socket.on('online_users', (users) => {})
socket.on('user_typing', (data) => {})
socket.on('error', (error) => {})
```

---

## 🗂️ Project Structure

```
realtime-chat-app/
├── server/              # Backend
│   ├── index.js        # Entry point
│   ├── config/         # Database config
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── socket/         # Socket.IO handlers
├── client/             # Frontend
│   ├── public/         # Static files
│   └── src/
│       ├── components/ # React components
│       ├── App.js      # Main component
│       └── index.js    # Entry point
├── .env                # Environment variables
└── package.json        # Dependencies
```

---

## 🐛 Common Issues & Fixes

### MongoDB not starting
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
```

### Port already in use
```bash
# Kill process on port 3001
npx kill-port 3001

# Or manually
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Dependencies not installed
```bash
npm install
cd client && npm install
```

### Cannot connect to backend
1. Check backend is running on port 3001
2. Check CORS settings in `.env`
3. Check browser console for errors

---

## 💾 MongoDB Commands

```bash
# Connect to MongoDB
mongosh

# Use chat database
use chatapp

# View all messages
db.messages.find().pretty()

# Count messages
db.messages.countDocuments()

# View online users
db.users.find({ isOnline: true }).pretty()

# Clear all messages (careful!)
db.messages.deleteMany({})

# Clear all users
db.users.deleteMany({})

# Exit
exit
```

---

## 🔍 Debugging Commands

### Check what's running
```bash
# Windows
netstat -ano | findstr :3001   # Backend
netstat -ano | findstr :3000   # Frontend
netstat -ano | findstr :27017  # MongoDB

# Mac/Linux
lsof -i :3001
lsof -i :3000
lsof -i :27017
```

### View logs
```bash
# Backend logs (with auto-reload)
npm run dev

# Frontend logs
cd client && npm start

# MongoDB logs
mongod --verbose
```

---

## 📝 Environment Variables

**File:** `.env`

```env
PORT=3001                                    # Backend port
MONGODB_URI=mongodb://localhost:27017/chatapp  # Database URL
CLIENT_URL=http://localhost:3000             # Frontend URL (CORS)
```

---

## 🧪 Quick Test Script

```bash
# 1. Check prerequisites
node --version        # Should be v14+
npm --version         # Should be 6+
mongod --version      # Should be 4+

# 2. Install everything
npm install && cd client && npm install && cd ..

# 3. Start MongoDB (new terminal)
mongod

# 4. Start backend (new terminal)
npm run dev

# 5. Start frontend (new terminal)
cd client && npm start

# 6. Open browser
# Go to http://localhost:3000
# Open 2-3 tabs and test chatting
```

---

## 🎨 Key Features

| Feature | How to Test |
|---------|------------|
| Real-time messaging | Send message in one tab, see in another |
| Chat history | Refresh browser, messages still there |
| Online users | Open/close tabs, watch user list update |
| Typing indicator | Type without sending, see indicator |
| Notifications | Blur tab, send message, see title change |
| Join/Leave | Open/close tabs, see system messages |

---

## 🔄 Git Commands

```bash
# Check status
git status

# Stage all files
git add .

# Commit
git commit -m "Your message"

# View history
git log --oneline

# Create branch
git checkout -b feature-name

# Push to remote
git push origin main
```

---

## 📦 Package Scripts

**Root package.json:**
```bash
npm start              # Start backend (production)
npm run dev            # Start backend (development with nodemon)
npm run client         # Start frontend
npm run install-all    # Install all dependencies
```

**Client package.json:**
```bash
npm start              # Start frontend dev server
npm run build          # Build for production
npm test               # Run tests
```

---

## 🛑 Shutdown Commands

```bash
# Stop all servers: Press Ctrl+C in each terminal

# Or kill by port
npx kill-port 3001 3000 27017

# Or kill all node processes (careful!)
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

---

## 📊 Testing Quick Checklist

- [ ] MongoDB running
- [ ] Backend running (port 3001)
- [ ] Frontend running (port 3000)
- [ ] Open 2+ browser tabs
- [ ] Enter different usernames
- [ ] Send messages
- [ ] ✅ Messages appear in all tabs
- [ ] ✅ Online users list updates
- [ ] ✅ Typing indicators work
- [ ] ✅ Refresh loads history

---

## 💡 Pro Tips

1. **Keep 3 terminals open:** MongoDB, Backend, Frontend
2. **Use browser DevTools (F12)** to see console logs
3. **Check Network tab** to see WebSocket connection
4. **Use mongosh** to inspect database directly
5. **Test with incognito windows** for multiple users
6. **Watch terminal logs** for real-time debugging
7. **Save terminal commands** in a text file for quick access

---

## 🆘 Emergency Troubleshooting

**Nothing works?**
1. Restart computer
2. Check all services are running
3. Clear browser cache
4. Delete `node_modules` and reinstall
5. Check firewall isn't blocking ports

**Still broken?**
1. Check README.md troubleshooting section
2. Search error message online
3. Check MongoDB is accessible
4. Verify `.env` file exists

---

## 📚 File to Check When...

| Issue | Check This File |
|-------|----------------|
| Server won't start | `server/index.js`, `.env` |
| Database error | `server/config/database.js` |
| Messages not saving | `server/models/Message.js` |
| Socket not connecting | `server/socket/socketHandler.js` |
| Frontend error | `client/src/App.js` |
| Styling issues | Component `.css` files |
| Setup help | `SETUP_GUIDE.md` |
| Testing help | `TESTING_CHECKLIST.md` |

---

**Keep this file open while developing! 🚀**
