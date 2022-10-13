"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("journals", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            j_stuid: {
                type: Sequelize.STRING,
            },
            j_name: {
                type: Sequelize.STRING,
            },
            j_role: {
                type: Sequelize.INTEGER,
            },
            j_browser: {
                type: Sequelize.STRING,
            },
            j_ip: {
                type: Sequelize.STRING,
            },
            j_ipname: {
                type: Sequelize.STRING,
            },
            j_date: {
                type: Sequelize.STRING,
            },
            j_status: {
                type: Sequelize.STRING,
            },
            pid: {
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("journals");
    },
};
