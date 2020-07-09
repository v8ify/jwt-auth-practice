const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define userSchema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
  },
  password: { type: String, required: [true, "Password is required"] },
});

// Hashing and salting password before saving to db
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePasswords = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

// Create model class from schema
const User = mongoose.model("User", userSchema);

module.exports = User;
