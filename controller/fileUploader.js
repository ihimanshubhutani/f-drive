const { saveFilePath } = require('../controller/files-dataHandler');

/**
 * Uploads file on the server
 */
module.exports = (file, filename, userId, type, creationTime) => {

  file.mv(`./public/${userId}/${creationTime}||${filename}`, function (err) {
    if (err)
      return false;
  });
  const filePath = `./public/${userId}/${creationTime}||${filename}`
  return saveFilePath(filePath, userId, creationTime, type);
};
