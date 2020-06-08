const db = require('../models');

/**
 * Saves file path into filePaths database.
 * @param   {string}  path
 * @param   {intgeer} userId
 * @returns {void}
 */
const saveFilePath = (path, name, userId, createdAt, type) => db.File.create({
  path,
  userId,
  createdAt,
  type,
  name,
});

/**
 * Deletes file path from filePaths database.
 * @param   {string} id
 * @returns {Promise}
 */
const deleteFilePath = id => db.File.destroy({
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
const verifyUserWithFile = (userId, id) => db.File.findOne({
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
const showUserFiles = (userId) => db.File.findAll({
  raw: true,
  where: {
    userId,
  },
}).catch((err) => {
  console.log(err);
});

module.exports = {
  saveFilePath, deleteFilePath, verifyUserWithFile, showUserFiles,
};
