
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      verifiedAt: DataTypes.DATE,
      email: DataTypes.STRING,
    },
    {
      // attributes: { exclude: ['id'] },
      timestamps: false,
    },
  );

  // eslint-disable-next-line func-names
  User.associate = function (models) {
    User.hasMany(models.File, {
      foreignKey: 'userId',
    });
    User.hasMany(models.EmailConfirmationCode, { foreignKey: 'userId' });
    User.hasMany(models.Token, { foreignKey: 'userId' });
    User.hasMany(models.AuthorizationCode, { foreignKey: 'userId' });
  };
  return User;
};
