const path = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const crypto = require('crypto');
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

/**
 * Returns encrypted string from object passed
 * @param   {string} data
 * @returns {object}
 */
const encrypter = data => {
  const text = JSON.stringify(data);
  const cipher = crypto.createCipher(config.ENCRYPTION.ALGORITHM,
    process.env.AUTHCODE_ENCRYPTION_KEY);

  let crypted = cipher.update(text, config.ENCRYPTION.UTF8, config.ENCRYPTION.HEX);
  crypted += cipher.final(config.ENCRYPTION.HEX);
  return crypted;
};

/**
 * Returns decrypted object from string passed
 * @param   {object} data
 * @returns {object}
 */
const decrypter = text => {
  const decipher = crypto.createDecipher(config.ENCRYPTION.ALGORITHM,
    process.env.AUTHCODE_ENCRYPTION_KEY);
  let dec = decipher.update(text, config.ENCRYPTION.HEX, config.ENCRYPTION.UTF8);
  dec += decipher.final(config.ENCRYPTION.UTF8);
  return JSON.parse(dec);
};

module.exports = { checkScopes, encrypter, decrypter };
