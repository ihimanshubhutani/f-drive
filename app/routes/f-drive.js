import { Router } from 'express';
import verifyAccessToken from '../middleware/oauth/verifyAccessToken';
import {
  returnFilesData, returnFileMetaData, returnProfileData, downloadFileWithAccessToken,
} from '../controller/fDriveController';

const routes = Router();

routes.use(verifyAccessToken);
routes.get('/file', returnFilesData);
routes.get('/file/:id', returnFileMetaData);
routes.get('/profile', returnProfileData);
routes.get('/file/download/:id', downloadFileWithAccessToken);

export default routes;
