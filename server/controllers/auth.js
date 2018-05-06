const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user) {
      const error = {
        status: 401,
        message: 'Authentication failed. User not found.'
      };

      throw error;
    }

    const result = await user.comparePassword(password);
    if (!result) {
      const warning = {
        status: 401,
        message: 'Authentication failed. Wrong password.'
      };

      throw warning;
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};
