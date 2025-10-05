// Message routes - API endpoints for message operations
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/messages - Retrieve chat history
// Query params: limit (default: 50)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    
    // Fetch latest messages, sorted by timestamp (newest first), then reverse for display
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean(); // Use lean() for better performance with plain JS objects

    // Reverse to show oldest first (chronological order)
    const chronologicalMessages = messages.reverse();

    res.json({
      success: true,
      count: chronologicalMessages.length,
      messages: chronologicalMessages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages',
      message: error.message
    });
  }
});

// POST /api/messages - Save a new message (used by Socket.IO handler)
router.post('/', async (req, res) => {
  try {
    const { sender_username, content, type } = req.body;

    if (!sender_username || !content) {
      return res.status(400).json({
        success: false,
        error: 'sender_username and content are required'
      });
    }

    const message = new Message({
      sender_username,
      content,
      type: type || 'user'
    });

    await message.save();

    res.status(201).json({
      success: true,
      message: message
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save message',
      message: error.message
    });
  }
});

module.exports = router;
