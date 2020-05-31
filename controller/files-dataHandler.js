const db = require('../models');

/**
 * Saves file path into filePaths database.
 * @param   {string} path 
 * @param   {string} username
 * @returns {void} 
 */
const saveFilePath = (path, username) => db.File_DB.create({
  path,
  user_username: username
});

/**
 * Deletes file path from filePaths database.
 * @param {*} path 
 */
const deleteFilePath = path => db.File_DB.destroy({
  where: {
    filePath: path
  }
});

/**
 * Verifies fileId (or token) against username , i.e. if particular file is available to its user or not
 * @param   {string} username 
 * @param   {string} fileId 
 * @returns {promise}
 */
const verifyUserWithFile = (username, fileId) => new Promise(resolve => filePaths.findOne({
  where: {
    user_username: username,
    filePath: `./public/${fileId}`
  }
}).then(result => {
  console.log(result);
  resolve(result);
}));

/**
 * Show all files for particular username
 * @param {string} username 
 * @param {string} res 
 */
const showUserFiles = (username, res) => {
  db.File_DB.findAll({
    raw: true,
    attributes: { exclude: ['createdAt'] },
    where: {
      user_username: username
    }
  }).then((result) => {
    console.log(result);
    if (!result[0]) {
      return res.send({ message: "No files present with this username" });
    }
    res.send(result);
  }).catch((err) => {
    res.send({ err });
  });;
}

module.exports = { saveFilePath, deleteFilePath, verifyUserWithFile, showUserFiles };
