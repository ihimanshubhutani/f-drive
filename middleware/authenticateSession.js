const { authenticateUser } = require('../controller/user-dataHandler');

/**
 * Authenticate and allow to use /upload /delete /update /download
 * only if user is logged in.
 */
const authenticateSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect(401, '/login')
  };

  next();

};

module.exports = authenticateSession;
