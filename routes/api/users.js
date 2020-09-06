const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const key = require('../../config/keys').secretOrKey;

// Load User Model
const Users = require('../../models/Users');

// @route     GET api/users/test
// @desc      Test user route
// @access    Public
router.get('/test', (req, res) => res.json({ msg: 'User Route Works' }));

// @route     POST api/users/signup
// @desc      Register Users
// @access    Public
router.post(
  '/signup',
  // Validations
  [
    body('mobileNumber', 'Mobile Number is Required').not().isEmpty(), // Mobile no. is not Empty
    body('email', 'Please enter a valid email').isEmail(), // Valid Email address
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }), // Password for more than 6 char
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { mobileNumber, email, password } = req.body;

    try {
      // check if user exists
      let user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new Users({
        mobileNumber,
        email,
        password,
      });

      // hashing password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save the user
      await user.save();

      // return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, key, { expiresIn: 2592000 }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Server Error', message: err });
        }
        return res.json({ token });
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Server Error', message: err.message });
    }
  }
);

// @route     POST api/users/login
// @desc      Authenticate user & get token
// @access    Public
router.post(
  '/login',
  // Validations
  [
    body('email', 'Please enter a valid email').isEmail(), // Valid Email address
    body('password', 'Password is required').exists(), // Password for more than 6 char
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Match the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, key, { expiresIn: 2592000 }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Server Error', message: err });
        }
        return res.json({ token });
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Server Error', message: err.message });
    }
  }
);

// @route     GET api/users/auth
// @desc      To check which user has logged In
// @access    Private
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Server Error', message: err.message });
  }
});

module.exports = router;
