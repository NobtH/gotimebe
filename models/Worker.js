const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  skills: [String],
  experience: { type: String },
  availability: { type: String },
  hourlyRate: { type: Number },
  description: { type: String },
  languages: [String],
  certifications: [String],
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  reviews: [{ reviewer: String, comment: String, rating: Number }]
});

module.exports = mongoose.model('Worker', workerSchema);
