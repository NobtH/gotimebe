// src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'pending' }, // Ví dụ về trạng thái đặt lịch
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
