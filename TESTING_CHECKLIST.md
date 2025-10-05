# ✅ Testing Checklist for Chat Application

Use this checklist to verify all features are working correctly.

---

## 📋 Pre-Testing Setup

- [ ] MongoDB is running (`mongod` command)
- [ ] Backend server is running (`npm run dev`)
- [ ] Frontend is running (`cd client && npm start`)
- [ ] Browser opened to `http://localhost:3000`

---

## 🧪 Test Suite

### Phase 1: Basic Chat Core

#### Test 1.1: User Join
- [ ] Open app in browser
- [ ] Enter username (3-20 characters)
- [ ] Click "Join Chat"
- [ ] ✅ Should see chat room interface
- [ ] ✅ Should see "Connected" status in header
- [ ] ✅ Should see system message: "[username] joined the chat"

#### Test 1.2: Send Message
- [ ] Type a message in input field
- [ ] Click "Send" button (or press Enter)
- [ ] ✅ Message appears in chat
- [ ] ✅ Message shows correct username
- [ ] ✅ Message shows timestamp
- [ ] ✅ Input field clears after sending

#### Test 1.3: Multi-User Messaging
- [ ] Open second browser tab/window
- [ ] Enter different username
- [ ] Join chat
- [ ] Send message from Tab 1
- [ ] ✅ Message appears in Tab 2 instantly
- [ ] Send message from Tab 2
- [ ] ✅ Message appears in Tab 1 instantly
- [ ] ✅ Own messages appear on right side
- [ ] ✅ Other messages appear on left side

---

### Phase 2: Message Storage & Retrieval

#### Test 2.1: Save Messages
- [ ] Send 5-10 messages from different users
- [ ] Check MongoDB (optional):
  ```bash
  mongosh
  use chatapp
  db.messages.find().pretty()
  ```
- [ ] ✅ Messages should be stored in database

#### Test 2.2: Load Chat History
- [ ] Close browser tab
- [ ] Open new tab and join again
- [ ] ✅ Previous messages should load automatically
- [ ] ✅ Messages should be in chronological order
- [ ] ✅ Should load last 50 messages

#### Test 2.3: Persistent Storage
- [ ] Send messages
- [ ] Stop backend server (Ctrl+C)
- [ ] Restart backend (`npm run dev`)
- [ ] Reload frontend
- [ ] Join again
- [ ] ✅ Messages should still be there

---

### Phase 3: Notifications

#### Test 3.1: Browser Title Notifications
- [ ] Open 2 tabs with different usernames
- [ ] Switch to Tab 1 (make it active)
- [ ] Send message from Tab 2
- [ ] Switch to Tab 2 (make it active)
- [ ] ✅ Tab 1 title should show "(1) New Message - Chat App"
- [ ] Switch back to Tab 1
- [ ] ✅ Title should reset to "Chat App"
- [ ] ✅ Unread count should reset

#### Test 3.2: Sound Notifications (Optional)
- [ ] Add `notification.mp3` file to `client/public/`
- [ ] Unmute browser
- [ ] Blur/unfocus chat window
- [ ] Send message from another tab
- [ ] ✅ Should hear notification sound
- [ ] Focus chat window
- [ ] ✅ Sound should not play when focused

---

### Phase 4: Live Updates

#### Test 4.1: User Joined Notifications
- [ ] Have 1 user in chat
- [ ] Open new tab and join with new username
- [ ] ✅ System message appears: "[username] joined the chat"
- [ ] ✅ Message visible to all users

#### Test 4.2: User Left Notifications
- [ ] Have 2+ users in chat
- [ ] Close one browser tab/window
- [ ] ✅ System message appears: "[username] left the chat"
- [ ] ✅ Message visible to remaining users

#### Test 4.3: Online Users List
- [ ] Join with User 1
- [ ] ✅ See "Online Users" sidebar with count "1"
- [ ] ✅ See User 1 in the list with "Online" status
- [ ] Join with User 2 in new tab
- [ ] ✅ Count updates to "2" in both tabs
- [ ] ✅ Both users appear in both tabs
- [ ] ✅ Current user marked with "(You)"
- [ ] Close User 2 tab
- [ ] ✅ User 2 disappears from User 1's list
- [ ] ✅ Count updates to "1"

