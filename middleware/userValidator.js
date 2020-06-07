const config = require('config');
const path = require('path');
const { isPasswordValid, isEmailValid } = require('../controller/validations');
const { isUserEmailAlreadyExists, isUserUsernameAlreadyExists } = require('../controller/userDataHandler');

module.exports = (req, res, next) => new Promise((resolve) => {
  if (!isPasswordValid(req.body.password)) {
    res.status(422);
    throw new Error(config.MESSAGE.INVALID_PASSWORD);
  }

  if (!isEmailValid(req.body.email)) {
    res.status(422);
    throw new Error(config.MESSAGE.INVALID_EMAIL);
  }

  resolve(req.body.username);
})
  .then((username) => isUserUsernameAlreadyExists(username))
  .then((response) => {
    if (response) {
      res.status(409);
      throw new Error(config.MESSAGE.USERNAME_EXISTS);
    }
  })
  .then(() => isUserEmailAlreadyExists(req.body.email))
  .then((response) => {
    if (response) {
      if (response) {
        res.status(409);
        throw new Error(config.MESSAGE.EMAIL_EXISTS);
      }
    }
    next();
  })
  .catch(err => {
    console.log(err.message);
    res.render(path.join(__dirname, '../views/error'),
      { errMsg: err.message, status: res.statusCode, statusMsg: config.STATUS[res.statusCode] });
  });
