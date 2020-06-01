const express = require("express");
const config = require("config");
const routes = express.Router();
const keys = require("../config/keys.json");
const { insertVerificationCode } = require("../controller/email-serviceHandler");
const {
  sendEmailForVerification,
} = require("../controller/sendEmailForVerification");

const uuid = require("uuid");

routes.get("/verify", (req, res) => {
  insertVerificationCode(req.query.email, uuid.v4())
    .then(() => {
      sendEmailForVerification(req.query.email);
    });
  res.send("{message: Email sent to your id}")
});

module.exports = routes;
