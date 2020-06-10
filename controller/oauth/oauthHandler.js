/* eslint-disable indent */
import { join } from 'path';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { SCOPE, ENCRYPTION } from '../../config/default.json';
import { AuthorizationCode, Client, Token } from '../../models';
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: join(__dirname, '../../config/.env') });

/**
 *
 * @param {string} userId
 * @param {string} clientId
 * @param {string} redirectUri
 * @param {string} scope
 * @param {string} accessType
 */
const insertAuthorizationCodeParameters = (userId,
  clientId, redirectUri, scope, accessType) => AuthorizationCode.create({
    userId, clientId, scope, redirectUri, accessType,
  });
/**
 *
 * @param {integer} id
 * @param {string} code
 */
const insertAuthorizationCode = (id, code) => AuthorizationCode.update({
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
  const availableScope = SCOPE;
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
  const iv = randomBytes(16);
  const cipher = createCipheriv(ENCRYPTION.ALGORITHM,
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
  const decipher = createDecipheriv(ENCRYPTION.ALGORITHM,
    process.env.AUTHCODE_ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const verifyAuthorizationCode = id => AuthorizationCode.findOne(
  {
    include: [Client],
    where: { id },
  },
);


const insertAccessTokenParameters = (type, value, scope, userId, clientId) => Token.create({
  type, value, scope, userId, clientId,
});

export {
  checkScopes,
  encrypter,
  decrypter,
  insertAuthorizationCodeParameters,
  insertAuthorizationCode,
  verifyAuthorizationCode,
  insertAccessTokenParameters,
};
