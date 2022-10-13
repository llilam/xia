"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "health_records",
            [
                {
                    r_stuid: 'CB18130241',
                    r_name: '宋文欢',
                    r_vaccine: "新型冠状病毒灭活疫苗",
                    r_inject: 2,
                    r_num: 20211211,
                    r_manufacturer: "北京生物",
                    r_vac_unit: "东莞松山湖社区卫生服务中心预防接种门诊",
                    r_vac_date: "2021/11/28",
                    pid: 1,
                },
                {
                    r_stuid: 'CB18130242',
                    r_name: '文欢',
                    r_vaccine: "新型冠状病毒灭活疫苗",
                    r_inject: 2,
                    r_num: 20211211,
                    r_manufacturer: "广州生物",
                    r_vac_unit: "东莞松山湖社区卫生服务中心预防接种门诊",
                    r_vac_date: "2021/11/28",
                    pid: 2,
                },
                {
                    r_stuid: 'CB18130243',
                    r_name: '啊欢',
                    r_vaccine: "新型冠状病毒灭活疫苗",
                    r_inject: 2,
                    r_num: 20211211,
                    r_manufacturer: "深圳生物",
                    r_vac_unit: "东莞松山湖社区卫生服务中心预防接种门诊",
                    r_vac_date: "2021/11/28",
                    pid: 3,
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("health_records", null, {});
    },
};
