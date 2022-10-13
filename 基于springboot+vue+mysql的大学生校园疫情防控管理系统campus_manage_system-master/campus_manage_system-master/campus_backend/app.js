// 校园疫情管理系统--后端结构
let express = require("express");
let path = require("path");
let createError = require("http-errors");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let cors = require("cors");
let router = require("./routes");
let app = express();

// 测试数据库是否连接成功
app.get("/", function (req, res) {
    res.send("数据库连接成功~~");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.use(function (req, res, next) {
    next(createError(404));
});


app.listen("8801", () => {
    console.log("请访问localhost:8801");
});
