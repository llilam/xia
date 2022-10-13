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
    res.send("health_records is ok...");
});

// 查询所有接种记录
router.get("/all_record", async (req, res) => {
    let records = await models.health_records.findAll({});
    res.send(records);
});

// 根据姓名查询接种记录
router.get("/query_record", async (req, res) => {
    let record = await models.health_records.findAll({
        where: { 
            r_name:{
                [Op.like]: `%${ req.query.r_name}%`
            } 
        },
    });
    res.send(record);
});

// 添加接种记录
router.post("/insert_record", async (req, res) => {
    let isRecord = await models.health_records.findOne({
        where: { r_stuid: req.body.r_stuid },
    });
    // 判断用户是否存在
    if (!isRecord) {
        let record = await models.health_records.create(req.body);
        if (record) res.send(`${req.body.r_stuid}添加成功!`);
    } else {
        return res.send(`${req.body.r_stuid}已存在!`);
    }
});

// 修改接种记录
router.put("/update_record", async (req, res) => {
    console.log(req.body);
    let isRecord = await models.health_records.findOne({
        where: { r_name: req.body.r_name },
    });
    if(isRecord){
        let {
            r_stuid,
            r_name,
            r_vaccine,
            r_inject,
            r_num,
            r_manufacturer,
            r_vac_unit,
            r_vac_date,
            pid
        } = req.body;
        let update_record = await models.health_records.update(
            {
                r_stuid,
                r_name,
                r_vaccine,
                r_inject,
                r_num,
                r_manufacturer,
                r_vac_unit,
                r_vac_date,
                pid
            },
            {
                where: { r_name: r_name },
            }
        );
        if (update_record) return res.send(`${r_name}修改成功!`);
    }else{
        let record = await models.health_records.create(req.body);
        if (record) res.send(`${req.body.r_stuid}添加成功!`);
    }
});

// 删除密切接触者
router.delete("/remove_record/:id", async (req, res) => {
    let isDelete = await models.health_records.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("接种记录删除成功!");
});

module.exports = router;
