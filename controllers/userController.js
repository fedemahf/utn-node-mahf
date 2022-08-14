const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const User = require('../models/user');
const errorMessage = require('../utils/errorMessage');
const authController = require('../controllers/authController');

module.exports = {
  create: async function (req, res, next) {
    try {
      const userExists = await User.findOne({ email: req.body.email });

      if (!userExists) {
        const user = new User(req.body);
        await user.save();
      }

      // show as created even if the user already exists
      res.status(HttpStatus.CREATED).json({ message: errorMessage.USERS.userCreated });
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  login: async function (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, authController.getSecretKey(req.app), { expiresIn: "1h" })
        res.status(HttpStatus.CREATED).json({ token });
      } else {
        res.status(HttpStatus.OK).json({ message: errorMessage.USERS.loginFailed });
      }
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
