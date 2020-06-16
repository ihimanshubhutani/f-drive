/**
 * Returns encrypted string from object passed
 * @param   {string} data
 * @returns {object}
 */
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { ENCRYPTION } from 'config';
import { join } from 'path';

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: join(__dirname, '../../config/.env') });

export const encrypter = data => {
  console.log(process.env.AUTHCODE_ENCRYPTION_KEY);
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
