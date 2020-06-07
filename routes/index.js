const express = require('express');
const path = require('path');
const authenticateSession = require('../middleware/authenticateSession.js');

const routes = express.Router();
// routes.use(authenticateSession);

routes.get('/', authenticateSession, (req, res) => {
  if (!req.session.verification) {
    res.sendFile('showVerificationMessage.html', { root: path.join(__dirname, '../views/') });
  }

  return res.sendFile('index.html',
    { root: path.join(__dirname, '../views/') });
});

routes.get('/logout', (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});
module.exports = routes;
