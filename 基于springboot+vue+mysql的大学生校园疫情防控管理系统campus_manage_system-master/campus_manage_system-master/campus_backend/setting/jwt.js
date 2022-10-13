// jwt

/*
    jwt-web-token与express-jwt的区别
    1.jwt-web-token用来生成token字符串
    2.express-jwt用来验证token

    总结：express-jwt底层也是使用jwt-web-token进行封装
*/
let jwt = require('express-jwt')
let {SECRET_KEY} = require('./constant')

module.exports = jwt({
    secret:SECRET_KEY,
    // express-jwt新版需要添加：algorithms, 类似加密算法
    algorithms: ['HS256'],
    // 是否添加证书
    credentialsRequired: true,
}).unless({ // unless()处理不想接受身份验证的路径
    path:[
        '/',
        '/api/users/login',
        '/api/users/register',
        // 动态路由需用这种正则方式去匹配
        /^\/api\/articles\/detail\/.*/, 
        /^\/api\/articles\/all\/.*/,
    ]
})