const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import Maid from '../models/Maid';
import User from '../models/User';

// Xử lý đăng ký
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Thiếu dữ liệu đăng ký' });
  }

  try {
    // Kiểm tra người dùng đã tồn tại hay chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      role
    });

    // Lưu người dùng vào cơ sở dữ liệu
    let maid = null
    if (role === 'maid') {
      if (!age || !experience || !hourlyRate || !location) {
        return res.status(400).json({ message: 'Missing maid-specific fields.' })
      }

      maid = await Maid.create({
        userId: user._id,
        age,
        experience,
        hourlyRate,
        location
      })
    }

    res.status(201).json({
      message: 'Registration successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      ...(maid && { maid })
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Xử lý đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Trả về token cho người dùng
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = { register, login };
