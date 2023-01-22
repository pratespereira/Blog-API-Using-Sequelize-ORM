'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    const UsersTable = await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
     return UsersTable;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');     
  }
};