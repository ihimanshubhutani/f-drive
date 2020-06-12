import { join } from 'path';
import { STATUS_CODE } from 'config';
import { verifyUserWithFile } from '../services/file/filesDataHandler';

const errorPage = join(__dirname, '../../views/error');
export default (req, res, next) => {
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
        errName: STATUS_CODE[res.statusCode],
      }));
};
