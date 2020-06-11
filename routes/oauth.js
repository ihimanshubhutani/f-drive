import { Router } from 'express';
import { MESSAGE, SCOPE } from 'config';
import { join } from 'path';
import { v4 } from 'uuid';
import validateOauthParameters from '../middleware/oauth/validateOauthParameters';
import validateAuthExchangeRequest from '../middleware/oauth/validateAuthExchangeRequest';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import { authenticateUser } from '../services/user/userDataHandler';
import authenticateOauthSession from '../middleware/oauth/authenticateOauthSession';
import {
  encrypter,
  decrypter, insertAuthorizationCode, insertAuthorizationCodeParameters,
} from '../services/oauth/oauthHandler';
// const { fetchInfoFromClientId } = require('../controller/clientDataHandler');


const routes = Router();

routes.get('/', authenticateOauthSession, validateOauthParameters, (req, res) => {
  res.render(join(__dirname, '../views/oauthLogin'), { clientName: req.client.name, url: req.url });
});

routes.post('/login', cryptoPasswordParser, validateOauthParameters, (req, res, next) => {
  authenticateUser(req.body.username, req.body.password)
    .then((result) => {
      if (!result) { res.status(401); throw new Error(MESSAGE.INVALID_CREDENTIALS); }
      if (!result.verifiedAt) {
        res.status(401);
        throw new Error(MESSAGE.VERIFY_YOUR_EMAIL);
      }

      req.session.username = req.body.username;
      req.session.userId = result.id;
      console.log(req.session);
      return res.redirect(`/oauth/consent?authUser=${encrypter(req.query)}`);
    }).catch(err => next(err));
});


routes.get('/consent', authenticateOauthSession, (req, res) => {
  const data = decrypter(req.query.authUser);
  const parsedData = JSON.parse(data);

  console.log(req.session);
  return res.render(join(__dirname, '../views/oauthConsent'), {
    scope: parsedData.scope.split(' '),
    client_name: req.session.username,
    authUser: req.query.authUser,
    scopeMessage: SCOPE,
  });
});

routes.post('/consent', (req, res, next) => {
  console.log(req.body);
  const data = decrypter(req.body.authUser);
  const parsedData = JSON.parse(data);
  console.log(parsedData.client_id);
  if (req.query.response === 'false') return res.redirect(`${parsedData.redirect_uri}/?error=acess_denied`);
  return insertAuthorizationCodeParameters(req.session.userId,
    parsedData.client_id, parsedData.redirect_uri,
    parsedData.scope.split(' '), parsedData.access_type)
    .then(result => {
      const authCode = encrypter({ id: result.id, code: v4() });
      insertAuthorizationCode(result.id, authCode);
      return res.redirect(`${parsedData.redirect_uri}/?code=${authCode}&state=${parsedData.state}`);
    }).catch(err => next(err));
});

routes.post('/token', validateAuthExchangeRequest);


export default routes;
