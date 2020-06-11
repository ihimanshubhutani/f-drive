import { MESSAGE } from 'config';
import { fetchInfoFromUserId } from '../../services/user/userDataHandler';
import { encrypter } from '../../services/oauth/oauthHandler';

/**
 * Authenticate and redirect to consent screen if user is already logged in
 */
export default (req, res, next) => {
  if (req.session.userId) {
    return fetchInfoFromUserId(req.session.userId)
      .then(result => {
        if (!result) {
          req.session.destroy();
          return next();
        }

        req.session.username = result.username;
        req.session.verification = result.verifiedAt;
        req.session.email = result.email;
        if (!req.session.verification) { res.status(401); throw new Error('User account is not verified'); }
        if (req.url.split('?')[0] === '/consent') return next();
        return res.redirect(`/oauth/consent?authUser=${encrypter(req.query)}`);
      })
      .catch(err => next(err));
  }
  if (req.url.split('?')[0] === '/consent') { res.status(401); return next(new Error(MESSAGE.CANNOT_PROCESS_REQUEST)); }
  return next();
};
