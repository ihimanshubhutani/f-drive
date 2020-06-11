import { Router } from 'express';

import {
  showUploadPage, downloadFile, showFiles, saveFile, deleteFile,
} from '../controller/fileController';
import authenticate from '../middleware/authenticateSession';
import checkAccessAllowed from '../middleware/checkAccesPrivilages';


const routes = Router();

/**
 * Authenticates user, if its session is already availabe or not.
 */
routes.use(authenticate);

routes.get('/', showFiles);
routes.get('/upload', showUploadPage);
routes.get('/:id', checkAccessAllowed, downloadFile);
routes.post('/', saveFile);
routes.delete('/:id', checkAccessAllowed, deleteFile);

export default routes;
