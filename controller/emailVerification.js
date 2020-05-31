const db = require("../models");

/**
 * Inserts Verification code with email
 * @param {string}  username
 * @param {string}  password
 * @param {Boolean} verified
 */
const insertVerificationCode = (email, verificationcode) =>
  db.EmailVerification.create({ email, verificationcode });

module.exports = { insertVerificationCode };
