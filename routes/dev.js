
const config = require('config');
const express = require('express');
const path = require('path');
const uuid = require('uuid');
const cryptoPasswordParser = require('../middleware/cryptoPassword');
const clientValidator = require('../middleware/clientValidator');

const {
  insertClient, authenticateClient, fetchInfoFromClientId, updateRedirectUriAndSecret,
} = require('../controller/clientDataHandler');

const authenticateClientSession = require('../middleware/authenticateClientSession');
const { isUrlValid } = require('../controller/validations');

const routes = express.Router();

routes.get('/', authenticateClientSession, (req, res) => {
  fetchInfoFromClientId(req.session.dev.clientId)
    .then((result) => {
      if (!result.redirectUri) { return res.sendFile('devIndex.html', { root: path.join(__dirname, '../views/') }); }

      return res.render('devShowClientDetails', { redirectUri: result.redirectUri, clientSecret: result.clientSecret, clientId: req.session.dev.clientId });
    });
});

routes.post('/generatekeys', authenticateClientSession, (req, res) => {
  if (!isUrlValid(req.body.redirectUri)) {
    return res.status(422)
      .send({ message: config.MESSAGE.INVALID_URL });
  }
  return updateRedirectUriAndSecret(req.session.dev.clientId, req.body.redirectUri, uuid.v4())
    .then(() => res.redirect('/dev'));
});

routes.post('/regenerate', (req, res) => {
  updateRedirectUriAndSecret(req.session.dev.clientId, null, null)
    .then(() => res.redirect('/dev'));
});

routes.get('/login', (req, res) => {
  res.sendFile('devLogin.html', { root: path.join(__dirname, '../views/') });
});

routes.get('/signup', (req, res) => {
  res.sendFile('devSignup.html', { root: path.join(__dirname, '../views/') });
});

routes.post('/login', cryptoPasswordParser, (req, res, next) => {
  authenticateClient(req.body.username, req.body.password, req.body.email)
    .then((result) => {
      if (!result) { res.status(401); throw new Error(config.MESSAGE.INVALID_CREDENTIALS); }
      console.log('result ', result.id);
      req.session.dev = { clientId: result.id };

      /**
       * if user ticked 'Remember me' checkbox, his session
       * will be mainted even after browser is closed (for 24 hours from login)
       */
      if (req.body.checkbox) {
        req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
      }

      return res.redirect('/dev');
    }).catch(err => next(err));
});

routes.post('/signup', clientValidator, cryptoPasswordParser, (req, res) => {
  insertClient(req.body.username, req.body.email, req.body.password)
    .then((result) => {
      req.session.dev = { clientId: result.id };
      return res.redirect('/dev');
    });
});

routes.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/dev');
});

module.exports = routes;
