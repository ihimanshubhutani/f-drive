import { fetchInfoFromUserId } from '../services/user/userDataHandler';
/**
 * Authenticate and allow to use /upload /delete /update /download
 * only if user is logged in, if user is logged in then populate session object
 * with username and verifiedAt
 */
const authenticateSession = (req, res, next) => {
  if (req.session.userId) {
    return fetchInfoFromUserId(req.session.userId)
      .then(result => {
        if (!result) {
          req.session.destroy();
          return res.redirect('/login');
        }

        req.session.username = result.username;
        req.session.verification = result.verifiedAt;
        req.session.email = result.email;
        if (req.baseUrl === '/files' && !req.session.verification) return res.redirect('/');
        if (req.baseUrl === '/signup') return res.redirect('/');
        return next();
      })
      .catch(err => next(err));
  }
  console.log(req.baseUrl);
  if (req.baseUrl === '/signup') return next();
  return res.redirect('/login');
};

export default authenticateSession;
