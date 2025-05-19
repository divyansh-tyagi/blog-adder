const mongoose = require('mongoose');
require('dotenv').config();

const MAX_RETRIES = 5;
let retryCount = 0;

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    retryCount = 0;
    
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });
    
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying connection (${retryCount}/${MAX_RETRIES}) in 5 seconds...`);
      setTimeout(connectDB, 5000);
    } else {
      console.error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
