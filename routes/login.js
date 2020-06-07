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

routes.post('/', cryptoPasswordParser, (req, res) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) return res.status(401).send({ message: config.MESSAGE.INVALID_CREDENTIALS });
      req.session.userId = result.id;

      /**
         * if user ticked 'Remember me' checkbox, his session
         * will be mainted even after browser is closed (for 24 hours from login)
         */
      if (req.body.checkbox) { req.session.cookie.maxAge = 24 * 60 * 60 * 1000; }

      return res.redirect('/');
    });
});

module.exports = routes;
