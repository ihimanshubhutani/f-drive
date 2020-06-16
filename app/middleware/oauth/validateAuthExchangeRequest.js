import { GRANT_TYPE } from 'config';
import { decrypter } from '../../util/encrypiton';
import {
  verifyAuthorizationCode, verifyRefreshToken,
} from '../../services/oauth/oauthHandler';

module.exports = (req, res, next) => {
  const clientId = req.body.client_id;
  const clientSecret = req.body.client_secret;
  const grantType = req.body.grant_type;
  if (!GRANT_TYPE[grantType]) {
    return res.status(400).json({ error: 'invalid grant_type' });
  }
  if (!(req.body.code || req.body.refresh_token)) return res.status(400).json({ err: 'invalid request' });
  if (req.body.refresh_token) {
    return verifyRefreshToken(req.body.refresh_token)
      .then((result) => {
        if (!result) return res.status(404).json({ error: 'authorization code expired' });
        if (!result.Client.id) return res.status(400).json({ err: 'bad request' });
        if (result.Client.id !== Number.parseInt(clientId, 10)) return res.status(401).json({ error: 'invalid client id' });
        if (result.Client.clientSecret !== clientSecret) return res.status(401).json({ error: 'invalid client Secret' });
        req.auth = result;
        return next();
      }).catch(err => {
        console.log(err);
        res.json({ err });
      });
  }
  if (req.body.code) {
    const decryptedCode = JSON.parse(decrypter(req.body.code));
    return verifyAuthorizationCode(decryptedCode.id)
      .then((result) => {
        if (!result) return res.status(404).json({ error: 'authorization code expired' });
        if (!result.code === decryptedCode.code) return res.status(400).json({ error: 'invalid code' });
        if (result.Client.id !== Number.parseInt(clientId, 10)) return res.status(401).json({ error: 'invalid client id' });
        if (result.Client.clientSecret !== clientSecret) return res.status(401).json({ error: 'invalid client Secret' });
        req.auth = result;
        return next();
      }).catch(err => {
        console.log(err);
        res.json({ err });
      });
  }
  return next();
};
