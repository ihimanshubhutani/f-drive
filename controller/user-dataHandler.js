const db = require('../models');

/**
 * Insert Username and hashed password in database.
 * @param   {string} username 
 * @param   {string} password 
 * @returns {void}
 */
const insertUser = (username, password) => db.User.create(
  { username, password }
);

/**
 * Authenticates username against its password.
 * @param   {string} username 
 * @param   {string} password 
 * @returns {void}
 */
const authenticateUser = (username, password) => new Promise((resolve) =>
  db.User.findOne(

    {
      attributes: ['username'],
      where: { username, password }
    })
    .then((result) => resolve(result)));

module.exports = { insertUser, authenticateUser };
