const { saveFilePath } = require('../controller/files-dataHandler');

/**
 * Uploads file on the server
 */
module.exports = (req, res, file, filename) => {
  file.mv(`./public/${filename}`, function (err) {
    if (err)
      return res.status(500).send(err);

    saveFilePath(`./public/${filename}`, req.session.username);
    res.send(`Your FileId:<h3>${filename}</h3> 
    \n To access in future goto: http://localhost:3000/${filename}`);
  });
};
