
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    path: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  File.associate = () => {

  };
  return File;
};
