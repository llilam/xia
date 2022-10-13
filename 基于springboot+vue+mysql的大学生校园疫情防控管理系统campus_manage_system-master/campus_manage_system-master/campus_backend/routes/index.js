var express = require("express");
var router = express.Router();
// boom中间件：处理路由不存在时, 返回错误信息
const boom = require("boom");
// let jwtAuth = require("../setting/jwt");

// 所有二级路由都需验证token，这样就不用一个个二级路由都添加token验证
// router.use(jwtAuth);

// 所有二级路由(接口)
const roleRouter = require("./roles");
const personalInfoRouter = require("./personal_infos");
const lowRickRouter = require("./lowrick_manages");
const highRickRouter = require("./highrick_manages");
const closeRouter = require("./close_manages");
const infectionRouter = require("./infection_manages");
const joureyRouter = require("./jourey_datas");
const recordRouter = require("./health_records");
const messageRouter = require("./health_messages");
const infoerRouter = require("./health_infoers");
const domesticRouter = require("./domestic_notices");
const campusRouter = require("./campus_notices");
const authorRouter = require("./authors");
const journalRouter = require("./journals");

// 配置一级路由
router.use("/role", roleRouter);
router.use("/personal", personalInfoRouter);
router.use("/lowrick", lowRickRouter);
router.use("/highrick", highRickRouter);
router.use("/close", closeRouter);
router.use("/infection", infectionRouter);
router.use("/journey", joureyRouter);
router.use("/record", recordRouter);
router.use("/message", messageRouter);
router.use("/infoer", infoerRouter);
router.use("/domestic", domesticRouter);
router.use("/campus", campusRouter);
router.use("/author", authorRouter);
router.use("/journal", journalRouter);

// 匹配路由不存在的情况(放在router最后面)
router.use((req, res, next) => {
    next(boom.notFound("接口不存在"));
});

module.exports = router;
