import { Router } from 'express';
import { unlinkSync } from 'fs';
import { join, extname } from 'path';
import { MESSAGE } from 'config';

import authenticate from '../middleware/authenticateSession';
import checkAccessAllowed from '../middleware/checkAccesPrivilages';
import uploadFile from '../util/fileUploader';

import { deleteFilePath, showUserFiles } from '../services/file/filesDataHandler';

const routes = Router();

/**
 * Authenticates user, if its session is already availabe or not.
 */
routes.use(authenticate);

routes.get('/', (req, res, next) => {
  showUserFiles(req.session.userId, res)
    .then(result => {
      const data = JSON.stringify({ arr: result });
      res.render(join(__dirname, '../views/viewFiles'), { data });
    })
    .catch(err => next(err));
});

routes.get('/upload', (req, res) => {
  res.sendFile('upload.html', { root: join(__dirname, '../views/') });
});

routes.get('/:id', checkAccessAllowed, (req, res) => {
  res.download(req.filepath, req.filepath.split('*')[1]);
});

routes.post('/', (req, res) => {
  if (!req.files) { res.status(400); throw new Error(MESSAGE.NO_FILE_UPLOADED); }

  const file = req.files.uploadedFile;

  if (uploadFile(file, file.name, req.session.userId, extname(file.name), Date.now())) {
    return res.status(201).send({
      message: MESSAGE.FILE_UPLOADED_SUCCESS,
    });
  }

  throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);
});


routes.delete('/:id', checkAccessAllowed, (req, res, next) => {
  deleteFilePath(req.params.id).then((result) => {
    if (!result) throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);

    unlinkSync(req.filepath);
    res.json({ message: MESSAGE.REMOVED_SUCCESSFULLY });
  }).catch(err => next(err));
});


export default routes;
