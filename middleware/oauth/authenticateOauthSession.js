const config = require('config');
const { fetchInfoFromUserId } = require('../../controller/userDataHandler');
const { encrypter } = require('../../controller/oauth/oauthHandler');

/**
 * Authenticate and redirect to consent screen if user is already logged in
 */
module.exports = (req, res, next) => {
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
  if (req.url.split('?')[0] === '/consent') { res.status(401); return next(new Error(config.MESSAGE.CANNOT_PROCESS_REQUEST)); }
  return next();
};
