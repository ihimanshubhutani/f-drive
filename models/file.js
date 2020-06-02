'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    path: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,

  }, {
    timestamps: false,
  });
  File.associate = function (models) {

  };
  return File;
};