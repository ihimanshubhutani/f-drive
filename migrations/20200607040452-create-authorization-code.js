
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AuthorizationCodes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    authCode: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    expires: {
      type: Sequelize.DATE,
    },
    scope: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },

  }),
  down: (queryInterface) => queryInterface.dropTable('AuthorizationCodes'),
};
