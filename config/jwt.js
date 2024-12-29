module.exports = {
  secretKey: process.env.JWT_SECRET || 'cout',  // Sử dụng JWT_SECRET từ biến môi trường nếu có
  expiresIn: '1h',  // Thời gian hết hạn của token
};
