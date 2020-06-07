
module.exports = (sequelize, DataTypes) => {
  const AuthorizationCode = sequelize.define('AuthorizationCode', {
    authCode: DataTypes.STRING,
    scope: DataTypes.ARRAY(DataTypes.TEXT),
    expires: DataTypes.DATE,
  }, { timestamps: false });
  AuthorizationCode.associate = () => {
    // associations can be defined here
  };
  return AuthorizationCode;
};