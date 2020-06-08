const path = require('path');
const config = require('config');
const { verifyUserWithFile } = require('../controller/filesDataHandler');

const errorPage = path.join(__dirname, '../../views/error');
module.exports = (req, res, next) => {
  verifyUserWithFile(req.session.userId, req.params.id)
    .then(result => {
      if (!result) return res.redirect(403, '/');
      req.filepath = result.path;
      console.log(req.filepath);
      return next();
    }).catch(err => res.render(errorPage,
      {
        errMsg: err.message,
        status: res.statusCode,
        errName: config.STATUS_CODE[res.statusCode],
      }));
};
