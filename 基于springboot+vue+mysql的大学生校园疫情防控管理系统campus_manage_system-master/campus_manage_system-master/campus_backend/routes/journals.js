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
    res.send("journals is ok...");
});

// 查询所有登录信息
router.get("/all_journal", async (req, res) => {
    let journal = await models.journals.findAll({});
    res.send(journal);
});

// 根据名字模糊搜索
router.get("/query_journal", async (req, res) => {
    let journal = await models.journals.findAll({
        where: { 
            j_name:{
                [Op.like]: `%${ req.query.j_name}%`
            } 
        },
    });
    res.send(journal);
});

// 添加登录信息
router.post("/insert_journal", async (req, res) => {
    let journal = await models.journals.create(req.body);
    if (journal) res.send('日志添加成功');
});

module.exports = router;
