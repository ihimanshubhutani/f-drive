
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      clientSecret: DataTypes.STRING,
      username: DataTypes.STRING,
      redirectUri: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  Client.associate = (models) => {
    Client.hasMany(models.AuthorizationCode, { foreignKey: 'userId' });
  };
  return Client;
};
