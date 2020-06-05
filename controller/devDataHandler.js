const db = require("../models");

/**
 * Insert Username and hashed password in database.
 * @param   {string} username
 * @param   {string} password
 * @returns {Promise}
 */
const insertClient = (username, password) =>
    db.Client.create({ username, password });

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

module.exports = { insertClient, authenticateClient };
