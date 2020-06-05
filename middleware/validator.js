const db = require('../models');
const config = require('config');
const { isPasswordValid, isEmailValid, isEmailAlreadyExists, isUsernameAlreadyExists } = require('../controller/validations');

module.exports = (req, res, next) =>

  new Promise((resolve) => {
    /**
     * Validates regex for email and password
     */
    if (!isPasswordValid(req.body.password)) return res.status(401).send({ message: config.MESSAGE.INVALID_PASSWORD });
    if (!isEmailValid(req.body.email)) return res.status(401).send({ message: config.MESSAGE.INVALID_EMAIL });

    resolve(req.body.username);
  })
    /**
     * Checks if username already exists in database
     */
    .then(username => isUsernameAlreadyExists(username))
    .then((response) => {
      if (response) return res.status(401).send({ message: config.MESSAGE.USERNAME_EXISTS });
    })
    /**
     * Checks if email already exists in database
     */
    .then(() => isEmailAlreadyExists(req.body.email))
    .then(response => {
      if (response) return res.status(401).send({ message: config.MESSAGE.EMAIL_EXISTS });
      next()
    }).
    catch(err => res.send(err));



