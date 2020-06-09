const express = require('express');
const config = require('config');
const path = require('path');
const validateOauthParameters = require('../middleware/oauth/validateOauthParameters');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const { authenticateUser } = require('../controller/userDataHandler');
const { encrypter, decrypter } = require('../controller/oauth/oauthHandler');

const routes = express.Router();

routes.get('/', validateOauthParameters, (req, res) => {
  res.render(path.join(__dirname, '../views/oauthLogin'), { clientName: req.client.name, url: req.url });
});

routes.post('/login', cryptoPasswordParser, validateOauthParameters, (req, res, next) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) { res.status(401); throw new Error(config.MESSAGE.INVALID_CREDENTIALS); }
      if (!result.verifiedAt) {
        res.status(401);
        throw new Error(config.MESSAGE.VERIFY_YOUR_EMAIL);
      }
      req.session.username = req.body.username;
      req.session.userId = result.id;

      return res.redirect(`/oauth/consent?authUser=${encrypter(req.query)}`);
    }).catch(err => next(err));
});


routes.get('/consent', (req, res) => {
  console.log();
  res.render(path.join(__dirname, '../views/oauthConsent'), { data: decrypter(req.query.authUser) });
});

module.exports = routes;
