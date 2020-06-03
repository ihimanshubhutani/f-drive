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

/**
* Fetching user info from userid.
* @param   {string} username
* @param   {string} password
* @returns {Promise}
*/
const fetchInfoFromUserId = (userId) =>
  new Promise((resolve) =>
    db.User.findOne({
      attributes: ["username", "verifiedAt"],
      where: { id: userId },
    }).then((result) => resolve(result))
  );

/**
* Update verifiedAt Column in User Table after verification complete
* @param   {string} email
* @returns {Promise}
*/
const updateVerifiedColumn = (email) =>
  db.User.update({
    verifiedAt: Date.now()
  }, {
    where: {
      email
    }
  });

module.exports = { insertUser, authenticateUser, fetchInfoFromUserId, updateVerifiedColumn };
