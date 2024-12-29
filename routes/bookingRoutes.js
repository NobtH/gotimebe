// routes/bookingRoutes.js
const express = require('express');
const Booking = require("../models/Booking");
const authenticate = require('../middleware/auth');

const router = express.Router();

// Đặt lịch
router.post('/bookings', authenticate, async (req, res) => {
  const { workerId, date, timeSlot } = req.body;

  try {
    const newBooking = new Booking({
      userId: req.user.userId,
      workerId,
      date,
      timeSlot,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

// Lấy lịch đặt
router.get('/bookings', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

module.exports = router;
