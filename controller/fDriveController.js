
import { showUserFiles } from '../services/file/filesDataHandler';

export const returnFilesData = (req, res) => {
  console.log('je');
  showUserFiles(req.userId)
    .then(result => {
      res.json(result);
    });
};

export const returnFileMetaData = (req, res) => {
  res.json('hello');
};
