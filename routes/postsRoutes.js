const express = require('express');
const router = express.Router();
const Post = require("../models/Post")
const mongoose = require('mongoose');




// Lấy danh sách bài đăng
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Lấy tất cả bài đăng từ MongoDB
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
});

// Lấy bài đăng theo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Kiểm tra nếu ID không hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    const post = await Post.findById(id); // Tìm bài đăng theo ID
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    res.status(200).json(post); // Trả về bài đăng nếu tìm thấy
  } catch (error) {
    console.error('Lỗi khi lấy bài đăng:', error);
    res.status(500).json({ message: 'Error retrieving post', error });
  }
});




// Tạo bài đăng mới
router.post('/', async (req, res) => {
  try {
    // Kiểm tra xem tất cả các trường bắt buộc có trong yêu cầu không
    const { salary, content, title, tel } = req.body;

    if (!salary || !content || !title || !tel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPost = new Post({
      ...req.body,
      provinceName: req.body.province, // Assuming province is sent as name
      districtName: req.body.district,   // Assuming district is sent as name
    });
    await newPost.save(); // Lưu bài đăng vào MongoDB
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);  // Log lỗi để dễ dàng theo dõi
    res.status(400).json({ message: 'Error creating post', error });
  }
});


module.exports = router;
