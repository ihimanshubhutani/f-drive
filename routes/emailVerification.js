const express = require("express");
const config = require("config");
const routes = express.Router();
const keys = require("../config/keys.json");
const { insertVerificationCode } = require("../controller/emailVerification");
const uuid = require("uuid");

routes.get("/verify", (req, res) => {
  const code = uuid.v4();

  insertVerificationCode(req.body.email, code);
  const send = require("gmail-send")({
    user: keys.GOOGLE.USERNAME,
    pass: keys.GOOGLE.PASS,
    to: req.query.validemail,
    subject: "Verification Email -- Fdrive",
  });

  send(
    {
      text: `Thank You for registering with Us \n Click below to confim your email address \n
       http://${config.SERVER}/email/verification-service?validemail=${req.body.email}&code=${code}&`,
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result, fullResult);
    }
  );
});

module.exports = routes;
