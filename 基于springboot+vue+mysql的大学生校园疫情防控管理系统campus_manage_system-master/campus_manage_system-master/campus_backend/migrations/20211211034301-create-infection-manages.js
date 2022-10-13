'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('infection_manages', {
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
      m_build_num: {
        type: Sequelize.INTEGER
      },
      m_inject_source: {
        type: Sequelize.STRING
      },
      m_inject_date: {
        type: Sequelize.DATE
      },
      aid:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('infection_manages');
  }
};