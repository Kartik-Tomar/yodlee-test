const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

// Load Expenses Model
const Expenses = require('../../models/Expenses');

// @route     GET api/expenses
// @desc      Get all expense of the user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await Expenses.find({ user: req.user.id }).sort({ date: -1 });
    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Server Error', message: err.message });
  }
});

// @route     POST api/expenses
// @desc      Create new expense
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      body('description', 'Description is required').not().isEmpty(), // check description is not Empty
      body('amount', 'Amount is required').not().isEmpty(),
      body('date', 'Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description, amount, date } = req.body;

    try {
      let expense = new Expenses({
        user: req.user.id,
        description,
        amount,
        date,
      });

      let exp = await expense.save();

      return res.json(exp);
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Server Error', message: err.message });
    }
  }
);

// @route     PUT api/expenses
// @desc      Edit existing expense
// @access    Private
router.put(
  '/',
  [
    auth,
    [
      body('id', 'ID is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
      body('amount', 'Amount is required').not().isEmpty(),
      body('date', 'Date is required').not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description, amount, date, id } = req.body;

    let data = {
      user: req.user.id,
      description,
      amount,
      date,
    };

    Expenses.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then((response) => {
        res.json(response);
      })
      .catch((err) =>
        res.status(500).json({ error: 'Server Error', message: err.message })
      );
  }
);

// @route     DELETE api/expenses
// @desc      Get all expense of the user
// @access    Private
router.delete(
  '/',
  [auth, [body('id', 'ID is required').not().isEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body;
    Expenses.remove({ _id: id })
      .then((response) => {
        res.json(response);
      })
      .catch((err) =>
        res.status(500).json({ error: 'Server Error', message: err.message })
      );
  }
);

module.exports = router;
