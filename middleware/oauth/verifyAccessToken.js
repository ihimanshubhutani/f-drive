import { SCOPE } from 'config';
import { verifyAccessToken } from '../../services/oauth/oauthHandler';
import { decrypter } from '../../util/encrypiton';

export default (req, res, next) => {
  const accessToken = req.headers.authorization.split('Bearer ')[1];
  let data;
  console.log('hello');
  try {
    const decryptedAccessToken = decrypter(accessToken);
    data = JSON.parse(decryptedAccessToken);
  } catch (err) {
    next(err);
  }
  return verifyAccessToken(data.id)
    .then(result => {
      if (!result) {
        return res.status(400).json({ err: 'access token expired' });
      }
      req.scope = result.scope;
      req.userId = result.userId;
      console.log(req.scope, req.userId);
      if (!SCOPE[req.url.split('/')[1]]) { return res.status(400).json({ err: 'scope unmatched from requested' }); }
      return next();
    });
};
