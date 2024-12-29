// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Import hàm kết nối MongoDB
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const postsRoute = require('./routes/postsRoutes');

// Sử dụng route

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Đảm bảo rằng header Authorization được phép
}));
app.use(express.json()); // Express đã tích hợp body-parser (json)

// Kết nối MongoDB
connectDB(); // Gọi hàm kết nối MongoDB

// Sử dụng các routes với các prefix khác nhau để tránh trùng lặp
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/post', postsRoute);
// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
