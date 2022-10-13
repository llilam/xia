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
    res.send("health_infoers is ok...");
});

// 查询所有申报人信息
router.get("/all_infoer", async (req, res) => {
    let messages = await models.health_infoers.findAll({});
    res.send(messages);
});

// 根据姓名查询申报人信息
router.get("/query_infoer", async (req, res) => {
    let message = await models.health_infoers.findAll({
        where: { 
            i_name:{
                [Op.like]: `%${req.query.i_name}%`
            } 
        },
    });
    res.send(message);
});

// 添加申报人信息
router.post("/insert_infoer", async (req, res) => {
    let isInfoer = await models.health_infoers.findOne({
        where: { i_name: req.body.i_name },
    });
    // 判断用户是否存在
    if (!isInfoer) {
        let infoer = await models.health_infoers.create(req.body);
        if (infoer) res.send(`${req.body.i_name}添加成功!`);
    } else {
        return res.send(`${req.body.i_name}已存在!`);
    }
});

// 根据姓名修改申报人信息
router.put("/update_infoer", async (req, res) => {
    let isInfoer = await models.health_infoers.findOne({
        where: { i_name: req.body.i_name },
    });
    if(isInfoer){
        let {
            i_name,
            i_idcard,
            i_phone,
            i_gender,
            i_birth,
            i_nationality,
            i_domicile,
            i_native,
            i_address,
            pid
        } = req.body;
        let update_infoer = await models.health_infoers.update(
            {
                i_name,
                i_idcard:i_idcard,
                i_phone:i_phone,
                i_gender:i_gender,
                i_birth:i_birth,
                i_nationality:i_nationality,
                i_domicile:i_domicile,
                i_native:i_native,
                i_address:i_address,
                pid
            },
            {
                where: { i_name: i_name },
            }
        );
        if (update_infoer) return res.send(`${i_name}修改成功!`);
    }else{
        let infoer = await models.health_infoers.create(req.body);
        if (infoer) res.send(`${req.body.i_name}添加成功!`);
    }
});

// 删除申报人信息
router.delete("/remove_infoer/:id", async (req, res) => {
    let isDelete = await models.health_infoers.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("申报人信息删除成功!");
});

module.exports = router;