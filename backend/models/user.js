const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userScemah = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address'
    }
  },

  password: {
    type: String,
    required: [true, 'Please provide a Password']
  },

  role: {
    type: String,
    enum: ['admin', 'user']
  },

  refreshToken: {
    type: String,
    default: null
  },

  refreshTokenExpire: {
    type: Date,
    default: null
  }
});
userScemah.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userScemah);
