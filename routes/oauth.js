const express = require('express');
const config = require('config');

const routes = express.Router();
const path = require('path');
const validateOauthParameters = require('../middleware/oauth/validateOauthParameters');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const { authenticateUser } = require('../controller/userDataHandler');

routes.get('/', validateOauthParameters, (req, res) => {
  console.log(req.url);
  res.render(path.join(__dirname, '../views/oauthLogin'), { clientName: req.client.name, url: req.url });
});

routes.post('/login', cryptoPasswordParser, validateOauthParameters, (req, res) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) return res.status(401).send({ message: config.MESSAGE.INVALID_CREDENTIALS });
      return res.render(path.join(__dirname, '../views/oauthConsent'), { clientName: req.client.name, scope: req.query.scope.split(' ') });
    });
});


module.exports = routes;
