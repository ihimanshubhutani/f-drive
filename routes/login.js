const express = require('express');
const routes = express.Router()
const config = require('config');
const path = require('path');
const { authenticateUser } = require('../controller/user-dataHandler');

const cryptoPasswordParser = require('../middleware/cryptoPassword');

routes.get('/', (req, res) =>
  res.sendFile('login.html', { root: path.join(__dirname, '../views/') })
);

routes.post('/', cryptoPasswordParser, (req, res) => {

  authenticateUser(req.body.username, req.body.password)
    .then(result => {

      if (!result) {
        return res.status(400).send({ message: 'Invalid Credentials' });
      }

      req.session.username = req.body.username;
      req.session.password = req.body.password;

      /**
       * if user ticked 'Remember me' checkbox, his session 
       * will be mainted even after browser is closed (for 24 hours from login)
       */
      if (req.body.checkbox) {
        req.session.cookie.maxAge = 24 * 60 * 60 * 1000
      }

      res.redirect('/')
    })
});

module.exports = routes;
