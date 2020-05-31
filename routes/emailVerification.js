const express = require("express");
const path = require("path");

const routes = express.Router();
const keys = require("../config/keys.json");

routes.get("/verify", (req, res) => {
  const send = require("gmail-send")({
    user: keys.GOOGLE.USERNAME,
    pass: keys.GOOGLE.PASS,
    to: "bhutanihimanshu98@gmail.com",
    subject: "Verification Email -- Fdrive",
  });

  send(
    { text: "Thank You for registering with Us \n We Welcome you" },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result, fullResult);
    }
  );

  res.send(req.query.validemail);
});

module.exports = routes;
