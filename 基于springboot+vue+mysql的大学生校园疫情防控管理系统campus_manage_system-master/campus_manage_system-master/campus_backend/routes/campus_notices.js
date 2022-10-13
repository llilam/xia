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
    res.send("campus_notices is ok...");
});

// 查询所有校内疫情通知
router.get("/all_campus", async (req, res) => {
    let notices = await models.campus_notices.findAll({});
    res.send(notices);
});

// 根据标题查询校内疫情通知
router.get("/query_campus", async (req, res) => {
    let notice = await models.campus_notices.findAll({
        where: { 
            n_title:{
                [Op.like]: `%${ req.query.n_title}%`
            } 
        },
    });
    res.send(notice);
});

// 添加校内疫情通知
router.post("/insert_campus", async (req, res) => {
    let isNotice = await models.campus_notices.findOne({
        where: { n_title: req.body.n_title },
    });
    if (!isNotice) {
        let notice = await models.campus_notices.create(req.body);
        if (notice) res.send(`${req.body.n_title}添加成功!`);
    } else {
        return res.send(`${req.body.n_title}已存在!`);
    }
});

// 根据ID修改校内疫情通知
router.put("/update_campus", async (req, res) => {
    let {
        id,
        n_title,
        n_content,
        n_date
    } = req.body;
    let update_notice = await models.campus_notices.update(
        {
            n_title,
            n_content,
            n_date
        },
        {
            where: { id },
        }
    );
    if (update_notice) return res.send('校内疫情通知修改成功!');
});

// 删除校内疫情通知
router.delete("/remove_campus/:id", async (req, res) => {
    let isDelete = await models.campus_notices.destroy({
        where: { id: req.params.id },
    });
    if (isDelete) res.send("校内疫情通知删除成功!");
});

module.exports = router;
