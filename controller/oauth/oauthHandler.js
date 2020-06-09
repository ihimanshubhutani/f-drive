const path = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const crypto = require('crypto');
const config = require('../../config/default.json');
const db = require('../../models');

const insertAuthorizationCodeParameters = (userId, clientId, redirectUri, scope, accessType) => db
  .AuthorizationCode.create({
    userId, clientId, scope, redirectUri, accessType,
  });


const insertAuthorizationCode = (id, code) => db.AuthorizationCode.update({
  code,
}, {
  where: {
    id,
  },
});

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
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(config.ENCRYPTION.ALGORITHM,
    process.env.AUTHCODE_ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

/**
 * Returns decrypted object from string passed
 * @param   {object} data
 * @returns {object}
 */
const decrypter = text => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(config.ENCRYPTION.ALGORITHM,
    process.env.AUTHCODE_ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};


module.exports = {
  checkScopes, encrypter, decrypter, insertAuthorizationCodeParameters, insertAuthorizationCode,
};
