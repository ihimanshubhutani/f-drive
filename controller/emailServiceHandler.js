const config = require("config");
const db = require("../models");
const keys = require("../config/keys.json");

/**
 * Inserts Verification code with user email and userID
 * @param {string}  email
 * @param {string}  code
 * @param {Boolean} userId
 */
const insertVerificationCode = (email, code, userId) =>
  db.EmailConfirmationCode.create({ email, code, userId });

/**
 * Verify email with code
 * @param {string}  email
 * @param {string}  code
 * @param {Boolean} userId
 */
const verifyEmailWithCode = (email, code) =>
  db.EmailConfirmationCode.findOne({
    where: {
      email,
      code
    }
  });

/**
* Sends Email Verification link to `email`
* @param   {string} email
* @param   {string} code
* @returns {void}
*/
const sendEmailForVerification = (email, code) => {
  const send = require("gmail-send")({
    user: keys.GOOGLE.USERNAME,
    pass: keys.GOOGLE.PASS,
    to: email,
    subject: config.EMAIL.SUBJECT,
  });

  send(
    {
      text: `${config.EMAIL.BODY}
       ${config.SERVER}/email/verification-service?validemail=${email}&code=${code}`,
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
    }
  );
};


module.exports = { insertVerificationCode, verifyEmailWithCode, sendEmailForVerification };