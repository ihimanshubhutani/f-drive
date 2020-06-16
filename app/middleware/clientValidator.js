import { MESSAGE } from 'config';
import { isPasswordValid, isEmailValid } from '../util/validations';

import { isClientEmailAlreadyExists, isClientUsernameAlreadyExists } from '../services/client/clientDataHandler';

export default (req, res, next) => new Promise(resolve => {
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
  .then((username) => isClientUsernameAlreadyExists(username))
  .then((response) => {
    if (response) { res.status(409); throw new Error(MESSAGE.USERNAME_EXISTS); }
  })
  .then(() => isClientEmailAlreadyExists(req.body.email))
  .then((response) => {
    if (response) { res.status(409); throw new Error(MESSAGE.EMAIL_EXISTS); }
    next();
  })
  .catch(err => next(err));
