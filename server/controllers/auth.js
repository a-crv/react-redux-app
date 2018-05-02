const User = require('../models/user');

const signup = async (req, res, next) => {
  const credentials = req.body;
  let user;

  try {
    user = await User.create(credentials);
  } catch (error) {
    return next({
      status: 400,
      message: error.message
    });
  }

  return res.json(user);
};

const signin = async (req, res, next) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user) {
      const warning = {
        status: 400,
        message: 'User not found'
      };

      throw warning;
    }

    const result = await user.comparePassword(password);
    if (!result) {
      const warning = {
        status: 400,
        message: 'Bad credentials'
      };

      throw warning;
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signup,
  signin
};
