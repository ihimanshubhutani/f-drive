
module.exports = (sequelize, DataTypes) => {
  const AuthorizationCode = sequelize.define('AuthorizationCode', {
    code: DataTypes.STRING,
    scope: DataTypes.ARRAY(DataTypes.TEXT),
    expires: DataTypes.DATE,
    accessType: DataTypes.STRING,
  }, { timestamps: false });
  AuthorizationCode.associate = (models) => {
    AuthorizationCode.belongsTo(models.Client, { foreignKey: 'clientId' });
  };
  return AuthorizationCode;
};
