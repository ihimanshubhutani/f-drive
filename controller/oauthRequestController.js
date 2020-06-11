import { MESSAGE, SCOPE } from 'config';
import { join } from 'path';
import { v4 } from 'uuid';
import { authenticateUser } from '../services/user/userDataHandler';
import {
  insertAuthorizationCode,
  insertAuthorizationCodeParameters,
  insertTokenParameters,
  insertTokenValue,
} from '../services/oauth/oauthHandler';
import { encrypter, decrypter } from '../util/encrypiton';


export const showOauthLoginPage = (req, res) => {
  res.render(join(__dirname, '../views/oauthLogin'), { clientName: req.client.name, url: req.url });
};

export const authenticateOauthLoginRequest = (req, res, next) => {
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
};

export const showConsentForm = (req, res) => {
  const data = decrypter(req.query.authUser);
  const parsedData = JSON.parse(data);

  console.log(req.session);
  return res.render(join(__dirname, '../views/oauthConsent'), {
    scope: parsedData.scope.split(' '),
    client_name: req.session.username,
    authUser: req.query.authUser,
    scopeMessage: SCOPE,
  });
};

export const createAuthorizationCode = (req, res, next) => {
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
};

export const returnAccessToken = (req, res) => {
  insertTokenParameters('access', req.auth.scope, req.auth.id, req.auth.Client.id)
    .then(result => {
      const accessTokenValue = encrypter({ id: result.id, value: v4() });
      insertTokenValue(result.id, accessTokenValue);
      return {
        access_token: accessTokenValue, scope: req.auth.scope, expires_in: 600, token_type: 'Bearer',
      };
    }).then((data) => {
      if (req.body.access_type === 'offline') {
        return insertTokenParameters('refresh', req.auth.scope, req.auth.id, req.auth.Client.id)
          .then(result => {
            const refreshTokenValue = encrypter({ id: result.id, value: v4() });
            insertTokenValue(result.id, refreshTokenValue);
            const output = data;
            output.refresh_token = refreshTokenValue;
            return output;
          });
      }
      return data;
    }).then((data) => res.json(data));
};