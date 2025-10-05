# 🚀 Quick Setup Guide

## Step-by-Step Setup (5 Minutes)

### ✅ Step 1: Check Prerequisites

Open your terminal and verify installations:

```bash
# Check Node.js (should be v14+)
node --version

# Check npm
npm --version

# Check MongoDB
mongod --version
```

If any are missing, install them first!

---

### ✅ Step 2: Start MongoDB

**Open a NEW terminal** and run:

```bash
mongod
```

**Important:** Keep this terminal open! MongoDB needs to stay running.

You should see output ending with:
```
"msg":"Waiting for connections","attr":{"port":27017}}
```

---

### ✅ Step 3: Install Dependencies

In your **project terminal**, run:

```bash
npm install
cd client
npm install
cd ..
```

This installs all necessary packages for both backend and frontend.

---

### ✅ Step 4: Start the Backend Server

In your **project terminal**, run:

```bash
npm run dev
```

You should see:
```
✅ Server running on port 3001
✅ MongoDB Connected: localhost
✅ Socket.IO handlers initialized
```

---

### ✅ Step 5: Start the Frontend

**Open ANOTHER new terminal** in the same project directory, then:

```bash
cd client
npm start
```

Your browser should automatically open to `http://localhost:3000`

---

### ✅ Step 6: Test the Chat!

1. **Enter a username** (e.g., "Alice")
2. **Click "Join Chat"**
3. **Open another browser tab** → `http://localhost:3000`
4. **Enter different username** (e.g., "Bob")
5. **Start chatting!** 🎉

Messages should appear instantly in both windows!

---

## 🎯 Summary: What Should Be Running

You should have **3 terminals open:**

| Terminal | Command | Purpose |
|----------|---------|---------|
| Terminal 1 | `mongod` | MongoDB Database |
| Terminal 2 | `npm run dev` | Backend Server (Port 3001) |
| Terminal 3 | `cd client && npm start` | React Frontend (Port 3000) |

Plus: **Multiple browser tabs** on `http://localhost:3000` for testing.

---

## ❌ Common Issues

### Issue: "MongoDB connection error"
**Fix:** Make sure Terminal 1 with `mongod` is running

### Issue: "Port 3001 already in use"
**Fix:** 
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Issue: Frontend won't start
**Fix:** Make sure you're in the `client` folder:
```bash
cd client
npm start
```

### Issue: Messages not appearing
**Fix:** Check all 3 terminals are running without errors

---

## 🎨 Next Steps

Once everything works:

1. ✅ Test with 3-4 browser tabs
2. ✅ Try the typing indicator
3. ✅ Check the online users list
4. ✅ Close a tab and watch the "left chat" message
5. ✅ Refresh and see chat history load

---

## 🛑 To Stop Everything

1. Go to each terminal
2. Press `Ctrl + C`
3. Type `Y` if prompted

---

## 💡 Development Tips

**During development:**
- Backend auto-restarts with `nodemon` (when using `npm run dev`)
- Frontend auto-reloads on file changes
- Check browser console (F12) for errors
- Check terminal for server logs

**Before committing to git:**
```bash
git status
git add .
git commit -m "Your message"
git push
```

---

Need help? Check the main README.md for detailed documentation!
