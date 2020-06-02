'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    verifiedAt: DataTypes.DATE,
    email: DataTypes.STRING,

  }, {
    // attributes: { exclude: ['id'] },
    timestamps: false
  });

  User.associate = function (models) {
    User.hasMany(models.Files, {
      foreignKey: 'userId'
    });
    User.belongsTo(models.EmailConfirmationCodes, { foreignKey: 'userId' })
  };
  return User;
};