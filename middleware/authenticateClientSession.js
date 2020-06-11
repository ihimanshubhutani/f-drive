import { fetchInfoFromClientId } from '../services/client/clientDataHandler';


/**
 * Authenticate and allow to use /dev
 * only if user is logged in, if user is logged in then populate session object
 * with username
 */
export default (req, res, next) => {
  if (req.session.dev) {
    return fetchInfoFromClientId(req.session.dev.clientId)
      .then(result => {
        if (!result) { req.session.destroy(); return res.redirect('/dev/login'); }
        req.session.dev.username = result.username;

        return next();
      }).catch(err => next(err));
  }
  return res.redirect('/dev/login');
};
