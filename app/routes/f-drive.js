import { Router } from 'express';
import verifyAccessToken from '../middleware/oauth/verifyAccessToken';
import {
  returnFilesData, returnFileMetaData, returnProfileData, downloadFileWithAccessToken,
} from '../controller/fDriveController';


const routes = Router();
routes.get('/okok', (req, res) => {
  console.log('called');
  res.download('./public/1/1591860558238*Himanshu Bhutani Resume.pdf');
});
routes.use(verifyAccessToken);

routes.get('/file', returnFilesData);
routes.get('/file/:id', returnFileMetaData);
routes.get('/profile', returnProfileData);
routes.get('/file/download/:id', downloadFileWithAccessToken);

export default routes;
