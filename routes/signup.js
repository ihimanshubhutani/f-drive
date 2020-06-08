const express = require('express');
const path = require('path');
const uuid = require('uuid');
const { insertUser } = require('../controller/userDataHandler');
const validator = require('../middleware/userValidator');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const { insertVerificationCode, sendEmailForVerification } = require('../controller/emailServiceHandler');

const routes = express.Router();
routes.get('/', (req, res) => {
  res.sendFile('signup.html', { root: path.join(__dirname, '../views/') });
});

routes.post('/', validator, cryptoPasswordParser, (req, res, next) => {
  const { email } = req.body;
  const code = uuid.v4();

  insertUser(req.body.username, req.body.password, false, email)
    .then(result => {
      insertVerificationCode(email, code, result.id);
      sendEmailForVerification(email, code);
    }).then(() => {
      res.render(path.join(__dirname, '../views/emailConfirmation'), { email });
    }).catch(err => next(err));
});


module.exports = routes;
