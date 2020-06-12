
import { Router } from 'express';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import { showUserLoginPage, authenticateUserDetails } from '../controller/userController';

const routes = Router();

routes.get('/', showUserLoginPage);
routes.post('/', cryptoPasswordParser, authenticateUserDetails);

export default routes;
