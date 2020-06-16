import { MESSAGE, STATUS_CODE } from 'config';
import { join } from 'path';
import { isPasswordValid, isEmailValid } from '../util/validations';
import { isUserEmailAlreadyExists, isUserUsernameAlreadyExists } from '../services/user/userDataHandler';

export default (req, res, next) => new Promise((resolve) => {
  if (!isPasswordValid(req.body.password)) {
    res.status(422);
    throw new Error(MESSAGE.INVALID_PASSWORD);
  }

  if (!isEmailValid(req.body.email)) {
    res.status(422);
    throw new Error(MESSAGE.INVALID_EMAIL);
  }

  resolve(req.body.username);
})
  .then((username) => isUserUsernameAlreadyExists(username))
  .then((response) => {
    if (response) {
      res.status(409);
      throw new Error(MESSAGE.USERNAME_EXISTS);
    }
  })
  .then(() => isUserEmailAlreadyExists(req.body.email))
  .then((response) => {
    if (response) {
      if (response) {
        res.status(409);
        throw new Error(MESSAGE.EMAIL_EXISTS);
      }
    }
    next();
  })
  .catch(err => {
    res.render(join(__dirname, '../views/error'),
      { errMsg: err.message, status: res.statusCode, errName: STATUS_CODE[res.statusCode] });
  });
