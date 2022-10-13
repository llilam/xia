// 自定义错误码、密钥、过期时间
module.exports = {
    CODE_SUCCESS: 1,  //成功
    CODE_ERROR: -1,    //失败
    CODE_TOKEN_EXPIRED: -2,//token验证失败
    CODE_REPEAT: -3,  //数据库已经存在xx值
    CODE_WARNING: -4, //警告
    SECRET_KEY: 'a_huan_jiu_shi_wo', // jwt密钥
    EXPIRES_TIME: 60 * 60 * 6   // 过期时间
}