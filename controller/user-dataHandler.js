const db = require("../models");

/**
 * Insert Username and hashed password in database.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const insertUser = (username, password, verified, email) =>
  db.User.create({ username, password, verified, email });

/**
 * Authenticates username against its password.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const authenticateUser = (username, password) =>
  new Promise((resolve) =>
    db.User.findOne({
      attributes: ["id"],
      where: { username, password },
    }).then((result) => resolve(result))
  );

module.exports = { insertUser, authenticateUser };
