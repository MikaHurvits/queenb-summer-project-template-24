const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(password) {
        const passwordRegex = /^(?=.*[a-z])[^\s]{6,}$/;
        return passwordRegex.test(password);
      },
      message: 'Password must be at least 6 characters long, contain at least one lowercase letter, and cannot contain spaces'
    }
  },
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
