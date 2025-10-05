// Database configuration and connection
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('⚠️  Make sure MongoDB is running locally or update MONGODB_URI in .env');
    // Don't exit process in development - let developers know to start MongoDB
    console.log('💡 Tip: Start MongoDB with "mongod" command or use MongoDB Atlas');
  }
};

module.exports = connectDB;
