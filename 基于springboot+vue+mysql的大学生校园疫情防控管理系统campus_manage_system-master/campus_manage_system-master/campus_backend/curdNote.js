const express = require("express");
const sequelize = require("sequelize");

// sequelize框架中获取where函数
const { where } = require("sequelize");
// 结构获取自己想要的表名
const {User, Article} = require("../models");
// 创建二级路由对象
const router = express.Router();

// 多表查询
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const data = await User.findAll({
        where:{
            id
        },
        include: [Article]
    });
    res.json(data);
});

// 查询所有用户
router.get("/findAll", async (req, res) => {
    const userList = await User.findAll();
    res.json(userList);
});

// 排序与分页
router.get("/findPage", async (req, res) => {
    const page = 2; // 页码
    const size = 3; // 页面大小
    const userList = await User.findAll({
        // 倒序
        order: [["id", "desc"]],
        // 分页：offset 偏移量，说白就是从跳过前面多少跳记录。计算方式为(page-1)*size
        // offset: (page - 1) * 3,
        limit: size,
    });
    res.json(userList);
});

// 单表条件查询
router.get("/findByConditaion1", async (req, res) => {
    const userList = await User.findAll({
        // 需要显示的字段
        attributes: [
            "id",
            "username",
            /*
                sequelize.fn可调用mysql各种函数
                1. fn(函数名,...参数)
                2. sequelize.col('列名') 和 参数值 都属于 '参数'
                3.例子
                    [sequelize.fn('SUM',sequelize.col('id'),'idSum')] == SUM(id) as ideSum
                    [sequelize.fn("char_length",sequelize.col("title"),"titleLength")] == char_length(title) as titleLength
                4.详细格式
                    [sequelize.fn('concat', '前缀 --- ', sequelize.col('id'), ' ---后缀'),'concatId']
                    等价：concat('前缀 ---',id, ' ---后缀')
            */
            [
                sequelize.fn("char_length", sequelize.col("username")),
                "usernameLength"
            ]
        ],
        where: {
            // // id = 2
            // id: 2,
            // // id > 2
            // id: {
            //   [sequelize.Op.gt]: 2
            // },
            // // id in(2,3)
            // id: [2, 3],
            // // title like '%新年%'
            // title: {
            //   [sequelize.Op.like]: '%新年%'
            // },
            // // id = 2 or id = 3
            // [sequelize.Op.or]: [
            //   {id: 2},
            //   {id: 3}
            // ],
            // // title like '卢本伟%' or id = 3
            // [sequelize.Op.or]:[
            //   {
            //     title: {
            //       [sequelize.Op.like]: '卢本伟%'
            //     }
            //   },
            //   {id: 3}
            // ]
        },
    });
    res.json(userList);
});

// 新增记录
router.post("/", (req, res) => {
    User.create({
        username:'今天买了件衣服',
        content:'心情非常开心'
    });
    res.json({
        code: 1000,
        msg: "新增记录成功",
    });
});

// 新增多条数据
router.post("/niubi", (req, res) => {
    const data = [
        {
            username:'阿欢今天有点困1',
            content:'他今晚需要早点休息1'
        },
        {
            username:'阿欢今天有点困2',
            content:'他今晚需要早点休息2'
        },
        {
            username:'阿欢今天有点困3',
            content:'他今晚需要早点休息3'
        }
    ]
    data.forEach(item => {
        User.create({
            username:item.username,
            content:item.content,
        });
    });
    res.json({
        code: 1000,
        msg: "新增多条记录成功",
    });
});

// 更新记录
router.put("/:id", (req, res) => {
    console.log(req.params.id);
    User.update({
        'username': '数据被修改了'
    }, {
        // 条件
        'where': { 'id': req.params.id }
    })
    res.json({
        code: 1000,
        msg: "更新记录成功",
    });
});

// 删除记录
router.delete("/:id", async (req, res) => {
    await User.destroy({
        where: {
            // 这里的where 和什么条件的where一样，可以使用各种复杂筛选，然后再进行删除
            id: req.params.id,
        },
    });
    res.json({
        code: 1000,
        msg: "删除记录成功",
    });
});

module.exports = router;
