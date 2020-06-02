const db = require("../models");

/**
 * Inserts Verification code with user email and userID
 * @param {string}  email
 * @param {string}  code
 * @param {Boolean} userId
 */
const insertVerificationCode = (email, code, userId) =>
  db.EmailConfirmationCode.create({ email, code, userId });

module.exports = { insertVerificationCode };
