const config = require("config");
const keys = require("../config/keys.json");

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
      console.log(result, fullResult);
    }
  );
};

module.exports = { sendEmailForVerification };
