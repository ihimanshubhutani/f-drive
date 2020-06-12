import { GRANT_TYPE } from 'config';
import { decrypter } from '../../util/encrypiton';
import {
  verifyAuthorizationCode,
} from '../../services/oauth/oauthHandler';

module.exports = (req, res, next) => {
  const decryptedCode = JSON.parse(decrypter(req.body.code));
  const clientId = req.body.client_id;
  const clientSecret = req.body.client_secret;
  const grantType = req.body.grant_type;
  if (!GRANT_TYPE[grantType]) {
    return res.status(400).json({ error: 'invalid grant_type' });
  }

  return verifyAuthorizationCode(decryptedCode.id)
    .then((result) => {
      if (!result.code === decryptedCode.code) return res.status(400).json({ error: 'invalid code' });
      if (result.Client.id !== Number.parseInt(clientId, 10)) return res.status(401).json({ error: 'invalid client id' });
      if (result.Client.clientSecret !== clientSecret) return res.status(401).json({ error: 'invalid client Secret' });
      req.auth = result;
      return next();
    }).catch(err => res.json({ err }));
};
