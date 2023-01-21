const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add a valid email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    hashedPassword: {
      type: String,
      required: [true, 'Please add a password']
    },
    firstName: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;