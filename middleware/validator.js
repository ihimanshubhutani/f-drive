const db = require('../models');
const config = require('config');

/**
 * Validates if password is valid
 * @param   {string}  password  
 * @returns {boolean}
 */
const isValidPassword = password => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  console.log(passwordRegex.test(password));
  return passwordRegex.test(password);
}

/**
 * Checks from database does username already exists in database
 * @param   {string} username 
 * @returns {promise}
 */
const isAlreadyExists = username => new Promise((resolve) =>
  db.User.findOne({ where: { username } })
    .then((result) => resolve(result)));

module.exports = (req, res, next) => {
  if (!isValidPassword(req.body.password)) {
    return res.status(401).send({ message: config.MESSAGE.INVALID_PASSWORD });
  }

  isAlreadyExists(req.body.username).
    then((response) => {
      if (response) {
        return res.status(401).send({ message: config.MESSAGE.USER_EXISTS });
      }

      next();
    });
}
