import { Router } from 'express';
import verifyAccessToken from '../middleware/oauth/verifyAccessToken';

const routes = Router();

routes.get('/files', verifyAccessToken);

export default routes;
