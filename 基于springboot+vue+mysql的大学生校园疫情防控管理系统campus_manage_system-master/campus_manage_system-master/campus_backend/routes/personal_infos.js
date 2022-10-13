let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
let models = require("../models");
let jwt = require("jsonwebtoken");
let { SECRET_KEY, EXPIRES_TIME } = require("../setting/constant.js");
// let Result = require("../utils/Result.js");

const secret = "wen_huan_shi_shuai_ge_ma";

// 测试
router.get("/", function (req, res, next) {
    res.send("personal_info is ok...");
});

// 查询所有个人信息
router.get("/all_personal", async (req, res) => {
    let role = await models.personal_infos.findAll({
        include:[
            {
                model:models.health_records,
                attributes:[
                    "id",
                    "r_stuid",
                    "r_name",
                    "r_vaccine",
                    "r_inject",
                    "r_num",
                    "r_manufacturer",
                    "r_vac_unit",
                    "r_vac_date",
                    "pid"
                ]
            },
            {
                model:models.health_messages,
                attributes:[
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
                    "pid"
                ]
            },
            {
                model:models.health_infoers,
                attributes:[
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
                    "pid"
                ]
            },
            {
                model:models.journey_datas,
                attributes:[
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
                    "pid"
                ]
            }
        ]
    });
    res.send(role);
});

// 根据学号查询个人信息
router.get("/get_personal", async (req, res) => {
    let role = await models.personal_infos.findAll({
        include:[
            {
                model:models.health_records,
                attributes:[
                    "id",
                    "r_stuid",
                    "r_name",
                    "r_vaccine",
                    "r_inject",
                    "r_num",
                    "r_manufacturer",
                    "r_vac_unit",
                    "r_vac_date",
                    "pid"
                ]
            },
            {
                model:models.health_messages,
                attributes:[
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
                    "pid"
                ]
            },
            {
                model:models.health_infoers,
                attributes:[
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
                    "pid"
                ]
            },
            {
                model:models.journey_datas,
                attributes:[
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
                    "pid"
                ]
            }
        ],
        where:{
            i_stuid:req.query.i_stuid
        }
    });
    res.send(role);
});

// 修改个人基本信息
router.put("/update_basic", async (req, res) => {
    console.log(req.body);
    let isInfo = await models.personal_infos.findOne({
        where: { i_stuid: req.body.i_stuid },
    });
    if(isInfo){
        let {
            i_stuid,
            i_name,
            i_gender,
            i_birth,
            i_nation,
            i_university,
            i_college,
            i_class,
            i_profession,
            i_enter_time,
            i_background,
            rid
        } = req.body;
        let update_basic = await models.personal_infos.update(
            {
                i_name,
                i_gender,
                i_birth,
                i_nation,
                i_university,
                i_college,
                i_class,
                i_profession,
                i_enter_time,
                i_background,
                rid
            },
            {
                where: { i_stuid },
            }
        );
        if (update_basic) return res.send(`${i_stuid}修改成功!`);
    }else{
        let insert = await models.personal_infos.create(req.body);
        if(insert){
            res.send(`${req.body.i_stuid}添加成功!`);
        }
    }
});

// 添加个人基本信息
router.post("/insert_basic", async (req, res) => {
    let isInfo = await models.personal_infos.findOne({
        where: { i_stuid: req.body.i_stuid },
    });
    // 判断用户是否存在
    if (!isInfo) {
        let res = await models.personal_infos.create(req.body);
        if (res) res.send(`${req.body.i_stuid}添加成功!`);
    } else {
        return res.send(`${req.body.i_stuid}已存在!`);
    }
});

// 修改个人教育信息
router.put("/update_educate", async (req, res) => {
    let {
        i_stuid,
        i_name,
        i_gender,
        i_birth,
        i_nation,
        i_university,
        i_college,
        i_class,
        i_profession,
        i_enter_time,
        i_background,
        rid
    } = req.body;
    let update_educate = await models.personal_infos.update(
        {
            i_name,
            i_gender,
            i_birth,
            i_nation,
            i_university,
            i_college,
            i_class,
            i_profession,
            i_enter_time,
            i_background,
            rid
        },
        {
            where: { i_stuid },
        }
    );
    if (update_educate) return res.send(`${i_stuid}修改成功!`);
});

module.exports = router;
