"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "health_infoers",
            [
                {
                    i_name: "宋文欢",
                    i_idcard: "440802200003171214",
                    i_phone: 17020098719,
                    i_gender: 1,
                    i_birth: "2021/12/11",
                    i_nationality: "中国大陆",
                    i_domicile: "广东湛江",
                    i_native: "广东",
                    i_address: "广东省广州市天河区伟城广场",
                    pid: 1,
                },
                {
                    i_name: "文欢",
                    i_idcard: "440802200003171214",
                    i_phone: 17020098719,
                    i_gender: 1,
                    i_birth: "2021/12/11",
                    i_nationality: "中国大陆",
                    i_domicile: "广东湛江",
                    i_native: "广东",
                    i_address: "广东省广州市天河区伟城广场",
                    pid: 2,
                },
                {
                    i_name: "啊欢",
                    i_idcard: "440802200003171214",
                    i_phone: 17020098719,
                    i_gender: 1,
                    i_birth: "2021/12/11",
                    i_nationality: "中国大陆",
                    i_domicile: "广东湛江",
                    i_native: "广东",
                    i_address: "广东省广州市天河区伟城广场",
                    pid: 3,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("health_infoers", null, {});
    },
};
