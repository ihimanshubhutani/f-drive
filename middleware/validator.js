const db = require('../models');
const config = require('config');

/**
* Checks for validity for Password 
* @param  {string}   password 
* @return {boolean} 
*/
let isPasswordValid = password => {
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  /**
  * passwordRegex() returns boolean value
  * based on the passed-in password
  * format is correct or not.
  */
  console.log('checking password');
  return passwordRegex.test(password);
}

/**
* Checks for validity for Email. 
* @param {string} email
* @return {boolean} 
*/
let isEmailValid = email => {
  let emailRegex = /^([a-z\d\.-]+)@([a-z]{2,10})(\.[a-z]+)?(\.[a-z]{2,3})?$/;

  /** 
   * emailRegex() returns boolean value
   *  based on checking email format.
   **/
  console.log('checking email');
  return emailRegex.test(email);
}

/**
 * Checks from database does username already exists in database
 * @param   {string} username 
 * @returns {promise}
 */
const isUsernameAlreadyExists = username =>
  db.User.findOne({ where: { username } })


/**
 * Checks from database does email already exists in database
 * @param   {string} username 
 * @returns {promise}
 */
const isEmailAlreadyExists = email => new Promise((resolve) =>
  db.User.findOne({ where: { email } })
    .then((result) => resolve(result)));

module.exports = (req, res, next) => {

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

};

