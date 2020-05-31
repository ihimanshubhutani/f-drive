const db = require("../models");

const insertVerification = (username, password, verified) =>
  db.User.create({ username, password, verified });
