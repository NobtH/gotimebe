// backend/routes/userRoutes.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware kiểm tra token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header

  if (!token) {
    return res.status(401).send('Token không hợp lệ hoặc không có');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào request
    next();
  } catch (err) {
    return res.status(401).send('Token không hợp lệ');
  }
};


// Route GET để lấy thông tin người dùng
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Lấy thông tin người dùng, không lấy password
    if (!user) return res.status(404).send('Người dùng không tồn tại');
    res.json(user); // Trả về thông tin người dùng
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi server');
  }
});


// Cập nhật thông tin người dùng
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('Người dùng không tồn tại');

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Lỗi cập nhật thông tin');
  }
});

module.exports = router;
