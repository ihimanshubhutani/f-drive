
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      clientSecret: DataTypes.STRING,
      username: DataTypes.STRING,
      redirectUri: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  Client.associate = (models) => {
    Client.hasMany(models.AuthorizationCode, { foreignKey: 'clientId' });
  };
  return Client;
};
