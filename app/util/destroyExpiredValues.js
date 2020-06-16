import cron from 'node-cron';
import { destroyExpiredAuthorizationCode, destroyExpiredAccessTokens, destroyExpiredRefreshTokens } from '../services/oauth/oauthHandler';
import { EXPIRATION } from '../../config/default.json';

/**
 * Destroys all expired values according to time defined in default.json file,
 * STRING can be days, month, year, minutes or seconds
 */
export default () => {
  cron.schedule('* * * * *', () => {
    destroyExpiredAuthorizationCode(EXPIRATION.AUTHORIZATION_CODE.NUMBER,
      EXPIRATION.AUTHORIZATION_CODE.STRING);
    destroyExpiredAccessTokens(EXPIRATION.ACCESS_TOKEN.NUMBER, EXPIRATION.ACCESS_TOKEN.STRING);
    destroyExpiredRefreshTokens(EXPIRATION.REFERSH_TOKEN.NUMBER, EXPIRATION.REFERSH_TOKEN.STRING);
  });
};
