const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = Expenses = mongoose.model('Expenses', ExpenseSchema);
