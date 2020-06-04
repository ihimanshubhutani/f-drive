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
  const code = uuid.v4();

  insertUser(req.body.username, req.body.password, false, email)
    .then(result => {
      insertVerificationCode(email, code, result.id)
      sendEmailForVerification(email, code);
    }
    ).then(() => {
      res.render(path.join(__dirname, "../views/emailConfirmation"), { email });
    })
});



module.exports = routes;
