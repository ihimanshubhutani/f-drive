
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EmailConfirmationCodes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    email: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    expires: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  }, { attributes: { exclude: ['id'] } }),
  down: (queryInterface) => queryInterface.dropTable('EmailConfirmationCodes'),
};
