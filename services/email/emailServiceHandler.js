import { EMAIL, SERVER } from 'config';
import { EmailConfirmationCode } from '../../models';
import { GOOGLE } from '../../config/keys.json';

/**
 * Inserts Verification code with user email and userID
 * @param {string}  email
 * @param {string}  code
 * @param {Boolean} userId
 */
const insertVerificationCode = (email, code, userId) => EmailConfirmationCode.create({
  email,
  code,
  userId,
});

/**
 * Verify email with code
 * @param {string}  email
 * @param {string}  code
 * @param {Boolean} userId
 */
const verifyEmailWithCode = (email, code) => EmailConfirmationCode.findOne({
  where: {
    email,
    code,
  },
});

const deleteVerifiedCode = (id) => EmailConfirmationCode.destroy({
  where: {
    id,
  },
});

/**
* Sends Email Verification link to `email`
* @param   {string} email
* @param   {string} code
* @returns {void}
*/
const sendEmailForVerification = (email, code) => {
  // eslint-disable-next-line global-require
  const send = require('gmail-send')({
    user: GOOGLE.USERNAME,
    pass: GOOGLE.PASS,
    to: email,
    subject: EMAIL.SUBJECT,
  });

  return send(
    {
      text: `${EMAIL.BODY}
       ${SERVER}/email/verification-service?validemail=${email}&code=${code}`,
    },
    (error) => {
      if (error) return error;
      return true;
    },
  );
};


export {
  insertVerificationCode,
  verifyEmailWithCode,
  sendEmailForVerification,
  deleteVerifiedCode,
};