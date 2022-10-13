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
    res.send("authors is ok...");
});

// 查询作者信息
router.get("/author_info", async (req, res) => {
    let info = await models.authors.findAll({
        include:[
            {
                model:models.domestic_notices,
                attributes:[
                    "id",
                    "n_title",
                    "n_date",
                    "pid"
                ]
            },
            {
                model:models.campus_notices,
                attributes:[
                    "id",
                    "n_title",
                    "n_content",
                    "n_date",
                    "pid"
                ]
            },
            {
                model:models.journals,
                attributes:[
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
                ]
            }
        ]
    });
    res.send(info);
});

// 根据名称修改作者信息
router.put("/update_author_info", async (req, res) => {
    let {
        a_name,
        a_phone,
        a_email,
        a_start_time,
        a_end_time,
    } = req.body;
    let update_info = await models.authors.update(
        {
            a_phone,
            a_email,
            a_start_time,
            a_end_time,
            a_name
        },
        {
            where: { id:3 },
        }
    );
    if (update_info) return res.send('您好作者,信息已经修改');
});

module.exports = router;
