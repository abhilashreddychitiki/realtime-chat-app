// Message model - Database schema for chat messages
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_username: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['user', 'system'], // 'user' for regular messages, 'system' for join/leave notifications
    default: 'user'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for faster queries - sort by timestamp
messageSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Message', messageSchema);
