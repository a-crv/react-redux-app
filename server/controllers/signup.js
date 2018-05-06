const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { login, password } = req.body;
  const user = new User({
    login,
    password
  });

  try {
    await user.save();
    return res.json(user);
  } catch (error) {
    return next({
      status: 400,
      message: error.message
    });
  }
};
