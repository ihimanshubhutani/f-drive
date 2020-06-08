const express = require('express');
const config = require('config');
const path = require('path');
const validateOauthParameters = require('../middleware/oauth/validateOauthParameters');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const { authenticateUser } = require('../controller/userDataHandler');

const routes = express.Router();
const errorPage = path.join(__dirname, '../views/error');

routes.get('/', validateOauthParameters, (req, res) => {
  res.render(path.join(__dirname, '../views/oauthLogin'), { clientName: req.client.name, url: req.url });
});

routes.post('/login', cryptoPasswordParser, validateOauthParameters, (req, res) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) { res.status(401); throw new (config.MESSAGE.INVALID_CREDENTIALS)(); }
      return res.render(path.join(__dirname, '../views/oauthConsent'), { clientName: req.client.name, scope: req.query.scope.split(' ') });
    }).catch(err => res.status(500).render(errorPage,
      {
        errMsg: err.message,
        status: res.statusCode,
        errName: config.STATUS_CODE[res.statusCode],
      }));
});

module.exports = routes;
