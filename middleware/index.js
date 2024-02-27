// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.user
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const tokenHeader = req.header('Authorization');
  const [_, token] = tokenHeader.split(' ');
  if (!token) return res.status(401).json({ status: false, code: 401, message: 'Access denied' });

  jwt.verify(token, process.env.JWT_PASS, async (err, user) => {
    if (err) return res.status(403).json({ status: false, code: 403, message: 'Invalid token' });

    if (user.exp && user.exp < Date.now() / 1000) {
      return res.status(403).json({ status: false, code: 403, message: 'Token has expired' });
   }

    try {
      const foundUser = await User.findById(user.id);
      if (!foundUser) return res.status(404).json({ status: false, code: 404, message: 'User not found' });

      req.user = foundUser;
      next();
    } catch (error) {
      res.status(500).json({ status: false, code: 500, message: 'Internal server error' });
    }
  });
};

module.exports = authenticateToken;
