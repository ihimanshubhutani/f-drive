import { File } from '../../models';

/**
 * Saves file path into filePaths database.
 * @param   {string}  path
 * @param   {intgeer} userId
 * @returns {void}
 */
const saveFilePath = (path, name, userId, createdAt, type) => File.create({
  path,
  name,
  userId,
  createdAt,
  type,
});

/**
 * Deletes file path from filePaths database.
 * @param   {string} id
 * @returns {Promise}
 */
const deleteFilePath = id => File.destroy({
  where: {
    id,
  },

});

/**
 * Verifies file is accessible to {userId}
 * @param   {string} userId
 * @param   {string} id
 * @returns {Promise}
 */
const verifyUserWithFile = (userId, id) => File.findOne({
  where: {
    userId,
    id,
  },
});

/**
 * Show all files for particular userId
 * @param  {string} userId
 * @return {Promise}
 */
const showUserFiles = (userId, excludeItems) => File.findAll({
  raw: true,
  attributes: {
    exclude: excludeItems,
  },
  where: {
    userId,
  },
}).catch((err) => {
  console.log(err);
});

export const showFileMetaData = (id, excludeItems) => File.findOne({
  attributes: {
    exclude: excludeItems,
  },
  where: {
    id,
  },
});

export {
  saveFilePath, deleteFilePath, verifyUserWithFile, showUserFiles,
};
