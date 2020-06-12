
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    scope: DataTypes.ARRAY(DataTypes.TEXT),
    expires: DataTypes.DATE,
  }, { timestamps: false });
  Token.associate = () => {
    // associations can be defined here
  };
  return Token;
};