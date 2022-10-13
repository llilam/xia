"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "journey_datas",
            [
                {
                    d_stuid: 'CB18130241',
                    d_name: "宋文欢",
                    d_college: "计算机学院",
                    d_class: "18软件工程12班",
                    d_building: "A2",
                    d_build_num: 1212,
                    d_return_num: "G1536",
                    d_return_date: "2021/12/11",
                    d_start_area: "广东广州",
                    d_arrival_area: "广东东莞",
                    d_in_reach: "无",
                    pid: 1,
                },
                {
                    d_stuid: 'CB18130242',
                    d_name: "文欢",
                    d_college: "计算机学院",
                    d_class: "18软件工程12班",
                    d_building: "A2",
                    d_build_num: 1212,
                    d_return_num: "G1536",
                    d_return_date: "2021/12/11",
                    d_start_area: "广东广州",
                    d_arrival_area: "广东东莞",
                    d_in_reach: "无",
                    pid: 2,
                },
                {
                    d_stuid: 'CB18130243',
                    d_name: "啊欢",
                    d_college: "计算机学院",
                    d_class: "18软件工程12班",
                    d_building: "A2",
                    d_build_num: 1212,
                    d_return_num: "G1536",
                    d_return_date: "2021/12/11",
                    d_start_area: "广东广州",
                    d_arrival_area: "广东东莞",
                    d_in_reach: "无",
                    pid: 3,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("journey_datas", null, {});
    },
};
