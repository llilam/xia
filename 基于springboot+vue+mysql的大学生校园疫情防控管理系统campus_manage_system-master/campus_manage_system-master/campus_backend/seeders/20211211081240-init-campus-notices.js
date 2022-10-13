"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "campus_notices",
            [
                {
                    n_title: "校内疫情消息标题1",
                    n_content: '校内疫情消息1',
                    n_date: "2021/12/11",
                    pid: 3,
                },
                {
                    n_title: "校内疫情消息标题2",
                    n_content: '校内疫情消息2',
                    n_date: "2021/12/11",
                    pid: 3,
                },
                {
                    n_title: "校内疫情消息标题3",
                    n_content: '校内疫情消息3',
                    n_date: "2021/12/11",
                    pid: 3,
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("campus_notices", null, {});
    },
};
