import { Router } from 'express';
import validator from '../middleware/userValidator';
import cryptoPasswordParser from '../middleware/cryptoPassword';
import authenticateSession from '../middleware/authenticateSession';
import { showUserSignUpPage, createUserAccount } from '../controller/userController';

const routes = Router();
routes.use(authenticateSession);
routes.get('/', showUserSignUpPage);

routes.post('/', validator, cryptoPasswordParser, createUserAccount);


export default routes;
