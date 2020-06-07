const config = require('config');
const path = require('path');
const { fetchInfoFromUserId } = require('../controller/userDataHandler');

const errorPage = path.join(__dirname, '../../views/error');

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

        return next();
      })
      .catch(err => res.render(errorPage,
        {
          errMsg: err.message,
          status: res.statusCode,
          errName: config.STATUS_CODE[res.statusCode],
        }));
  }
  return res.redirect('/login');
};

module.exports = authenticateSession;
