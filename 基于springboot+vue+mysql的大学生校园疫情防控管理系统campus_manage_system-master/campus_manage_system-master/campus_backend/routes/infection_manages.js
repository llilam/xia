let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs");
let models = require("../models");
let jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let { SECRET_KEY, EXPIRES_TIME } = require("../setting/constant.js");
// let Result = require("../utils/Result.js");

const secret = "wen_huan_shi_shuai_ge_ma";

// 测试
router.get("/", function (req, res, next) {
    res.send("infection_manage is ok...");
});

// 查询所有确诊感染者
router.get("/all_infection", async (req, res) => {
    let infectionData = await models.infection_manages.findAll({});
    res.send(infectionData);
});

// 根据姓名查询确诊感染者
router.get("/query_infection", async (req, res) => {
    let infectionData = await models.infection_manages.findAll({
        where: { 
            m_name:{
                [Op.like]: `%${ req.query.m_name}%`
            } 
        },
    });
    res.send(infectionData);
});

// 添加确诊感染者
router.post("/insert_infection", async (req, res) => {
    let isInfection = await models.infection_manages.findOne({
        where: { m_stuid: req.body.m_stuid },
    });
    // 判断用户是否存在
    if (!isInfection) {
        let infectionData = await models.infection_manages.create(req.body);
        if (infectionData) res.send(`${req.body.m_stuid}添加成功!`);
    } else {
        return res.send(`${req.body.m_stuid}已存在!`);
    }
});

// 修改确诊感染者
router.put("/update_infection", async (req, res) => {
    console.log(req.body);
    let {
        m_stuid,
        m_name,
        m_gender,
        m_college,
        m_class,
        m_building,
        m_build_num,
        m_inject_source,
        m_inject_date
    } = req.body;
    let update_infection = await models.infection_manages.update(
        {
            m_name,
            m_gender,
            m_college,
            m_class,
            m_building,
            m_build_num,
            m_inject_source,
            m_inject_date
        },
        {
            where: { m_stuid },
        }
    );
    if (update_infection) return res.send(`${m_stuid}修改成功!`);
});

// 删除确诊感染者
router.delete("/remove_infection/:id", async (req, res) => {
    let isDelete = await models.infection_manages.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("感染者删除成功!");
});

module.exports = router;
