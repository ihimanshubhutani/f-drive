import { join, extname } from 'path';
import { unlinkSync } from 'fs';
import { MESSAGE } from 'config';
import { deleteFilePath, showUserFiles } from '../services/file/filesDataHandler';
import uploadFile from '../util/fileUploader';

export const showUploadPage = (req, res) => {
  res.sendFile('upload.html', { root: join(__dirname, '../views/') });
};

export const downloadFile = (req, res) => {
  res.download(req.filepath, req.filepath.split('*')[1]);
};

export const showFiles = (req, res, next) => {
  showUserFiles(req.session.userId)
    .then(result => {
      const data = JSON.stringify({ arr: result });
      res.render(join(__dirname, '../views/viewFiles'), { data });
    })
    .catch(err => next(err));
};

export const saveFile = (req, res) => {
  if (!req.files) { res.status(400); throw new Error(MESSAGE.NO_FILE_UPLOADED); }

  const file = req.files.uploadedFile;

  if (uploadFile(file, file.name, req.session.userId, extname(file.name), Date.now())) {
    return res.status(201).send({
      message: MESSAGE.FILE_UPLOADED_SUCCESS,
    });
  }

  throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);
};

export const deleteFile = (req, res, next) => {
  deleteFilePath(req.params.id).then((result) => {
    if (!result) throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);

    unlinkSync(req.filepath);
    res.json({ message: MESSAGE.REMOVED_SUCCESSFULLY });
  }).catch(err => next(err));
};
