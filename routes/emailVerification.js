const express = require("express");
const config = require("config");
const routes = express.Router();
const keys = require("../config/keys.json");
const { insertVerificationCode } = require("../controller/emailVerification");
const {
  sendEmailForVerification,
} = require("../controller/sendEmailForVerification");

const uuid = require("uuid");

routes.get("/verify", (req, res) => {
  insertVerificationCode(req.query.email, req.query.code).then(() => {
    sendEmailForVerification(email);
  });
});

module.exports = routes;
