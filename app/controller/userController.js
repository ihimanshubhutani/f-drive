import { join } from 'path';
import { MESSAGE } from 'config';
import { v4 } from 'uuid';
import { authenticateUser, insertUser } from '../services/user/userDataHandler';
import { insertVerificationCode, sendEmailForVerification } from '../services/email/emailServiceHandler';


export const showUserLoginPage = (req, res) => {
  if (req.session.userId) return res.redirect('/');
  return res.sendFile('login.html', { root: join(__dirname, '../views/') });
};

export const authenticateUserDetails = (req, res, next) => {
  authenticateUser(req.body.username, req.body.password)
    .then(result => {
      if (!result) { res.status(401); throw new Error(MESSAGE.INVALID_CREDENTIALS); }
      req.session.userId = result.id;
      req.session.verification = result.verifiedAt;
      console.log(req.session);
      if (req.body.checkbox) { req.session.cookie.maxAge = 24 * 60 * 60 * 1000; }
      return res.redirect('/');
    }).catch(err => next(err));
};

export const showUserIndexPage = (req, res) => {
  console.log(req.session);
  if (!req.session.verification) {
    return res.render(join(__dirname, '../views/showVerificationMessage.ejs'), { email: req.session.email });
  }
  console.log(req.session);
  return res.render(join(__dirname, '../views/index'),
    { username: req.session.username });
};

export const logoutUser = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

export const showUserSignUpPage = (req, res) => {
  res.sendFile('signup.html', { root: join(__dirname, '../views/') });
};

export const createUserAccount = (req, res, next) => {
  const { email } = req.body;
  const code = v4();

  insertUser(req.body.username, req.body.password, false, email)
    .then(result => {
      insertVerificationCode(email, code, result.id);
      sendEmailForVerification(email, code, `http://${req.headers.host}`);
    }).then(() => {
      res.render(join(__dirname, '../views/emailConfirmation'), { email });
    }).catch(err => next(err));
};
