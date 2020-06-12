import { MESSAGE } from 'config';
import { verifyEmailWithCode, deleteVerifiedCode } from '../services/email/emailServiceHandler';
import { updateVerifiedColumn } from '../services/user/userDataHandler';

export default (req, res, next) => {
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
};
