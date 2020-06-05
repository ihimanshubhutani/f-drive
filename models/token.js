'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    scope: DataTypes.ARRAY,
    expires: DataTypes.DATE
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
  };
  return Token;
};