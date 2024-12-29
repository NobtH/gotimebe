const mongoose = require('mongoose');
require('dotenv').config();  // Đảm bảo bạn đã load biến môi trường từ tệp .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      writeConcern: { w: "majority" } // Đảm bảo cấu hình đúng
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
