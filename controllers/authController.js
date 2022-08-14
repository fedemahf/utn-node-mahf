const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const errorMessage = require('../utils/errorMessage');

const SECRET_KEY_NAME = 'appSecretAuthKey';
const SECRET_KEY_VALUE = 'node2022';

module.exports = {
  getSecretKey: app => app.get(SECRET_KEY_NAME),
  setSecretKey: app => app.set(SECRET_KEY_NAME, SECRET_KEY_VALUE),
  verifyToken: (req, res, next) => {
    const bearerToken = req.headers["authorization"]?.slice(7);

    if (!bearerToken || bearerToken == '') {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: errorMessage.GENERAL.invalidToken });
    } else {
      jwt.verify(bearerToken, req.app.get(SECRET_KEY_NAME), function (err, decoded) {
        if (err) {
          res.status(HttpStatus.UNAUTHORIZED).json({ message: errorMessage.GENERAL.invalidToken });
        } else {
          next();
        }
      });
    }
  }
}
