const jwt = require('jsonwebtoken');

const key = require('../config/keys').secretOrKey;

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decode = jwt.verify(token, key);

    req.user = decode.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
