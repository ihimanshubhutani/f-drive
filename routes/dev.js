
import { MESSAGE } from 'config';
import { Router } from 'express';
import { join } from 'path';
import { v4 } from 'uuid';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import clientValidator from '../middleware/clientValidator';

import {
  insertClient, authenticateClient, fetchInfoFromClientId, updateRedirectUriAndSecret,
} from '../controller/clientDataHandler';

import authenticateClientSession from '../middleware/authenticateClientSession';
import { isUrlValid } from '../controller/validations';

const routes = Router();

routes.get('/', authenticateClientSession, (req, res) => {
  fetchInfoFromClientId(req.session.dev.clientId)
    .then((result) => {
      if (!result.redirectUri) { return res.sendFile('devIndex.html', { root: join(__dirname, '../views/') }); }

      return res.render('devShowClientDetails', { redirectUri: result.redirectUri, clientSecret: result.clientSecret, clientId: req.session.dev.clientId });
    });
});

routes.post('/generatekeys', authenticateClientSession, (req, res) => {
  if (!isUrlValid(req.body.redirectUri)) {
    return res.status(422)
      .send({ message: MESSAGE.INVALID_URL });
  }
  return updateRedirectUriAndSecret(req.session.dev.clientId, req.body.redirectUri, v4())
    .then(() => res.redirect('/dev'));
});

routes.post('/regenerate', (req, res) => {
  updateRedirectUriAndSecret(req.session.dev.clientId, null, null)
    .then(() => res.redirect('/dev'));
});

routes.get('/login', (req, res) => {
  res.sendFile('devLogin.html', { root: join(__dirname, '../views/') });
});

routes.get('/signup', (req, res) => {
  res.sendFile('devSignup.html', { root: join(__dirname, '../views/') });
});

routes.post('/login', cryptoPasswordParser, (req, res, next) => {
  authenticateClient(req.body.username, req.body.password, req.body.email)
    .then((result) => {
      if (!result) { res.status(401); throw new Error(MESSAGE.INVALID_CREDENTIALS); }
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
      req.session.dev = { clientId: result.id, username: result.username };
      return res.redirect('/dev');
    });
});

routes.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/dev');
});

export default routes;
