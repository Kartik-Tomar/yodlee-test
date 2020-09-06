const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('./config/mongo-database');

// Route
const users = require('./routes/api/users');
const expenses = require('./routes/api/expenses');

const app = express();

// body-parser middleware
app.use(bodyParser.json());

// Use Route
app.use('/api/users', users);
app.use('/api/expenses', expenses);

// Server Static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set a static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
