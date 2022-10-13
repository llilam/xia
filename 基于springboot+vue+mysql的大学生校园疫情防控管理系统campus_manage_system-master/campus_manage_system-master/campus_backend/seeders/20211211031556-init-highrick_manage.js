"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "highrick_manages",
            [
                {
                    m_stuid:'CB18130241',
                    m_name:'宋文欢',
                    m_gender:0,
                    m_college:'计算机学院',
                    m_class:'18软件工程12班',
                    m_building:'A2',
                    m_building_num:1212,
                    m_recent_place:'东莞',
                    m_recent_history:'饭堂',
                    m_health_status:'完美'
                },
                {
                    m_stuid:'CB18130242',
                    m_name:'文欢',
                    m_gender:0,
                    m_college:'计算机学院',
                    m_class:'18软件工程12班',
                    m_building:'A2',
                    m_building_num:1212,
                    m_recent_place:'东莞',
                    m_recent_history:'饭堂',
                    m_health_status:'完美'
                },
                {
                    m_stuid:'CB18130243',
                    m_name:'阿欢',
                    m_gender:0,
                    m_college:'计算机学院',
                    m_class:'18软件工程12班',
                    m_building:'A2',
                    m_building_num:1212,
                    m_recent_place:'东莞',
                    m_recent_history:'饭堂',
                    m_health_status:'完美'
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("highrick_manages", null, {});
    },
};
