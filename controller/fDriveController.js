
import { showUserFiles, showFileMetaData } from '../services/file/filesDataHandler';
import { fetchInfoFromUserId } from '../services/user/userDataHandler';

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
  fetchInfoFromUserId(req.userId).then(user => {
    res.json({ user });
  });
};
