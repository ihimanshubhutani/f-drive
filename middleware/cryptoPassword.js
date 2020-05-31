const crypto = require('crypto');

/**
 * If body has any password field, populates it with its cryptographic hash 
 */
module.exports = (req, res, next) => {
  const password = req.body.password;
  if (password) {
    const cryptoHash = crypto.createHash('sha256');
    req.body.password = cryptoHash.update(password).digest('hex');
  }

  next();
};
