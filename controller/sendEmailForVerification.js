const uuid = require("uuid");
const config = require("config");
const keys = require("../config/keys.json");

const sendEmailForVerification = (email) => {
  const code = uuid.v4();
  insertVerificationCode(email, code);
  const send = require("gmail-send")({
    user: keys.GOOGLE.USERNAME,
    pass: keys.GOOGLE.PASS,
    to: email,
    subject: "Verification Email -- Fdrive",
  });

  send(
    {
      text: `Thank You for registering with Us \n Click below to confim your email address \n
       http://${config.SERVER}/email/verification-service?validemail=${email}&code=${code}&`,
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result, fullResult);
    }
  );
};

module.exports = { sendEmailForVerification };
