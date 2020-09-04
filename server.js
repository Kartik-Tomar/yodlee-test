const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Route
const users = require("./routes/api/users");

const app = express();

// body-parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
// require("./config/passport")(passport);

// Use Route
app.use("/api/users", users);

// Server Static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
