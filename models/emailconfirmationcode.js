'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailConfirmationCode = sequelize.define('EmailConfirmationCode', {
    email: DataTypes.STRING,
    code: DataTypes.STRING,

  }, {});
  EmailConfirmationCode.associate = function (models) {
    // associations can be defined here
  };
  return EmailConfirmationCode;
};