import { Router } from 'express';
import { MESSAGE } from 'config';
import { verifyEmailWithCode, deleteVerifiedCode } from '../controller/emailServiceHandler';
import { updateVerifiedColumn } from '../controller/userDataHandler';

const routes = Router();

routes.get('/verification-service', (req, res, next) => {
  const email = req.query.validemail;
  const { code } = req.query;

  return verifyEmailWithCode(email, code)
    .then((result) => {
      if (result) {
        return updateVerifiedColumn(email)
          .then(() => {
            deleteVerifiedCode(result.id);
            return res.redirect('/');
          });
      }
      return res.send({ message: MESSAGE.LINK_EXPIRED });
    }).catch(err => next(err));
});

export default routes;
