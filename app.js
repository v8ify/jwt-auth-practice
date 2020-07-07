const express = require("express");
const mongoose = require("mongoose");

// Router imports
const authRouter = require("./routes/auth");

const app = express();

// Connect to db
mongoose.connect(
  "mongodb://localhost:27017/authJWTPractice",
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  err =>
    err ? console.log(err) : console.log(`Database connected successfully`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// auth handler route
app.use("/", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).json({ success: false, error: err.message });
});

// Set port
const PORT = process.env.PORT || 8000;

// Start server on specified port
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
