import { User } from '../../models';

/**
 * Insert Username and hashed password in database.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const insertUser = (username, password, verified, email) => User.create({
  username, password, verified, email,
});

/**
 * Authenticates username against its password.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const authenticateUser = (username, password) => User.findOne({
  attributes: ['id', 'verifiedAt'],
  where: { username, password },
});

/**
* Fetching user info from userid.
* @param   {string} username
* @param   {string} password
* @returns {Promise}
*/
const fetchInfoFromUserId = (userId) => User.findOne({
  attributes: ['username', 'verifiedAt', 'email'],
  where: { id: userId },
});

/**
* Update verifiedAt Column in User Table after verification complete
* @param   {string} email
* @returns {Promise}
*/
const updateVerifiedColumn = (email) => User.update({
  verifiedAt: Date.now(),
}, {
  where: {
    email,
  },
});

/**
* Checks from database does username already exists in database
* @param   {string} username
* @returns {promise}
*/
const isUserUsernameAlreadyExists = username => User.findOne({ where: { username } });

/**
* Checks from database does email already exists in database
* @param   {string} username
* @returns {promise}
*/
const isUserEmailAlreadyExists = email => User.findOne({ where: { email } });

export {
  insertUser,
  authenticateUser,
  fetchInfoFromUserId,
  updateVerifiedColumn,
  isUserEmailAlreadyExists,
  isUserUsernameAlreadyExists,
};
