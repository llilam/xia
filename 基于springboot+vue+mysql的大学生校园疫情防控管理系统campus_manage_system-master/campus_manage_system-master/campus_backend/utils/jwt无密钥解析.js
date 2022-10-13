// jsonwebtoken加密 和 jwt-decode无密钥解析

// jsonwebtoken加密
const jwt = require("jsonwebtoken");
// jwt-decode无密钥解析
const jwt_decode = require("jwt-decode");

// 自定义密钥
const secretOrKey = "hello world";

// 需加密对象(将来生成token), 有点类似客户端传递过来的对象数据
const rules = { id: "317", name: "wenhuan", job: "frontEnd" };

// 使用promise测试两插件的执行
new Promise((resolve) => {
    /*
        jwt.sign
        1.异步
        2.对目标加密对象加密, 创建字符串
        3.参数：(需加密的对象, 自定义密钥, 过期时间, 回调)
    */
    jwt.sign(rules, secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err){
            throw err;
        }else{
            // 根据插件作者要求, 一定要写 Bearer 空格
            token = "Bearer " + token;
            // 打印生成的token字符串(加密结果)
            console.log("加密结果如下：")
            console.log(token);

            // 实际开发, 发送给前端
            // res.send(token)
            resolve(token);
        }
    });
}).then((token) => {
    /*
        jwt-decode对token进行解析

        输出结果：
        { id: '317', name: 'wenhuan', job:'frontEnd', iat: 1557397860, exp: 1557401460}
        
        iat: 生效时间
        exp：过期时间

        1.前端拿到字符串后, 应当进行解析
        2.存储localStorage、sessionStorage
        3.发送请求时, 再把token字符串再发给后端
    */
    console.log("解密结果如下：");
    console.log(jwt_decode(token));
});
