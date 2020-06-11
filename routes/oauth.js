import { Router } from 'express';
import validateOauthParameters from '../middleware/oauth/validateOauthParameters';
import validateAuthExchangeRequest from '../middleware/oauth/validateAuthExchangeRequest';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import authenticateOauthSession from '../middleware/oauth/authenticateOauthSession';
import {
  showOauthLoginPage, authenticateOauthLoginRequest, showConsentForm, createAuthorizationCode,
} from '../controller/oauthRequestController';

const routes = Router();

routes.get('/', authenticateOauthSession, validateOauthParameters, showOauthLoginPage);
routes.post('/login', cryptoPasswordParser, validateOauthParameters, authenticateOauthLoginRequest);
routes.get('/consent', authenticateOauthSession, showConsentForm);
routes.post('/consent', createAuthorizationCode);
routes.post('/token', validateAuthExchangeRequest);


export default routes;
