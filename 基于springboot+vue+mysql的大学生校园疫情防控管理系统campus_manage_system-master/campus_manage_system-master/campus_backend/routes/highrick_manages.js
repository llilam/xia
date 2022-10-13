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
    res.send("highrick_manages is ok...");
});

// 查询所有中高风险接触者
router.get("/all_highrick", async (req, res) => {
    let highrick = await models.highrick_manages.findAll({});
    res.send(highrick);
});

// 根据姓名查询中高风险接触者
router.get("/query_highrick", async (req, res) => {
    console.log(req.query);
    let highrick = await models.highrick_manages.findAll({
        where: { 
            m_name:{
                [Op.like]: `%${ req.query.m_name}%`
            } 
        },
    });
    res.send(highrick);
});

// 添加中高风险接触者
router.post("/insert_highrick", async (req, res) => {
    let isHighRick = await models.highrick_manages.findOne({
        where: { m_stuid: req.body.m_stuid },
    });
    // 判断用户是否存在
    if (!isHighRick) {
        let high_rick = await models.highrick_manages.create(req.body);
        if (high_rick) res.send(`${req.body.m_stuid}添加成功!`);
    } else {
        return res.send(`${req.body.m_stuid}已存在!`);
    }
});

// 修改中高风险接触者
router.put("/update_highrick", async (req, res) => {
    let {
        m_stuid,
        m_name,
        m_gender,
        m_college,
        m_class,
        m_building,
        m_building_num,
        m_recent_place,
        m_recent_history,
        m_health_status
    } = req.body;
    let update_high_rick = await models.highrick_manages.update(
        {
            m_name,
            m_gender,
            m_college,
            m_class,
            m_building,
            m_building_num,
            m_recent_place,
            m_recent_history,
            m_health_status
        },
        {
            where: { m_stuid: m_stuid },
        }
    );
    if (update_high_rick) return res.send(`${m_stuid}修改成功!`);
});

// 删除中高风险接触者
router.delete("/remove_highrick/:id", async (req, res) => {
    let isDelete = await models.highrick_manages.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("接触者删除成功!");
});

module.exports = router;
