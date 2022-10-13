'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('highrick_manages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      m_stuid: {
        type: Sequelize.STRING
      },
      m_name: {
        type: Sequelize.STRING
      },
      m_gender: {
        type: Sequelize.INTEGER
      },
      m_college: {
        type: Sequelize.STRING
      },
      m_class: {
        type: Sequelize.STRING
      },
      m_building: {
        type: Sequelize.STRING
      },
      m_building_num: {
        type: Sequelize.INTEGER
      },
      m_recent_place: {
        type: Sequelize.STRING
      },
      m_recent_history: {
        type: Sequelize.STRING
      },
      m_health_status: {
        type: Sequelize.STRING
      },
      aid:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('highrick_manages');
  }
};