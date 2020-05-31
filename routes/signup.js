const express = require("express");
const path = require("path");
const uuid = require("uuid");
const { insertUser } = require("../controller/user-dataHandler");
const { insertVerificationCode } = require("../controller/emailVerification");
const validator = require("../middleware/validator");
const cryptoPasswordParser = require("../middleware/cryptoPassword");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.sendFile("signup.html", { root: path.join(__dirname, "../views/") });
});

routes.post("/", validator, cryptoPasswordParser, (req, res) => {
  console.log(req.body.email);
  const code = uuid.v4();
  insertUser(req.body.username, req.body.password, false, email);
  insertVerificationCode(req.body.email, code);
  res.redirect(`/email/verify?validemail=${req.body.email}&code=${code}`);
  // return res.redirect(201, "/login");
});

module.exports = routes;
