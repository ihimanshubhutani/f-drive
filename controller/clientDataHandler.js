const db = require("../models");

/**
 * Insert Username and hashed password in database.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const insertClient = (username, email, password) =>
    db.Client.create({ username, email, password });

/**
 * Authenticates username against its password.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const authenticateClient = (username, password) => new Promise((resolve) =>
    db.Client.findOne({
        attributes: ["id"],
        where: { username, password },
    }).then((result) => resolve(result))
);


/**
* Checks from database does username already exists in database
* @param   {string} username 
* @returns {promise}
*/
const isClientUsernameAlreadyExists = username =>
    db.Client.findOne({ where: { username } })


/**
* Checks from database does email already exists in database
* @param   {string} username 
* @returns {promise}
*/
const isClientEmailAlreadyExists = email => new Promise((resolve) =>
    db.User.findOne({ where: { email } })
        .then((result) => resolve(result)));

module.exports = { insertClient, authenticateClient, isClientEmailAlreadyExists, isClientUsernameAlreadyExists };
