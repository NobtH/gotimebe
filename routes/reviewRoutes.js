// routes/reviewRoutes.js
const express = require('express');
const Review = require("../models/Review");
const authenticate = require('../middleware/auth');

const router = express.Router();

// Đánh giá giúp việc
router.post('/reviews', authenticate, async (req, res) => {
  const { workerId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      userId: req.user.userId,
      workerId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

// Lấy tất cả đánh giá cho giúp việc
router.get('/reviews/:workerId', async (req, res) => {
  const { workerId } = req.params;

  try {
    const reviews = await Review.find({ workerId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

module.exports = router;
