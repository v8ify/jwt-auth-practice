const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to db
mongoose.connect(
  "mongodb://localhost:27017/authJWTPractice",
  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
  err =>
    err ? console.log(err) : console.log(`Database connected successfully`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set port
const PORT = process.env.PORT || 8000;

// Start server on specified port
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
