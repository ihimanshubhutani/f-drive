const config = require('config');
const { isPasswordValid, isEmailValid } = require('../controller/validations');
const { isUserEmailAlreadyExists, isUserUsernameAlreadyExists } = require('../controller/userDataHandler');

module.exports = (req, res, next) => new Promise((resolve) => {
  /**
     * Validates regex for email and password
     */
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
  /**
       * Checks if username already exists in database
       */
  .then((username) => isUserUsernameAlreadyExists(username))
  .then((response) => {
    if (response) {
      res.status(409);
      throw new Error(config.MESSAGE.USERNAME_EXISTS);
    }
  })
  /**
       * Checks if email already exists in database
       */
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
  .catch((err) => res.send(err));
