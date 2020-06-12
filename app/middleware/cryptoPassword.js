import { createHash } from 'crypto';

/**
 * If body has any password field, populates it with its cryptographic hash
 */
export default (req, res, next) => {
  const { password } = req.body;
  if (password) {
    const cryptoHash = createHash('sha256');
    req.body.password = cryptoHash.update(password).digest('hex');
  }

  next();
};
