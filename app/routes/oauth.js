import { Router } from 'express';
import validateOauthParameters from '../middleware/oauth/validateOauthParameters';
import validateAuthExchangeRequest from '../middleware/oauth/validateAuthExchangeRequest';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import authenticateOauthSession from '../middleware/oauth/authenticateOauthSession';
import {
  showOauthLoginPage,
  authenticateOauthLoginRequest,
  showConsentForm,
  createAuthorizationCode,
  returnAccessToken,
} from '../controller/oauthRequestController';

const routes = Router();

routes.get('/', validateOauthParameters, authenticateOauthSession, showOauthLoginPage);
routes.post('/login', cryptoPasswordParser, validateOauthParameters, authenticateOauthLoginRequest);
routes.get('/consent', authenticateOauthSession, showConsentForm);
routes.post('/consent', createAuthorizationCode);
routes.post('/token', validateAuthExchangeRequest, returnAccessToken);

export default routes;
