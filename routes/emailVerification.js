const express = require("express");
const path = require("path");

const routes = express.Router();
const keys = require("../config/keys.json");

routes.get("/verify", (req, res) => {
  const send = require("gmail-send")({
    user: keys.GOOGLE.USERNAME,
    pass: keys.GOOGLE.PASS,
    to: req.query.validemail,
    subject: "Verification Email -- Fdrive",
  });

  send(
    {
      text: `Thank You for registering with Us \n Your verification code is ${req.query.code}`,
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result, fullResult);
    }
  );

  res.send(req.query.validemail);
});

module.exports = routes;
