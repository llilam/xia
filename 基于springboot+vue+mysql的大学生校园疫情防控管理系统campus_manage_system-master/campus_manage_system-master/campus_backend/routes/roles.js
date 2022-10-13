let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
let models = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let jwt = require("jsonwebtoken");
let { SECRET_KEY, EXPIRES_TIME } = require("../setting/constant.js");
const { response } = require("express");
// let Result = require("../utils/Result.js");

const secret = "wen_huan_shi_shuai_ge_ma";

// 测试
router.get("/", function (req, res, next) {
    res.send("role is ok...");
});

// 查询所有角色
router.get("/all_role", async (req, res) => {
    let role = await models.roles.findAll({
        include: [
            {
                model: models.personal_infos,
                attributes: [
                    "id",
                    "rid",
                    "i_stuid",
                    "i_name",
                    "i_gender",
                    "i_birth",
                    "i_nation",
                    "i_university",
                    "i_college",
                    "i_class",
                    "i_profession",
                    "i_enter_time",
                    "i_background",
                ],
                include: [
                    {
                        model: models.health_records,
                        attributes: [
                            "id",
                            "r_stuid",
                            "r_name",
                            "r_vaccine",
                            "r_inject",
                            "r_num",
                            "r_manufacturer",
                            "r_vac_unit",
                            "r_vac_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_messages,
                        attributes: [
                            "id",
                            "m_stuid",
                            "m_name",
                            "m_college",
                            "m_class",
                            "m_recent_resi",
                            "m_recent_touch",
                            "m_touch_date",
                            "m_health_status",
                            "m_status_des",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_infoers,
                        attributes: [
                            "id",
                            "i_name",
                            "i_idcard",
                            "i_phone",
                            "i_gender",
                            "i_birth",
                            "i_nationality",
                            "i_domicile",
                            "i_native",
                            "i_address",
                            "pid",
                        ],
                    },
                    {
                        model: models.journey_datas,
                        attributes: [
                            "id",
                            "d_stuid",
                            "d_name",
                            "d_college",
                            "d_class",
                            "d_building",
                            "d_build_num",
                            "d_return_num",
                            "d_return_date",
                            "d_start_area",
                            "d_arrival_area",
                            "d_in_reach",
                            "pid",
                        ],
                    },
                ],
            },
            {
                model: models.authors,
                attributes: [
                    "id",
                    "a_name",
                    "a_phone",
                    "a_email",
                    "a_start_time",
                    "a_end_time",
                    "aid",
                ],
                include: [
                    {
                        model: models.domestic_notices,
                        attributes: ["id", "n_title", "n_date", "pid"],
                    },
                    {
                        model: models.campus_notices,
                        attributes: [
                            "id",
                            "n_title",
                            "n_content",
                            "n_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.journals,
                        attributes: [
                            "id",
                            "j_stuid",
                            "j_name",
                            "j_role",
                            "j_browser",
                            "j_ip",
                            "j_ipname",
                            "j_date",
                            "j_status",
                            "pid"
                        ],
                    },
                ],
            },
            {
                model: models.close_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.highrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.lowrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.infection_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_build_num",
                    "m_inject_source",
                    "m_inject_date",
                    "aid",
                ],
            },
        ],
    });
    res.send(role);
});

// 根据姓名查询角色
router.get("/query_role", async (req, res) => {
    let role_data = await models.roles.findAll({
        where:{
            r_name:{
                [Op.like]: `%${ req.query.r_name}%`
            } 
        }
    });
    res.send(role_data);
});

// 角色注册
router.post("/reg_role", async (req, res) => {
    let isAccount = await models.roles.findOne({
        where: { r_account: req.body.r_account }
    });
    // 判断用户是否存在
    if (!isAccount) {
        // 盐密码加密
        bcrypt.hash(req.body.r_pwd, 10, async (err, hash) => {
            req.body.r_pwd = hash;
            let role = await models.roles.create(req.body);
            if (role) res.send(`${req.body.r_account}注册成功!`);
        });
    } else {
        return res.send(`${req.body.r_account}已存在!`);
    }
});

// 角色登录
router.post("/login_role", async (req, res) => {
    // 判断所登录角色与权限是否匹配
    let data = await models.roles.findOne({
        include: [
            {
                model: models.personal_infos,
                attributes: [
                    "id",
                    "rid",
                    "i_stuid",
                    "i_name",
                    "i_gender",
                    "i_birth",
                    "i_nation",
                    "i_university",
                    "i_college",
                    "i_class",
                    "i_profession",
                    "i_enter_time",
                    "i_background",
                ],
                include: [
                    {
                        model: models.health_records,
                        attributes: [
                            "id",
                            "r_stuid",
                            "r_name",
                            "r_vaccine",
                            "r_inject",
                            "r_num",
                            "r_manufacturer",
                            "r_vac_unit",
                            "r_vac_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_messages,
                        attributes: [
                            "id",
                            "m_stuid",
                            "m_name",
                            "m_college",
                            "m_class",
                            "m_recent_resi",
                            "m_recent_touch",
                            "m_touch_date",
                            "m_health_status",
                            "m_status_des",
                            "pid",
                        ],
                    },
                    {
                        model: models.health_infoers,
                        attributes: [
                            "id",
                            "i_name",
                            "i_idcard",
                            "i_phone",
                            "i_gender",
                            "i_birth",
                            "i_nationality",
                            "i_domicile",
                            "i_native",
                            "i_address",
                            "pid",
                        ],
                    },
                    {
                        model: models.journey_datas,
                        attributes: [
                            "id",
                            "d_stuid",
                            "d_name",
                            "d_college",
                            "d_class",
                            "d_building",
                            "d_build_num",
                            "d_return_num",
                            "d_return_date",
                            "d_start_area",
                            "d_arrival_area",
                            "d_in_reach",
                            "pid",
                        ],
                    },
                ],
            },
            {
                model: models.authors,
                attributes: [
                    "id",
                    "a_name",
                    "a_phone",
                    "a_email",
                    "a_start_time",
                    "a_end_time",
                    "aid",
                ],
                include: [
                    {
                        model: models.domestic_notices,
                        attributes: ["id", "n_title", "n_date", "pid"],
                    },
                    {
                        model: models.campus_notices,
                        attributes: [
                            "id",
                            "n_title",
                            "n_content",
                            "n_date",
                            "pid",
                        ],
                    },
                    {
                        model: models.journals,
                        attributes: [
                            "id",
                            "j_stuid",
                            "j_name",
                            "j_role",
                            "j_browser",
                            "j_ip",
                            "j_ipname",
                            "j_date",
                            "j_status",
                            "pid"
                        ],
                    },
                ],
            },
            {
                model: models.close_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.highrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.lowrick_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_building_num",
                    "m_recent_place",
                    "m_recent_history",
                    "m_health_status",
                    "aid",
                ],
            },
            {
                model: models.infection_manages,
                attributes: [
                    "id",
                    "m_stuid",
                    "m_name",
                    "m_gender",
                    "m_college",
                    "m_class",
                    "m_building",
                    "m_build_num",
                    "m_inject_source",
                    "m_inject_date",
                    "aid",
                ],
            },
        ],
        where: {
            r_account: req.body.r_account,
            r_role: req.body.r_role,
        },
    });
    if (!data) {
        return res.send(`${req.body.r_account}不存在或信息错误, 请检查或注册!`);
    } else {
        // 盐解密
        if (!bcrypt.compareSync(req.body.r_pwd, data.r_pwd)) {
            res.send("密码错误, 请重新登录");
        } else {
            // 安全：利用jwt对token数据进行加密再返回
            const { id, r_account } = data;
            // 加密对象、加密规则、过期时间
            const token = jwt.sign({ id, r_account }, secret, {
                expiresIn: "24h",
            });
            res.send({
                data,
                token,
            });
        }
    }
});

// 角色修改
router.put("/update_role", async (req, res) => {
    console.log('我接收一下数据：',req.body);
    let jourey = await models.roles.findOne({
        where: { r_account: req.body.r_account },
    });
    console.log('查询一下数据：',jourey);
    if(jourey){
        try{
            console.log('我是姓名：',req.body.r_name);
            console.log('我是角色：',req.body.r_role);
            console.log('我是账号：',req.body.r_account);
            let update_role = await models.roles.update(
                {
                    // 注意修改密码的话需要重新加密, 否则登录时解密拿不到
                    r_name: req.body.r_name,
                    r_role: req.body.r_role,
                },
                {
                    where: { r_account: req.body.r_account },
                }
            );
            console.log('最终执行结果：',update_role);
            if (update_role) return res.send(`${req.body.r_account}修改成功!`);
        }catch(e){
            res.send(e);
        }
    }
});

// 角色添加
router.post("/insert_role", async (req, res) => {
    console.log(req.body);
    let isAccount = await models.roles.findOne({
        where: { r_account: req.body.r_account },
    });
    // 判断用户是否存在
    if (!isAccount) {
        // 盐密码加密
        bcrypt.hash(req.body.r_pwd, 10, async (err, hash) => {
            req.body.r_pwd = hash;
            switch(req.body.r_role){
                case '工作人员':
                    req.body.r_role = 3;
                    break;
                case '老师':
                    req.body.r_role = 2;
                    break;
                case '学生':
                    req.body.r_role = 1;
                    break;
            }
            let role = await models.roles.create(req.body);
            if (role) res.send(`${req.body.r_account}添加成功!`);
        });
    } else {
        return res.send(`${req.body.r_account}已存在!`);
    }
});

// 角色删除
router.delete("/remove_role/:id", async (req, res) => {
    let isDelete = await models.roles.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("角色删除成功!");
});

// 根据账号修改密码
router.put("/update_role_pass", async (req, res) => {
    console.log(req.body);
    let update_role = await models.roles.update(
        {
            // 注意修改密码的话需要重新加密, 否则登录时解密拿不到
            r_pwd: bcrypt.hashSync(req.body.r_pwd, 10),
        },
        {
            where: { r_account: req.body.r_account },
        }
    );
    if (update_role) return res.send(`${req.body.r_account}密码修改成功!`);
});

module.exports = router;
