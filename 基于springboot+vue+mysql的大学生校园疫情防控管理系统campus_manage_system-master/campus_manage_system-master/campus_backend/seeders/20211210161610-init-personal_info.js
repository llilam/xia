"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "personal_infos",
            [
                {
                    i_stuid: "CB18130241",
                    i_name: "宋文欢",
                    i_gender: 0,
                    i_birth: "1999/03/17",
                    i_nation: "汉族",
                    i_university: "广东科技学院",
                    i_college: "计算机学院",
                    i_class: "18软件工程12班",
                    i_profession: "软件工程",
                    i_enter_time: "1999/03/17",
                    i_background: "本科",
                    rid: 3,
                },
                {
                    i_stuid: "CB18130242",
                    i_name: "文欢",
                    i_gender: 0,
                    i_birth: "1999/03/17",
                    i_nation: "汉族",
                    i_university: "广东科技学院",
                    i_college: "计算机学院",
                    i_class: "18软件工程12班",
                    i_profession: "软件工程",
                    i_enter_time: "1999/03/17",
                    i_background: "本科",
                    rid: 2,
                },
                {
                    i_stuid: "CB18130243",
                    i_name: "啊欢",
                    i_gender: 0,
                    i_birth: "1999/03/17",
                    i_nation: "汉族",
                    i_university: "广东科技学院",
                    i_college: "计算机学院",
                    i_class: "18软件工程12班",
                    i_profession: "软件工程",
                    i_enter_time: "1999/03/17",
                    i_background: "本科",
                    rid: 1,
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("personal_infos", null, {});
    },
};
