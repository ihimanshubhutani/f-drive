const config = require('config');
const { isPasswordValid, isEmailValid } = require('../controller/validations');

const {
  isClientEmailAlreadyExists,
  isClientUsernameAlreadyExists,
} = require('../controller/clientDataHandler');

module.exports = (req, res, next) => new Promise(resolve => {
  if (!isPasswordValid(req.body.password)) {
    res.status(422);
    throw new Error(config.MESSAGE.INVALID_PASSWORD);
  }

  if (!isEmailValid(req.body.email)) {
    res.status(422);
    throw new Error(config.MESSAGE.INVALID_EMAIL);
  }

  resolve(req.body.username);
})
  .then((username) => isClientUsernameAlreadyExists(username))
  .then((response) => {
    if (response) { res.status(409); throw new Error(config.MESSAGE.USERNAME_EXISTS); }
  })
  .then(() => isClientEmailAlreadyExists(req.body.email))
  .then((response) => {
    if (response) { res.status(409); throw new Error(config.MESSAGE.EMAIL_EXISTS); }
    next();
  })
  .catch((err) => res.send({ err, status: res.status }));
