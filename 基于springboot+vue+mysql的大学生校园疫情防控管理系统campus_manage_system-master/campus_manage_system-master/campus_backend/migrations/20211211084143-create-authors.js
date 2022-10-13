"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("authors", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            a_name: {
                type: Sequelize.STRING,
            },
            a_phone: {
                type: Sequelize.STRING,
            },
            a_email: {
                type: Sequelize.STRING,
            },
            a_start_time: {
                type: Sequelize.DATE,
            },
            a_end_time: {
                type: Sequelize.DATE,
            },
            aid: {
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("authors");
    },
};
