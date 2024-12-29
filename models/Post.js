const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  tel: { type: String, required: true },
  province: { type: String },
  district: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  job: { type: String },
  typeWork: { type: String },
  pay: { type: String },
  salary: { type: Number, required: true },
  sex: { type: String },
  year: { type: String },
  requirements: { type: String },
  benefits: { type: String },
  images: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
