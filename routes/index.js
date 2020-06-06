const express = require('express');
const routes = express.Router();
const path = require('path');

const authenticateSession = require('../middleware/authenticateSession.js');
routes.use(authenticateSession);

routes.get('/', (req, res) => {
  if (!req.session.verification) {
    res.sendFile('showVerificationMessage.html', { root: path.join(__dirname, '../views/') });
  }

  return res.sendFile('index.html',
    { root: path.join(__dirname, '../views/') })

}
)

routes.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})
module.exports = routes;