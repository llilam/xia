"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "authors",
            [
                {
                    a_name:'啊欢',
                    a_phone: 17020098719,
                    a_email: "1677214021@qq.com",
                    a_start_time: "2021/12/11 10:00:00",
                    a_end_time: "2021/12/11 22:00:00",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("authors", null, {});
    },
};
