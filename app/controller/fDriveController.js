
import { showUserFiles, showFileMetaData } from '../services/file/filesDataHandler';
import { fetchInfoFromUserId } from '../services/user/userDataHandler';
import { downloadFile } from './fileController';

export const returnFilesData = (req, res) => {
  console.log(req.userId);
  showUserFiles(req.userId, ['path', 'userId'])
    .then(files => {
      res.json({ files });
    });
};

export const returnFileMetaData = (req, res) => {
  showFileMetaData(req.params.id, ['path', 'userId'])
    .then(file => {
      res.json({ file });
    });
};

export const returnProfileData = (req, res) => {
  fetchInfoFromUserId(req.userId).then(profile => {
    res.json({ profile });
  });
};

export const downloadFileWithAccessToken = (req, res) => {
  console.log('here');
  showFileMetaData(req.params.id, ['userId'])
    .then(file => {
      if (!file) return res.status(404).json({ error: 'file not found' });
      req.filepath = file.path;
      return downloadFile(req, res);
    });
};
