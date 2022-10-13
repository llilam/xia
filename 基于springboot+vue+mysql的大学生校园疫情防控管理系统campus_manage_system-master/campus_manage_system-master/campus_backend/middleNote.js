// 跨域请求设置(放在所有API最前面, 不然没有效果)
// app.all("*", function (req, res, next) {
//     // 设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin", "*");
//     // 允许header类型
//     res.header("Access-Control-Allow-Headers", "*");
//     // 跨域允许的请求方式
//     res.header("Access-Control-Allow-Methods", "*");
//     // 请求头下面加入以下代码, 能够尽快处理请求头为 options的请求
//     if (req.method == "OPTIONS") {
//         res.send(200);
//     } else {
//         next();
//     }
// });

// session配置
// app.use(session({
//     // 保存session的字段, 默认为 connect.sid
//     name: identityKey,
//     // 密钥字符串, 计算hash并放cookie中, 使产生signedCookie防篡改
//     secret: 'wenhuan',
//     // session 存储方式, 默认存放内存中, 也可以使用 redis，mongodb 等
//     store: new FileStore(), // 文件存储
//     // 是否自动保存未初始化会话，建议false
//     saveUninitialized: false,
//     // 是否每次都重新保存会话，建议false
//     resave: false,
//     // cookie设置
//     cookie: {
//         // 有效期：1000毫秒=1秒
//         maxAge: 6 * 10 * 1000,
//         // cookie影响到的路由
//         path: '/',
//         // 使客户端无法获取cookie, 防止XSS攻击
//         httpOnly: true,
//         // true时, http无法访问cookie, 唯有https可以访问cookie
//         secure: false
//     }
// }))

// 定义全局加密解密密钥
// global.globalKey = "123456"
// let jwtUtil = require("./utils/jwtUtils");

// 请求信息打印控制台, 实际生产环境中, 需将日志记录log文件
// app.use(logger("dev"));

// 解析表单 JSON 格式数据（有兼容性，仅 4.16.0+ 版本）
// app.use(express.json());

// 解析表单 URL-encoded 格式数据（有兼容性，仅 4.16.0+ 版本）
// app.use(express.urlencoded({ extended: false }));

// cookie如需签名加密, 则参数随便传, 类似自定义密钥
// app.use(cookieParser());

// 快速托管静态资源(例如: HTML、CSS、img等, 无兼容性)
// app.use(express.static(path.join(__dirname, "public")));

// 拦截器(鉴权, 获取token利用jwt进行解密)
// app.use(async function (req, resp, next) {
//     // 从post或get中获取token登录态
//     let path = req.path;
//     let token = "";
//     if (req.body.token){
//         token = req.body.token;
//     }else{
//         token = req.query.token;
//     }
//     // 拦截users进行对token进行jwt解密
//     if (path.startsWith("/users")) {
//         if (path.startsWith("/users/login")) {
//             console.log("放行login");
//             next();
//             return;
//         }

//         console.log("拦截login");
//         let results = await jwtUtil.verifysync(token, global.globalKey);
//         if (results.err) {
//             console.log("users解密失败，拦截");
//             jwtAlert(resp);
//             return;
//         } else {
//             req.headers.session = result;
//             console.log("users解密成功，放行");
//             next();
//             return;
//         }
//     }

//     // 拦截admin
//     if (path.startsWith("/admin")) {
//         if (
//             path.startsWith("/admin/getPageUser") ||
//             path.startsWith("/admin/getClasses") ||
//             path.startsWith("/admin/getHMIAndCP")
//         ) {
//             req.headers.session = result;
//             console.log("放行admin");
//             next();
//             return;
//         }
//         console.log("拦截admin")
//         let results = await jwtUtil.verifysync(token, global.globalKey);
//         if (results.err) {
//             console.log("admin解密失败，拦截");
//             jwtAlert(resp);
//             return;
//         } else {
//             req.headers.session = result;
//             console.log("admin解密成功，放行");
//             next();
//             return;
//         }
//     }

