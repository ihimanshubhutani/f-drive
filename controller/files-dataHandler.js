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
    filePath: path
  }

});

/**
 * Verifies fileId (or token) against userId , i.e. if particular file is available to its user or not
 * @param   {string} userId
 * @param   {string} fileId 
 * @returns {promise}
 */
const verifyUserWithFile = (userId, fileId) => new Promise(resolve => filePaths.findOne({
  where: {
    userId: int(userId),
    filePath: `./public/${fileId}`
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
const showUserFiles = (userId, res) => {
  db.File.findAll({
    raw: true,
    attributes: { exclude: ['createdAt'] },
    where: {
      userId: int(userId)
    }
  }).then((result) => {
    console.log(result);
    if (!result[0]) {
      return res.send({ message: "No files present with this userId" });
    }
    res.send(result);
  }).catch((err) => {
    res.send({ err });
  });;
}

module.exports = { saveFilePath, deleteFilePath, verifyUserWithFile, showUserFiles };
