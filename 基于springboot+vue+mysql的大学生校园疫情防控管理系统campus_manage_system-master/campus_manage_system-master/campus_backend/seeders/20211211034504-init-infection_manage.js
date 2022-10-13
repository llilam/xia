"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "infection_manages",
            [
                {
                    m_stuid:'CB18130241',
                    m_name:'宋文欢',
                    m_gender:0,
                    m_college:'计算机学院',
                    m_class:'18软件工程12班',
                    m_building:'A2',
                    m_build_num:1212,
                    m_inject_source:'饭堂',
                    m_inject_date:'2021/12/11'
                },
                {
                    m_stuid:'CB18130242',
                    m_name:'文欢',
                    m_gender:0,
                    m_college:'计算机学院',
                    m_class:'18软件工程12班',
                    m_building:'A2',
                    m_build_num:1212,
                    m_inject_source:'饭堂',
                    m_inject_date:'2021/12/11'
                },
                {
                    m_stuid:'CB18130243',
                    m_name:'啊欢',
                    m_gender:0,
                    m_college:'计算机学院',
                    m_class:'18软件工程12班',
                    m_building:'A2',
                    m_build_num:1212,
                    m_inject_source:'饭堂',
                    m_inject_date:'2021/12/11'
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("infection_manages", null, {});
    },
};
