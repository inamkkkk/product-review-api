const User = require('../models/User');
const jwtUtils = require('../utils/jwt');
const validator = require('../utils/validator');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const validationErrors = validator.validateRegistrationInput(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const user = new User({
      username,
      password // Password will be hashed in the model
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwtUtils.generateToken({ id: user.id, username: user.username });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};