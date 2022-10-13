'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personal_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      i_stuid: {
        type: Sequelize.STRING
      },
      i_name: {
        type: Sequelize.STRING
      },
      i_gender: {
        type: Sequelize.INTEGER
      },
      i_birth: {
        type: Sequelize.DATE
      },
      i_nation: {
        type: Sequelize.STRING
      },
      i_university: {
        type: Sequelize.STRING
      },
      i_college: {
        type: Sequelize.STRING
      },
      i_class: {
        type: Sequelize.STRING
      },
      i_profession: {
        type: Sequelize.STRING
      },
      i_enter_time: {
        type: Sequelize.DATE
      },
      i_background: {
        type: Sequelize.STRING
      },
      rid: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personal_infos');
  }
};