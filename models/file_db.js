'use strict';
module.exports = (sequelize, DataTypes) => {
  const File_DB = sequelize.define('File_DB', {
    path: DataTypes.STRING
  }, {});
  File_DB.associate = function (models) {

  };
  return File_DB;
};