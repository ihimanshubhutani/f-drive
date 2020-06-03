'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailConfirmationCode = sequelize.define('EmailConfirmationCode', {
    email: DataTypes.STRING,
    code: DataTypes.STRING,
    expires: DataTypes.STRING,


  }, {
    attributes: { exclude: ['id'] },
    timestamps: false
  });
  EmailConfirmationCode.associate = function (models) {
    //EmailConfirmationCode.belongsTo(models.User);
  };
  return EmailConfirmationCode;
};