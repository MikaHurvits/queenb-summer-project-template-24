const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Function to create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// ** Signup User Controller **
const signupUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Validation
  if (!email || !password || !firstName || !lastName || !username) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email not valid' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password not strong enough' });
  }

  // Check if user already exists
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  if (usernameExists) {
    return res.status(400).json({ error: 'Username already in use' });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // Create token
    const token = createToken(user._id);

    // Send response with token
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ** Login User Controller **
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect email' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Create token
    const token = createToken(user._id);

    // Send response with token
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
