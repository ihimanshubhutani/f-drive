const config = require('config');
const express = require('express');
const path = require('path');
const { authenticateUser } = require('../controller/userDataHandler');
const cryptoPasswordParser = require('../middleware/cryptoPassword');

const routes = express.Router();

/**
 * Authenticates user, if its session is already availabe or not.
 */
routes.use((req, res, next) => {
  if (req.session.userId) return res.redirect('/');
  return next();
});

routes.get('/', (req, res) => res.sendFile('login.html', { root: path.join(__dirname, '../views/') }));

routes.post('/', cryptoPasswordParser, (req, res) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) return res.status(401).send({ message: config.MESSAGE.INVALID_CREDENTIALS });
      req.session.userId = result.id;

      /**
       * if user ticked 'Remember me' checkbox, his session
       * will be mainted even after browser is closed (for 24 hours from login)
       */
      if (req.body.checkbox) {
        req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
      }

      return res.redirect('/');
    });
});

module.exports = routes;
