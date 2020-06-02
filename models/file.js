'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    path: DataTypes.STRING
  }, {});
  File.associate = function (models) {

  };
  return File;
};