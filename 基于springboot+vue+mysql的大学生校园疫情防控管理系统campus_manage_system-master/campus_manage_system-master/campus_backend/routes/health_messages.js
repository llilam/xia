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
    res.send("health_messages is ok...");
});

// 查询所有健康信息
router.get("/all_message", async (req, res) => {
    let messages = await models.health_messages.findAll({});
    res.send(messages);
});

// 根据姓名查询健康信息
router.get("/query_message", async (req, res) => {
    let message = await models.health_messages.findAll({
        where: { 
            m_name:{
                [Op.like]: `%${req.query.m_name}%`
            }
        }
    });
    res.send(message);
});

// 添加健康信息
router.post("/insert_message", async (req, res) => {
    let isMessage = await models.health_messages.findOne({
        where: { m_stuid: req.body.m_stuid },
    });
    // 判断用户是否存在
    if (!isMessage) {
        let message = await models.health_messages.create(req.body);
        if (message) res.send(`${req.body.m_stuid}添加成功!`);
    } else {
        return res.send(`${req.body.m_stuid}已存在!`);
    }
});

// 根据学号修改健康信息
router.put("/update_message", async (req, res) => {
    let isMessage = await models.health_messages.findOne({
        where: { m_name: req.body.m_name },
    });
    if(isMessage){
        let {
            m_stuid,
            m_name,
            m_college,
            m_class,
            m_recent_resi,
            m_recent_touch,
            m_touch_date,
            m_health_status,
            m_status_des,
            pid
        } = req.body;
        let update_message = await models.health_messages.update(
            {
                m_stuid,
                m_name,
                m_college,
                m_class,
                m_recent_resi,
                m_recent_touch,
                m_touch_date,
                m_health_status,
                m_status_des,
                pid
            },
            {
                where: { m_name: m_name },
            }
        );
        if (update_message) return res.send(`${m_name}修改成功!`);
    }else{
        let message = await models.health_messages.create(req.body);
        if (message) res.send(`${req.body.m_stuid}添加成功!`);
    }
});

// 删除健康信息
router.delete("/remove_message/:id", async (req, res) => {
    let isDelete = await models.health_messages.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("健康信息删除成功!");
});

module.exports = router;
