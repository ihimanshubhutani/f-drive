import { Client } from '../../models';

/**
 * Insert Username and hashed password in database.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const insertClient = (username, email, password) => Client.create({ username, email, password });

/**
 * Authenticates username against its password.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const authenticateClient = (username, password) => Client.findOne({
  attributes: ['id'],
  where: { username, password },
});

/**
* Fetching client info from userid.
* @param   {string} username
* @param   {string} password
* @returns {Promise}
*/
const fetchInfoFromClientId = (clientId) => new Promise((resolve) => Client.findOne({
  attributes: ['username', 'redirectUri', 'clientSecret'],
  where: { id: clientId },
}).then((result) => resolve(result)));

/**
* Update redirectUri Column and Secret column
* @param   {string} email
* @returns {Promise}
*/
const updateRedirectUriAndSecret = (clientId, redirectUri, clientSecret) => Client.update({
  redirectUri,
  clientSecret,
}, {
  where: {
    id: clientId,
  },
});

/**
* Checks from database does username already exists in database
* @param   {string} username
* @returns {promise}
*/
const isClientUsernameAlreadyExists = username => Client.findOne({ where: { username } });

/**
* Checks from database does email already exists in database
* @param   {string} username
* @returns {promise}
*/
const isClientEmailAlreadyExists = email => Client.findOne({ where: { email } });

export {
  insertClient,
  authenticateClient,
  isClientEmailAlreadyExists,
  fetchInfoFromClientId,
  isClientUsernameAlreadyExists,
  updateRedirectUriAndSecret,
};
