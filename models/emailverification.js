'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailVerification = sequelize.define('EmailVerification', {
    email: DataTypes.STRING,
    verificationcode: DataTypes.STRING
  }, {});
  EmailVerification.associate = function(models) {
    // associations can be defined here
  };
  return EmailVerification;
};