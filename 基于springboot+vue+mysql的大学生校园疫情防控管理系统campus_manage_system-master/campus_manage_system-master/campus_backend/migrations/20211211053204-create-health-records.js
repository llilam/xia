'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('health_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      r_stuid: {
        type: Sequelize.STRING
      },
      r_name: {
        type: Sequelize.STRING
      },
      r_vaccine: {
        type: Sequelize.STRING
      },
      r_inject: {
        type: Sequelize.INTEGER
      },
      r_num: {
        type: Sequelize.INTEGER
      },
      r_manufacturer: {
        type: Sequelize.STRING
      },
      r_vac_unit: {
        type: Sequelize.STRING
      },
      r_vac_date: {
        type: Sequelize.DATE
      },
      pid: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('health_records');
  }
};