'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('campus_notices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      n_title: {
        type: Sequelize.STRING
      },
      n_content: {
        type: Sequelize.STRING
      },
      n_date: {
        type: Sequelize.DATE
      },
      pid: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('campus_notices');
  }
};