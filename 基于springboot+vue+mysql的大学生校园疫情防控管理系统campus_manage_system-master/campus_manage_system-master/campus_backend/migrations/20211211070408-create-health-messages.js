'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('health_messages', {
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
      m_college: {
        type: Sequelize.STRING
      },
      m_class: {
        type: Sequelize.STRING
      },
      m_recent_resi: {
        type: Sequelize.STRING
      },
      m_recent_touch: {
        type: Sequelize.STRING
      },
      m_touch_date: {
        type: Sequelize.DATE
      },
      m_health_status: {
        type: Sequelize.STRING
      },
      m_status_des: {
        type: Sequelize.STRING
      },
      pid: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('health_messages');
  }
};