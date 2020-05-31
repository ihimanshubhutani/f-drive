'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('File_DBs', 'user_username', {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'username'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('File_DBs', 'user_username')
  }
};
