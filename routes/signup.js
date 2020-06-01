const express = require("express");
const path = require("path");
const { insertUser } = require("../controller/user-dataHandler");
const validator = require("../middleware/validator");
const cryptoPasswordParser = require("../middleware/cryptoPassword");
const { insertVerificationCode } = require("../controller/email-serviceHandler");
const {
  sendEmailForVerification,
} = require("../controller/sendEmailForVerification");
const uuid = require('uuid');

const routes = express.Router();


routes.get("/", (req, res) => {
  res.sendFile("signup.html", { root: path.join(__dirname, "../views/") });
});

routes.post("/", validator, cryptoPasswordParser, (req, res) => {
  const email = req.body.email;
  const code = uuid.v4(); uuid.v4()

  insertUser(req.body.username, req.body.password, false, req.body.email)
    .then(() => {
      insertVerificationCode(req.body.email, code)
      sendEmailForVerification(req.body.email, code);
    }
    ).then(() => {
      res.render(path.join(__dirname, "../views/emailConfirmation"), { email: req.body.email });
    })
});



module.exports = routes;
