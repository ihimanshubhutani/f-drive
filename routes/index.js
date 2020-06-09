const express = require('express');
const path = require('path');
const authenticateSession = require('../middleware/authenticateSession.js');

const routes = express.Router();

routes.get('/', authenticateSession, (req, res) => {
  console.log(req.session);
  if (!req.session.verification) {
    return res.render(path.join(__dirname, '../views/showVerificationMessage.ejs'), { email: req.session.email });
  }
  console.log(req.session);
  return res.render(path.join(__dirname, '../views/index'),
    { username: req.session.username });
});

routes.get('/logout', (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});
module.exports = routes;
