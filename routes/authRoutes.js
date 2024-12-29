const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');
const { register } = require('babel');
const router = express.Router();
import { registerController } from '../controllers/authController';

// Đăng ký
// router.post('/register', async (req, res) => {
//   console.log(req.body); // Xem dữ liệu bạn nhận được từ frontend
//   const { username, email, password } = req.body;

//   // Kiểm tra nếu thiếu trường bắt buộc
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Thiếu dữ liệu đăng ký' });
//   }

//   try {
//     // Kiểm tra nếu người dùng đã tồn tại
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email đã tồn tại' });
//     }

//     // Mã hóa mật khẩu
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Tạo người dùng mới
//     const newUser = new User({ username, email, password: hashedPassword });

//     // Lưu người dùng
//     await newUser.save({ writeConcern: { w: 1 } }); 

//     res.status(201).json({ message: 'Đăng ký thành công' });
//   } catch (err) {
//     console.error('Lỗi khi đăng ký:', err);
//     res.status(500).json({ message: 'Lỗi server' });
//   }
// });

router.post('/register', registerController)

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không đúng' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtConfig.secretKey,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

module.exports = router;