#### Test 4.4: Typing Indicators
- [ ] Open 2 tabs with different users
- [ ] Start typing in Tab 1 (don't send)
- [ ] ✅ Tab 2 should show "[username] is typing" with animated dots
- [ ] Stop typing for 1 second
- [ ] ✅ Typing indicator disappears
- [ ] Type and immediately send message
- [ ] ✅ Typing indicator should disappear when message sent

---

## 🔍 Error Handling Tests

#### Test 5.1: Empty Message
- [ ] Try to send empty message
- [ ] ✅ Send button should be disabled
- [ ] Type spaces only and try to send
- [ ] ✅ Should not send (trimmed to empty)

#### Test 5.2: Invalid Username
- [ ] Try username with less than 3 characters
- [ ] ✅ Should show error message
- [ ] Try username with more than 20 characters
- [ ] ✅ Should be truncated or show error
- [ ] Try empty username
- [ ] ✅ Should show error message

#### Test 5.3: Connection Loss
- [ ] Join chat with user
- [ ] Stop backend server
- [ ] ✅ Connection status should show "Disconnected"
- [ ] Try to send message
- [ ] ✅ Message should not send
- [ ] Restart backend
- [ ] ✅ Should reconnect automatically (may need page refresh)

#### Test 5.4: MongoDB Down
- [ ] Stop MongoDB (`Ctrl+C` in mongod terminal)
- [ ] Try to start backend
- [ ] ✅ Should show warning but not crash
- [ ] ✅ Should display helpful message
- [ ] Start MongoDB
- [ ] ✅ Should connect automatically

---

## 🎨 UI/UX Tests

#### Test 6.1: Responsive Design
- [ ] Resize browser window to mobile size (< 768px)
- [ ] ✅ Online users sidebar should hide
- [ ] ✅ "Send" button text should hide (icon only)
- [ ] ✅ Layout should remain usable
- [ ] Resize back to desktop
- [ ] ✅ Sidebar should reappear

#### Test 6.2: Long Messages
- [ ] Send message with 500+ characters
- [ ] ✅ Message should wrap properly
- [ ] ✅ Message bubble should not break layout

#### Test 6.3: Special Characters
- [ ] Send message with emojis: 😀 🎉 ❤️
- [ ] ✅ Should display correctly
- [ ] Send message with HTML: `<script>alert('test')</script>`
- [ ] ✅ Should display as text, not execute
- [ ] Send message with newlines (Shift+Enter)
- [ ] ✅ Should display with line breaks

#### Test 6.4: Auto-Scroll
- [ ] Send 30+ messages to fill chat
- [ ] Scroll up to view old messages
- [ ] Send new message
- [ ] ✅ Should NOT auto-scroll if viewing history
- [ ] Scroll to bottom
- [ ] Send new message
- [ ] ✅ Should auto-scroll smoothly

---

## 🚀 Performance Tests

#### Test 7.1: Multiple Users
- [ ] Open 5+ browser tabs with different usernames
- [ ] Send messages from all tabs rapidly
- [ ] ✅ All messages should appear in all tabs
- [ ] ✅ No lag or freezing
- [ ] ✅ Online users list updates correctly

#### Test 7.2: Message History
- [ ] Send 100+ messages
- [ ] Refresh and rejoin
- [ ] ✅ Should load last 50 messages only
- [ ] ✅ Should load quickly (< 2 seconds)

#### Test 7.3: Rapid Typing
- [ ] Type very quickly without stopping
- [ ] ✅ Typing indicator should not spam
- [ ] ✅ Should throttle to 1-second intervals

---

## 📊 Results Summary

Total Tests: **35+**

| Category | Passed | Failed | Notes |
|----------|--------|--------|-------|
| Basic Chat Core | __ / 3 | __ | |
| Storage & Retrieval | __ / 3 | __ | |
| Notifications | __ / 2 | __ | |
| Live Updates | __ / 4 | __ | |
| Error Handling | __ / 4 | __ | |
| UI/UX | __ / 4 | __ | |
| Performance | __ / 3 | __ | |
| **TOTAL** | **__ / 23** | **__** | |

---

## 🐛 Bug Report Template

If you find bugs, document them like this:

**Bug #1:**
- **Test:** [Test name]
- **Expected:** [What should happen]
- **Actual:** [What actually happened]
- **Steps to Reproduce:**
  1. Step 1
  2. Step 2
  3. Step 3
- **Console Errors:** [Any errors in browser console]
- **Server Logs:** [Any errors in terminal]

---

## ✅ Sign-Off

- [ ] All critical tests passed
- [ ] No console errors in browser
- [ ] No errors in server logs
- [ ] MongoDB data verified
- [ ] Ready for demo/presentation
- [ ] Ready to commit to git

**Tested by:** _________________  
**Date:** _________________  
**Version:** 1.0.0

---

## 🎯 Next: Advanced Testing (V2)

For future versions, add tests for:
- [ ] Security (XSS, injection attacks)
- [ ] Load testing (100+ concurrent users)
- [ ] Browser compatibility (Chrome, Firefox, Safari)
- [ ] Mobile device testing
- [ ] Automated testing (Jest, Cypress)
