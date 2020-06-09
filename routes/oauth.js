const express = require('express');
const config = require('config');
const path = require('path');
const validateOauthParameters = require('../middleware/oauth/validateOauthParameters');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const { authenticateUser } = require('../controller/userDataHandler');

const routes = express.Router();

routes.get('/', validateOauthParameters, (req, res) => {
  res.render(path.join(__dirname, '../views/oauthLogin'), { clientName: req.client.name, url: req.url });
});

routes.post('/login', cryptoPasswordParser, validateOauthParameters, (req, res, next) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) { res.status(401); throw new (config.MESSAGE.INVALID_CREDENTIALS)(); }
      return res.render(path.join(__dirname, '../views/oauthConsent'), { clientName: req.client.name, scope: req.query.scope.split(' ') });
    }).catch(err => next(err));
});

module.exports = routes;
