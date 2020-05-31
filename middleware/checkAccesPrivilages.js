const { verifyUserWithFile } = require('../controller/files-dataHandler');

module.exports = (req, res, next) => {

  verifyUserWithFile(req.session.username, req.params.id)
    .then((result) => {
      if (!result) return res.redirect(403, '/');
      next();
    });

}
