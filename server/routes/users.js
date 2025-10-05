// User routes - API endpoints for user operations
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users/online - Get list of online users
router.get('/online', async (req, res) => {
  try {
    const onlineUsers = await User.find({ isOnline: true })
      .select('username isOnline lastSeen')
      .lean();

    res.json({
      success: true,
      count: onlineUsers.length,
      users: onlineUsers
    });
  } catch (error) {
    console.error('Error fetching online users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch online users',
      message: error.message
    });
  }
});

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('username isOnline lastSeen')
      .sort({ lastSeen: -1 })
      .lean();

    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

module.exports = router;
