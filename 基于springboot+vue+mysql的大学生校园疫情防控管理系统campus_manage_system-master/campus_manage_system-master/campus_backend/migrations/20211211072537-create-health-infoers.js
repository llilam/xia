'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('health_infoers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      i_name: {
        type: Sequelize.STRING
      },
      i_idcard: {
        type: Sequelize.STRING
      },
      i_phone: {
        type: Sequelize.INTEGER
      },
      i_gender: {
        type: Sequelize.INTEGER
      },
      i_birth: {
        type: Sequelize.DATE
      },
      i_nationality: {
        type: Sequelize.STRING
      },
      i_domicile: {
        type: Sequelize.STRING
      },
      i_native: {
        type: Sequelize.STRING
      },
      i_address: {
        type: Sequelize.STRING
      },
      pid:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('health_infoers');
  }
};