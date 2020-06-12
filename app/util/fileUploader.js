import { saveFilePath } from '../services/file/filesDataHandler';

/**
 * Uploads file on server
 * @param   {string} file
 * @param   {string} filename
 * @param   {string} userId
 * @param   {string} type
 * @param   {Date}   creationTime
 * @returns {Boolean}
 */
export default (file, filename, userId, type, creationTime) => {
  file.mv(`./public/${userId}/${creationTime}*${filename}`, (err) => {
    if (err) console.log(err);
  });
  const filePath = `./public/${userId}/${creationTime}*${filename}`;
  return saveFilePath(filePath, filename, userId, creationTime, type);
};
