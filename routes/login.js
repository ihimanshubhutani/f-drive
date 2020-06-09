const config = require('config');
const express = require('express');
const path = require('path');
const { authenticateUser } = require('../controller/userDataHandler');
const cryptoPasswordParser = require('../middleware/cryptoPassword');

const routes = express.Router();

routes.get('/', (req, res) => {
  if (req.session.userId) return res.redirect('/');
  return res.sendFile('login.html', { root: path.join(__dirname, '../views/') });
});

routes.post('/', cryptoPasswordParser, (req, res, next) => {
  authenticateUser(req.body.username, req.body.password)
    .then(result => {
      if (!result) { res.status(401); throw new Error(config.MESSAGE.INVALID_CREDENTIALS); }
      req.session.userId = result.id;
      req.session.verification = result.verifiedAt;
      console.log(req.session);
      if (req.body.checkbox) { req.session.cookie.maxAge = 24 * 60 * 60 * 1000; }
      return res.redirect('/');
    }).catch(err => next(err));
});


module.exports = routes;
