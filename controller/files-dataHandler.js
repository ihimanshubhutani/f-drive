const db = require('../models');

/**
 * Saves file path into filePaths database.
 * @param   {string}  path 
 * @param   {intgeer} userId
 * @returns {void} 
 */
const saveFilePath = (path, userId, createdAt, type) => db.File.create({
  path,
  userId,
  createdAt,
  type
});

/**
 * Deletes file path from filePaths database.
 * @param {string} path 
 */
const deleteFilePath = path => db.File.destroy({
  where: {
    path
  }

});

/**
 * Verifies fileId (or token) against userId , i.e. if particular file is available to its user or not
 * @param   {string} userId
 * @param   {string} fileId 
 * @returns {promise}
 */
const verifyUserWithFile = (userId, fileId) => new Promise(resolve => db.File.findOne({
  where: {
    userId,
    path: `./public/${userId}/${fileId}`
  }
}).then(result => {
  console.log(result);
  resolve(result);
}));

/**
 * Show all files for particular userId
 * @param {string} userId 
 * @param {string} res 
 */
const showUserFiles = (userId) =>
  db.File.findAll({
    raw: true,
    where: {
      userId,
    }
  }).catch((err) => {
    console.log(err);
  });;


module.exports = { saveFilePath, deleteFilePath, verifyUserWithFile, showUserFiles };
