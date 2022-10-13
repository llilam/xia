"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "health_messages",
            [
                {
                    m_stuid: "CB18130241",
                    m_name: "宋文欢",
                    m_college: "计算机学院",
                    m_class: "18软件工程12班",
                    m_recent_resi: "广州",
                    m_recent_touch: "饭堂",
                    m_touch_date: "2021/12/11",
                    m_health_status: "完美",
                    m_status_des: "无",
                    pid: 1,
                },
                {
                    m_stuid: "CB18130242",
                    m_name: "文欢",
                    m_college: "计算机学院",
                    m_class: "18软件工程12班",
                    m_recent_resi: "广州",
                    m_recent_touch: "饭堂",
                    m_touch_date: "2021/12/11",
                    m_health_status: "完美",
                    m_status_des: "无",
                    pid: 2,
                },
                {
                    m_stuid: "CB18130243",
                    m_name: "啊欢",
                    m_college: "计算机学院",
                    m_class: "18软件工程12班",
                    m_recent_resi: "广州",
                    m_recent_touch: "饭堂",
                    m_touch_date: "2021/12/11",
                    m_health_status: "完美",
                    m_status_des: "无",
                    pid: 3,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("health_messages", null, {});
    },
};
