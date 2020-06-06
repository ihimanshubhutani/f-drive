const config = require('config');
const { isPasswordValid, isEmailValid, } = require('../controller/validations');
const { isUserEmailAlreadyExists, isUserUsernameAlreadyExists } = require('../controller/userDataHandler');

module.exports = (req, res, next) =>
  new Promise(resolve => {
    /**
     * Validates regex for email and password
     */
    if (!isPasswordValid(req.body.password)) throw ({ status: 422, message: config.MESSAGE.INVALID_PASSWORD, });
    if (!isEmailValid(req.body.email)) throw ({ status: 422, message: config.MESSAGE.INVALID_EMAIL });

    resolve(req.body.username);
  })
    /**
     * Checks if username already exists in database
     */
    .then(username => isUserUsernameAlreadyExists(username))
    .then((response) => {
      if (response) throw ({ status: 409, message: config.MESSAGE.USERNAME_EXISTS });
    })
    /**
     * Checks if email already exists in database
     */
    .then(() => isUserEmailAlreadyExists(req.body.email))
    .then(response => {
      if (response) throw ({ status: 409, message: config.MESSAGE.EMAIL_EXISTS })
      next()
    }).
    catch(err => res.status(err.status).send(err.message));
