/*
    passport 中间件
    1.解析token主插件, 相当于存储passport-jwt的容器
    2.请求抵达路由之前执行
        - 假如strategy认定某请求非法, 则路由不会执行
        - 返回401 Unauthorized.

    passport-jwt 中间件
    1.token密钥解析
*/

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
// 1.创建jwt策略函数、抽取jwt函数
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 用来创建二级路由
const router = express.Router();

// 2.passport初始化
app.use(passport.initialize());

// 3.配置策略选项且创建策略对象(解析已加密token)
let option = {
    // 密钥
    secretOrKey: "hello world", 
    // 抽取token方式：从请求头 Authorization 抽取 token 数据
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
var jwtConfig = new JwtStrategy(option, (jwt_payload, next) => {
    /*
        jwt_payload
        1.加密好的 token 字符串
        2.与jwt-decode解析一样, 但是这个会进行密钥判断
        3.如果密钥匹配失败, 返回401状态码
    */
    console.log(jwt_payload);
    // 下一个中间件(默认null, 已解析好的token)
    next(null, jwt_payload);
});

// 将策略对象放入 passport 容器中
passport.use(jwtConfig);

// passport.authenticate("加密算法策略", 验证条件，回调)
// 二级路由
router.get(
    "/testJWT",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ ok: 1 });
    }
);

// 一级路由
app.use("/test", router);
app.listen(8080,()=>{
    console.log("localhost:8080已启动");
});