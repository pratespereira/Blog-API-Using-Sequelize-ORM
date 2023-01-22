'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CategoriesTable = await queryInterface.createTable('categories', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
  });
  return CategoriesTable;    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};