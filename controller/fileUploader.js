const { saveFilePath } = require('../controller/files-dataHandler');

/**
 * Uploads file on server 
 * @param   {string} file
 * @param   {string} filename
 * @param   {string} userId
 * @param   {string} type
 * @param   {Date}   creationTime
 * @returns {Boolean}
 */
module.exports = (file, filename, userId, type, creationTime) => {

  file.mv(`./public/${userId}/${creationTime}.${filename}`, function (err) {
    if (err)
      return false;
  });
  const filePath = `./public/${userId}/${creationTime}.${filename}`
  return saveFilePath(filePath, userId, creationTime, type);
};
