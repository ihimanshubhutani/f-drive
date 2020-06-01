const express = require("express");
const path = require("path");
const { insertUser } = require("../controller/user-dataHandler");
const validator = require("../middleware/validator");
const cryptoPasswordParser = require("../middleware/cryptoPassword");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.sendFile("signup.html", { root: path.join(__dirname, "../views/") });
});

routes.post("/", validator, cryptoPasswordParser, (req, res) => {
  console.log(req.body.email);
  insertUser(req.body.username, req.body.password, false, req.body.email);
  res.redirect(`/email/verify?email=${req.body.email}`);
  // return res.redirect(201, "/login");
});

module.exports = routes;
