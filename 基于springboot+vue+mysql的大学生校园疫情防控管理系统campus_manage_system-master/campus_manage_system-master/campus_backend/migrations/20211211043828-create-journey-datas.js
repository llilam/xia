'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('journey_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      d_stuid: {
        type: Sequelize.STRING
      },
      d_name: {
        type: Sequelize.STRING
      },
      d_college: {
        type: Sequelize.STRING
      },
      d_class: {
        type: Sequelize.STRING
      },
      d_building: {
        type: Sequelize.STRING
      },
      d_build_num: {
        type: Sequelize.INTEGER
      },
      d_return_num: {
        type: Sequelize.STRING
      },
      d_return_date: {
        type: Sequelize.DATE
      },
      d_start_area: {
        type: Sequelize.STRING
      },
      d_arrival_area: {
        type: Sequelize.STRING
      },
      d_in_reach: {
        type: Sequelize.STRING
      },
      pid: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('journey_datas');
  }
};