"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("roles", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            r_account: {
                type: Sequelize.STRING,
            },
            r_pwd: {
                type: Sequelize.STRING,
            },
            r_serial: {
                type: Sequelize.STRING,
            },
            r_name: {
                type: Sequelize.STRING,
            },
            r_role: {
                type: Sequelize.INTEGER,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("roles");
    },
};
