const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const uploadFile = require('../controller/fileUploader');
const { deleteFilePath, showUserFiles } = require('../controller/files-dataHandler');
const authenticate = require('../middleware/authenticate.js');
const checkAccessAllowed = require('../middleware/checkAccesPrivilages');

const routes = express.Router();

/**
 * Authenticates user, if its session is already availabe or not.
 */
routes.use(authenticate);

routes.get('/', (req, res) => {
  showUserFiles(req.session.username, res);
});

routes.get('/upload', (req, res) => {
  res.sendFile('upload.html', { root: path.join(__dirname, '../views/') })
});

routes.get('/download/:id', checkAccessAllowed, (req, res) => {
  console.log('download');
  res.download(`./public/${req.params.id}`);
});

routes.post('/upload', function (req, res) {
  if (!req.files) {
    return res.status(400).send({ message: 'No files were uploaded' });
  }

  const file = req.files.uploadedFile;
  const filename = `${uuid.v4()}${path.extname(file.name)}`;

  uploadFile(req, res, file, filename);
});

routes.get('/update', (req, res) => {
  res.sendFile('update.html', { root: path.join(__dirname, '../views/') });
});

/**
 * HTML forms not allows to set mehthod = PUT,
 * Directly updates from browser side.
 */
routes.post('/update', (req, res) => {
  console.log(req.files);
  uploadFile(req, res, req.files.updatedFile, req.body.filename);
});

/**
 * HTML forms not allows to set mehthod = DELETE
 * Directly deletes from browser side.
 */
routes.get('/delete/:id', checkAccessAllowed, (req, res) => {

  try {
    fs.unlinkSync(`./public/${req.params.id}`);
    res.send({ message: "Removed Succesfully" });
    deleteFilePath(`./public/${req.params.id}`);

  } catch (err) {
    res.status(404).send({ message: "File Cannot be deleted", err })
  }
});

module.exports = routes;
