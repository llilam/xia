"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class roles extends Model {
        static associate(models) {
            // 角色对应自己的个人信息(个人信息的rid)
            models.roles.hasOne(models.personal_infos, { foreignKey: "rid" });
            models.roles.hasOne(models.authors, { foreignKey: "aid" });
            models.roles.hasMany(models.highrick_manages, {
                foreignKey: "aid",
            });
            models.roles.hasMany(models.infection_manages, {
                foreignKey: "aid",
            });
            models.roles.hasMany(models.lowrick_manages, { foreignKey: "aid" });
            models.roles.hasMany(models.close_manages, { foreignKey: "aid" });
        }
    }
    roles.init(
        {
            r_account: DataTypes.STRING,
            r_pwd: DataTypes.STRING,
            r_serial: DataTypes.STRING,
            r_name: DataTypes.STRING,
            r_role: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "roles",
            timestamps: false,
        }
    );
    return roles;
};
