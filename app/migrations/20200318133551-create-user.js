module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verifiedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },

  }, {
    // attributes: { exclude: ['id']  }
  }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
