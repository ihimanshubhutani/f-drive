const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('config');

const authenticate = require('../middleware/authenticateSession.js');
const checkAccessAllowed = require('../middleware/checkAccesPrivilages');
const uploadFile = require('../controller/fileUploader');

const {
  deleteFilePath,
  showUserFiles,
} = require('../controller/filesDataHandler');

const routes = express.Router();

/**
 * Authenticates user, if its session is already availabe or not.
 */
routes.use(authenticate);

routes.get('/', (req, res, next) => {
  showUserFiles(req.session.userId, res)
    .then(result => {
      const data = JSON.stringify({ arr: result });
      res.render(path.join(__dirname, '../views/viewFiles'), { data });
    })
    .catch(err => next(err));
});

routes.get('/upload', (req, res) => {
  res.sendFile('upload.html', { root: path.join(__dirname, '../views/') });
});

routes.get('/:id', checkAccessAllowed, (req, res) => {
  res.download(req.filepath, req.filepath.split('*')[1]);
});

routes.post('/', (req, res) => {
  if (!req.files) { res.status(400); throw new Error(config.MESSAGE.NO_FILE_UPLOADED); }

  const file = req.files.uploadedFile;

  if (uploadFile(file, file.name, req.session.userId, path.extname(file.name), Date.now())) {
    return res.status(201).send({
      message: config.MESSAGE.FILE_UPLOADED_SUCCESS,
    });
  }

  throw new Error(config.MESSAGE.INTERNAL_SERVER_ERROR);
});


routes.delete('/:id', checkAccessAllowed, (req, res, next) => {
  deleteFilePath(req.params.id).then((result) => {
    if (!result) throw new Error(config.MESSAGE.INTERNAL_SERVER_ERROR);

    fs.unlinkSync(req.filepath);
    res.json({ message: config.MESSAGE.REMOVED_SUCCESSFULLY });
  }).catch(err => next(err));
});


module.exports = routes;
