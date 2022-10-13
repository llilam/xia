"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "journals",
            [
                {
                    j_id: "CB18130241",
                    j_name: "宋文欢",
                    j_role: 1,
                    j_browser: "chrome",
                    j_ip: "255.255.255.255",
                    j_login_time: new Date(),
                    j_login_status: "登录成功",
                },
                {
                    j_id: "CB18130242",
                    j_name: "文欢",
                    j_role: 2,
                    j_browser: "chrome",
                    j_ip: "255.255.255.255",
                    j_login_time: new Date(),
                    j_login_status: "登录成功",
                },
                {
                    j_id: "CB18130243",
                    j_name: "啊欢",
                    j_role: 3,
                    j_browser: "chrome",
                    j_ip: "255.255.255.255",
                    j_login_time: new Date(),
                    j_login_status: "登录成功",
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("journals", null, {});
    },
};
