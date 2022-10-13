"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "roles",
            [
                {
                    r_account: "17020098719",
                    r_pwd: "123456",
                    r_serial: "CB18130241",
                    r_name: "文欢",
                    r_role: 1,
                },
                {
                    r_account: "17020098720",
                    r_pwd: "123456",
                    r_serial: "CB18130242",
                    r_name: "啊欢",
                    r_role: 2,
                },
                {
                    r_account: "17020098721",
                    r_pwd: "123456",
                    r_serial: "CB18130243",
                    r_name: "宋文欢",
                    r_role: 3,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("roles", null, {});
    },
};
