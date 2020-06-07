const { verifyUserWithFile } = require('../controller/filesDataHandler');

module.exports = (req, res, next) => {
  verifyUserWithFile(req.session.userId, req.params.id)
    .then(result => {
      if (!result) return res.redirect(403, '/');
      return next();
    });
};
