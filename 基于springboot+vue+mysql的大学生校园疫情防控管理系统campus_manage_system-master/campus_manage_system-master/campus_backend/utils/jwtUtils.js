// 安全拦截器(生成token字符串)
const jwt = require("jsonwebtoken");

// 验证权限(token, 密钥, 成功回调, 错误回调)
function verify(token, secretkey, success, error) {
    // 验证token
    jwt.verify(token, secretkey, function (err, decode) {
        if (err) {
            if (error) {
                error(err);
            }
        } else {
            if (success) {
                success(decode);
            }
        }
    });
}

// 签名(载荷-json对象-存储存在, 密钥, 过期时间-秒)
// 返回值：number | PromiseLike<ArrayBuffer>
function sign(load, secretkey, expiresIn) {
    var token = jwt.sign(load, secretkey, { expiresIn: expiresIn });
    return token;
}

// 异步转同步(token, 密钥)
// 返回值 {Promise<any>}
// 在app.js路由调用中, 已转换一次, 不用重复转换
function verifySync(token, secretkey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretkey, function (err, decode) {
            if (err) {
                console.log(err.message);
                resolve({ err: "error", msg: "会话已过期" });
            } else {
                console.log("解密成功");
                resolve(decode);
            }
        });
    });
}

module.exports = { verify, sign, verifySync };

/*
    测试代码

    1.使用解密
    let user={id:111,name:'user',password:123456};

    2.清空密码
    delete user.password;

    3.使用sign创建密码, 假设加密长度10
    let token=sign(user,'123456',10);

    4.解密
    verify(token,"123456",
        成功回调, 则返回数据
        function (user) {
            console.log(user);
        失败回调, 则返回错误信息
        },function (err) {
            console.error(err)
        }
    )

    5.测试打印token
    console.log(token);
*/
