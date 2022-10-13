"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "domestic_notices",
            [
                {
                    n_title: "国内疫情消息标题1",
                    n_date: "2021/12/11",
                    pid: 3,
                },
                {
                    n_title: "国内疫情消息标题2",
                    n_date: "2021/12/11",
                    pid: 3,
                },
                {
                    n_title: "国内疫情消息标题3",
                    n_date: "2021/12/11",
                    pid: 3,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("domestic_notices", null, {});
    },
};
