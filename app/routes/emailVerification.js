import { Router } from 'express';
import emailVerify from '../controller/emailController';

const routes = Router();

routes.get('/verification-service', emailVerify);

export default routes;