//     // 拦截student
//     if (path.startsWith("/student")) {
//         if (
//             path.startsWith("/student/getHealthNowMonth") ||
//             path.startsWith("/student/gethealthNowDay")
//         ) {
//             console.log("放行student");
//             next();
//             return;
//         }

//         console.log("拦截student")
//         let results = await jwtUtil.verifysync(token, global.globalKey);
//         if (results.err) {
//             console.log("student解密失败，拦截");
//             jwtAlert(resp);
//             return;
//         } else {
//             req.headers.session = result;
//             console.log("student解密成功，放行");
//             next();
//             return;
//         }
//     }

//     // 拦截upload
//     if (path.startsWith("/upload")) {
//         console.log("放行upload");
//         next();
//         return;
//     }

//     // 其他路由放行
//     next();
// });

// 未授权返回状态提示
// function jwtAlert(resp) {
//     resp.status(401).send("不好意思, 阿欢要求您登录后才可使用接下来的功能");
// }

// 挂载路由(注意：除了错误级别中间件, 其他中间件, 必须在路由之前进行配置)
// 需重写
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/admin", adminRouter);
// app.use("/upload", uploadRouter);
// app.use("/student", studentRouter);

// 404错误处理
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// 其他错误处理
// app.use(function (err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
//     res.status(err.status || 500);
//     // 跳转错误页面模板
//     res.render("error");
// });

// 配置数据库信息
// const sequelize = new Sequelize(
//     "sequelize_test", // 数据库名
//     "root", // 用户名
//     "root", // 密码
//     {
//         dialect: "mysql", // 数据库使用mysql
//         host: "localhost", // 数据库服务器ip
//         port: 3306, // 数据库服务器端口
//         define: {
//             // 务必加上这个配置, sequelize底层是简单使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会转换成updateAt 从而报错
//             underscored: true,
//         },
//     }
// );

// // sequelize.authenticate()测试连接是否正常
// sequelize
// .authenticate()
// .then((res) => {
//     console.log("sequelize已成功连接数据库, CRUD开始吧!!");
// })
// .catch((err) => {
//     console.log("sequelize连接数据库失败, CRUD个鬼哦!!");
// });

// // 创建文章表(测试)
// const Article = sequelize.define(
//     "article",
//     {
//         id: {
//             field: "id", // 字段名
//             primaryKey: true, // 主键唯一
//             type: Sequelize.INTEGER, // 类型
//             autoIncrement: true,
//             allowNull: false,
//         },
//         content: {
//             field: "content",
//             type: Sequelize.STRING,
//         },
//         author_id: {
//             field: "author_id", // 字段名
//             type: Sequelize.INTEGER, // 类型
//             allowNull: false, // 是否允许为空
//         },
//     },
//     {
//         tableName: "article",
//         timestamps: false,
//         freezeTableName: true,
//     }
// );

// // 创建用户表(测试)
// const Model = Sequelize.Model;
// class User extends Model {}
// User.init(
//     {
//         username: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         age: {
//             type: Sequelize.STRING,
//         },
//     },
//     {
//         sequelize,
//         modelName: "user",
//         timestamps: false,
//         freezeTableName: true,
//     }
// );

// // 数据模型(表)写入数据库
// Article.sync({ force: true }).then(() => {
//     return Article.create({
//         content: "阿欢的第一篇文章",
//         author_id: "1",
//     });
// });
// User.sync({ force: true }).then(() => {
//     return User.create({
//         username:'阿欢',
//         age:18
//     });
// });

// // 多表查询操作
// User.associate = function(module){
//     // User模型绑定Aricle模型中的外键
//     modules.User.hasMany(modules.Article,{
//         foreignKey: 'author_id'
//     })
// }

    
// 关闭sequelize连接
// sequelize.close()