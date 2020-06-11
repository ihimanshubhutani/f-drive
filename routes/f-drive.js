import { Router } from 'express';
import verifyAccessToken from '../middleware/oauth/verifyAccessToken';
import { returnFilesData, returnFileMetaData } from '../controller/fDriveController';

const routes = Router();

routes.use(verifyAccessToken);

routes.get('/file', returnFilesData);
routes.get('/file/:id', returnFileMetaData);

export default routes;
