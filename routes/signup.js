import { Router } from 'express';
import { join } from 'path';
import { v4 } from 'uuid';
import { insertUser } from '../services/user/userDataHandler';
import validator from '../middleware/userValidator';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import { insertVerificationCode, sendEmailForVerification } from '../services/email/emailServiceHandler';
import authenticateSession from '../middleware/authenticateSession';

const routes = Router();
routes.use(authenticateSession);
routes.get('/', (req, res) => {
  res.sendFile('signup.html', { root: join(__dirname, '../views/') });
});

routes.post('/', validator, cryptoPasswordParser, (req, res, next) => {
  const { email } = req.body;
  const code = v4();

  insertUser(req.body.username, req.body.password, false, email)
    .then(result => {
      insertVerificationCode(email, code, result.id);
      sendEmailForVerification(email, code);
    }).then(() => {
      res.render(join(__dirname, '../views/emailConfirmation'), { email });
    }).catch(err => next(err));
});


export default routes;
