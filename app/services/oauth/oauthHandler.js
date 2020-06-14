/* eslint-disable indent */
import { join } from 'path';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { v4 } from 'uuid';
import { SCOPE, ENCRYPTION } from 'config';
import { Op } from 'sequelize';
import moment from 'moment';
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
export const insertAuthorizationCodeParameters = (userId,
  clientId, redirectUri, scope, accessType, expires) => AuthorizationCode.create({
    userId, clientId, scope, redirectUri, accessType, expires,
  });
/**
 *
 * @param {integer} id
 * @param {string} code
 */
export const insertAuthorizationCode = (id, code) => AuthorizationCode.update({
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
export const checkScopes = scopeArray => {
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
export const encrypter = data => {
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
export const decrypter = text => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv(ENCRYPTION.ALGORITHM,
    process.env.AUTHCODE_ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const verifyAuthorizationCode = id => AuthorizationCode.findOne(
  {
    include: [Client],
    where: { id },
  },
);

export const insertTokenValue = (id, value) => Token.update({
  value,
}, {
  where: {
    id,
  },
});

export const insertTokenParameters = (type, scope, userId, clientId, expires) => Token.create({
  type, scope, userId, clientId, expires,
}).then(result => {
  const tokenValue = encrypter({ id: result.id, value: v4() });
  insertTokenValue(result.id, tokenValue);
  return tokenValue;
});

export const verifyRefreshToken = (refershToken) => {
  const decryptedToken = JSON.parse(decrypter(refershToken));
  console.log(decryptedToken);
  const { id } = decryptedToken;
  return Token.findOne({ include: [Client], where: id });
};

export const verifyAccessToken = id => Token.findOne(
  {
    where: { id },
  },
);

export const destroyExpiredAuthorizationCode = (number, string) => {
  AuthorizationCode.destroy({
    raw: true,
    where: { expires: { [Op.lt]: moment().subtract(number, string) } },
  });
};

export const destroyExpiredAccessTokens = (number, string) => {
  Token.destroy({
    raw: true,
    where: {
      expires: { [Op.lt]: moment().subtract(number, string) },
      type: 'access',
    },
  });
};

export const destroyExpiredRefreshTokens = (number, string) => {
  Token.destroy({
    raw: true,
    where: {
      expires: { [Op.lt]: moment().subtract(number, string) },
      type: 'refresh',
    },
  });
};
