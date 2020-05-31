'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING

  }, {
    attributes: { exclude: ['id'] },
    timestamps: false
  });

  User.associate = function (models) {
    User.hasMany(models.File_DB, {
      foreignKey: 'user_username'
    });
  };
  return User;
};