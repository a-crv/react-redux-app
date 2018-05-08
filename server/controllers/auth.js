const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    const { _id: id } = user;

    if (!user) {
      const error = {
        status: 401,
        message: 'Authentication failed. User not found.'
      };

      throw error;
    }

    const result = await user.comparePassword(password);
    if (!result) {
      const error = {
        status: 401,
        message: 'Authentication failed. Wrong password.'
      };

      throw error;
    }

    const token = await jwt.sign({ _id: id }, 'secret', {
      expiresIn: 604800 // 1 week
    });

    return res.json(token);
  } catch (error) {
    return next(error);
  }
};
