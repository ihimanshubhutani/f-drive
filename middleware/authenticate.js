const { authenticateUser } = require('../controller/user-dataHandler');

/**
 * Authenticate and allow to use /upload /delete /update /download
 * only if user is logged in.
 */
const authenticate = (req, res, next) => {

  if (!req.session.username) {
    return res.redirect(401, '/login')
  };

  authenticateUser(req.session.username, req.session.password)
    .then((result) => {

      if (!result) return res.redirect(401, '/login');
      next();
    });

};

module.exports = authenticate;
