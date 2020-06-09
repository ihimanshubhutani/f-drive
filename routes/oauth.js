const express = require('express');
const config = require('config');
const path = require('path');
const validateOauthParameters = require('../middleware/oauth/validateOauthParameters');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const { authenticateUser } = require('../controller/userDataHandler');
const {
  encrypter, decrypter, insertAuthorizationCode, insertAuthorizationCodeParameters,
} = require('../controller/oauth/oauthHandler');

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
      console.log(req.session);
      return res.redirect(`/oauth/consent?authUser=${encrypter(req.query)}`);
    }).catch(err => next(err));
});


routes.get('/consent', (req, res) => {
  const data = decrypter(req.query.authUser);
  const parsedData = JSON.parse(data);

  console.log(req.session);
  return res.render(path.join(__dirname, '../views/oauthConsent'), {
    scope: parsedData.scope.split(' '),
    client_name: req.session.username,
    authUser: req.query.authUser,
    scopeMessage: config.SCOPE,
  });
});

routes.post('/consent', (req, res) => {
  console.log(req.body);
  const data = decrypter(req.body.authUser);
  const parsedData = JSON.parse(data);
  if (req.query.response === 'false') return res.redirect(`${parsedData.redirect_uri}/?error=acess_denied`);
  insertAuthorizationCodeParameters(req.session.userId,
    parsedData.client_id, parsedData.redirect_uri,
    parsedData.scope.split(' '), parsedData.access_type)
    .then(result => {
      insertAuthorizationCode(result.id, authCode);
    });

  return res.json(parsedData);
});

module.exports = routes;
