const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

 const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Not an admin.' })
  }
  next()
}

 const isMaid = (req, res, next) => {
  if (req.user.role !== 'maid') {
    return res.status(403).json({ message: 'Access denied: Only maids can accept bookings.' })
  }
  next()
}

module.exports = authenticate;
