
import { Router } from 'express';

import authenticateClientSession from '../middleware/authenticateClientSession';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import clientValidator from '../middleware/clientValidator';
import {
  showClientLoginPage, showClientIndexPage,
  generateClientSecret, updateClientSecret,
  showSignUpPage,
  authenticateClientDetails,
  createClientAccount,
  logoutClient,
} from '../controller/clientController';

const routes = Router();

routes.get('/', authenticateClientSession, showClientIndexPage);
routes.post('/generatekeys', authenticateClientSession, generateClientSecret);
routes.post('/regenerate', updateClientSecret);
routes.get('/login', showClientLoginPage);
routes.get('/signup', showSignUpPage);
routes.post('/login', cryptoPasswordParser, authenticateClientDetails);
routes.post('/signup', clientValidator, cryptoPasswordParser, createClientAccount);
routes.get('/logout', logoutClient);

export default routes;
