const path = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const config = require('../../config/default.json');

/**
 * Returns valid and invalid scope from scope array
 * @param   {array} scopeArray
 * @returns {object}
 */
const checkScopes = scopeArray => {
  const result = { invalid: [], valid: [] };
  const availableScope = config.SCOPE;
  for (let i = 0; i < scopeArray.length; i += 1) {
    if (!availableScope[scopeArray[i]]) {
      result.invalid.push(scopeArray[i]);
      // eslint-disable-next-line no-continue
      continue;
    }
    result.valid.push(scopeArray[i]);
  }
  return result;
};

const encryptAuthCode = object => {
  const text = JSON.stringify(object);
  const cipher = crypto.createCipher('aes-256-cbc', process.env.AUTHCODE_ENCRYPTION_KEY);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decryptAuthCode = object => {
  const text = JSON.stringify(object);
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.AUTHCODE_ENCRYPTION_KEY);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};


module.exports = { checkScopes, encryptAuthCode, decryptAuthCode };
