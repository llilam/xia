<template>
    <!-- 登录容器 -->
    <div class="login-container">
        <!-- 结构 -->
        <div class="login-form">
            <!-- 标题区域 -->
            <div class="login-title">
                <h3>校园疫情管理系统</h3>
            </div>
            <!-- tab区域 -->
            <el-tabs v-model="activeName" :stretch="true" class="form-tabs">
                <el-tab-pane label="登录" name="first" class="login-tabs">
                    <el-form
                        ref="loginFormRef"
                        :model="loginForm"
                        :rules="loginRules"
                    >
                        <!-- 账号区域 -->
                        <el-form-item prop="r_account">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="loginForm.r_account"
                                placeholder="请输入账号"
                            />
                        </el-form-item>

                        <!-- 密码区域 -->
                        <el-form-item prop="r_pwd">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <!-- 
                                @keyup.enter.native：elementUI为自定义组件, 绑定原生事件必须使用navtive
                                解析：https://blog.csdn.net/qq_43681948/article/details/101109268
                            -->
                            <el-input
                                v-model="loginForm.r_pwd"
                                :type="passwordType"
                                placeholder="请输入密码"
                                @keyup.enter.native="handleLoginData"
                                ref="password"
                            />
                            <span class="show-pwd" @click="showPwd">
                                <!-- 三元判断输入框类型是不是密码, 是则显示闭眼, 否则显示睁眼 -->
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'
                                    "
                                />
                            </span>
                        </el-form-item>

                        <!-- 角色区域 -->
                        <el-form-item prop="r_role">
                            <el-radio-group v-model="loginForm.r_role">
                                <el-radio-button :label="1" border
                                    >学生</el-radio-button
                                >
                                <el-radio-button :label="2" border
                                    >老师</el-radio-button
                                >
                                <el-radio-button :label="3" border
                                    >工作人员</el-radio-button
                                >
                            </el-radio-group>
                        </el-form-item>

                        <!-- 提交区域 -->
                        <el-form-item style="width: 100%; margin-bottom: 30px">
                            <el-button
                                type="primary"
                                @click.native.prevent="handleLoginData"
                                >登录</el-button
                            >
                            <el-button
                                type="info"
                                @click.native.prevent="resetLoginData"
                                >重置</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second" class="register-tabs">
                    <el-form
                        ref="registerFormRef"
                        :model="registerForm"
                        :rules="registerRules"
                    >
                        <!-- 账号区域 -->
                        <el-form-item prop="r_account">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="registerForm.r_account"
                                placeholder="请输入账号"
                            />
                        </el-form-item>

                        <!-- 输入密码区域 -->
                        <el-form-item prop="r_pwd">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <!-- 
                                @keyup.enter.native：elementUI为自定义组件, 绑定原生事件必须使用navtive
                                解析：https://blog.csdn.net/qq_43681948/article/details/101109268
                            -->
                            <el-input
                                v-model="registerForm.r_pwd"
                                :type="passwordType"
                                placeholder="请输入密码"
                                ref="password"
                            />
                            <span class="show-pwd" @click="showPwd">
                                <!-- 三元判断输入框类型是不是密码, 是则显示闭眼, 否则显示睁眼 -->
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'
                                    "
                                />
                            </span>
                        </el-form-item>

                        <!-- 确定密码区域 -->
                        <el-form-item prop="r_check_pwd">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <!-- 
                                @keyup.enter.native：elementUI为自定义组件, 绑定原生事件必须使用navtive
                                解析：https://blog.csdn.net/qq_43681948/article/details/101109268
                            -->
                            <el-input
                                v-model="registerForm.r_check_pwd"
                                :type="passwordType"
                                placeholder="请确认密码"
                                @keyup.enter.native="handleRegisterData"
                                ref="password"
                            />
                            <span class="show-pwd" @click="showPwd">
                                <!-- 三元判断输入框类型是不是密码, 是则显示闭眼, 否则显示睁眼 -->
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'
                                    "
                                />
                            </span>
                        </el-form-item>

                        <!-- 编号区域 -->
                        <el-form-item prop="r_serial">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="registerForm.r_serial"
                                placeholder="请输入编号"
                            />
                        </el-form-item>

                        <!-- 姓名区域 -->
                        <el-form-item prop="r_name">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="registerForm.r_name"
                                placeholder="请输入姓名"
                            />
                        </el-form-item>

                        <!-- 角色区域 -->
                        <el-form-item prop="r_role">
                            <el-radio-group v-model="registerForm.r_role">
                                <el-radio-button :label="1" border
                                    >学生</el-radio-button
                                >
                                <el-radio-button :label="2" border
                                    >老师</el-radio-button
                                >
                                <!-- <el-radio-button :label="3" border
                                    >工作人员</el-radio-button
                                > -->
                            </el-radio-group>
                        </el-form-item>

                        <!-- 提交区域 -->
                        <el-form-item style="width: 100%; margin-bottom: 30px">
                            <el-button
                                type="primary"
                                @click.native.prevent="handleRegisterData"
                                >注册</el-button
                            >
                            <el-button
                                type="info"
                                @click.native.prevent="resetRegisterData"
                                >重置</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </div>
</template>

<script>
import { register } from "@/api/home";
export default {
    name: "Login",
    // data返回值之前, 可以定义变量、函数等任何操作
    data() {
        // 字母数字汉字
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");

        // 账号密码验证(匿名函数)
        let InvalidString = (rule, value, callback) => {
            // 验证非法字符串
            if (pat.test(value) === true) {
                callback(new Error("包含非法字符串、只可以是字母数字或汉字"));
            } else {
                callback();
            }
        };

        // 返回数据
        return {
            // tab栏初始值
            activeName: "first",
            // 登录表单默认数据
            loginForm: {
                r_account: "18888888888",
                r_pwd: "a123321",
                r_role: 3,
            },
            // 注册表单默认数据
            registerForm: {
                r_account: "",
                r_pwd: "",
                r_check_pwd: "",
                r_role: 1,
                r_serial: "",
                r_name: "",
            },
            // 登录表单数据验证
            loginRules: {
                // 验证账号是否合法
                r_account: [
                    /*
                        required：必填
                        trigger：什么时候触发
                        validator：自定义验证规则
                    */
                    { required: true, message: "账号是必填项" },
                    {
                        min: 5,
                        max: 12,
                        message: "账号长度在 6 到 12 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                // 验证密码是否合法
                r_pwd: [
                    { required: true, message: "密码是必填项" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                // 验证角色是否选择
                r_role: [
                    {
                        required: true,
                        message: "性别是必选项",
                        trigger: "blur",
                    },
                ],
                // 验证编号
                r_serial: [
                    {
                        min: 5,
                        max: 12,
                        required: true,
                        message: "编号是必选项",
                        trigger: "blur",
                    },
                ],
                // 验证编号
                r_name: [
                    {
                        min: 4,
                        max: 5,
                        required: true,
                        message: "姓名是必选项",
                        trigger: "blur",
                    },
                ],
            },
            // 注册表单数据验证
            registerRules: {
                // 验证账号是否合法
                r_account: [
                    /*
                        required：必填
                        trigger：什么时候触发
                        validator：自定义验证规则
                    */
                    { required: true, message: "账号是必填项" },
                    {
                        min: 6,
                        max: 12,
                        message: "账号长度在 6 到 12 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                // 验证密码是否合法
                r_pwd: [
                    { required: true, message: "密码是必填项" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                // 验证密码是否合法
                r_check_pwd: [
                    { required: true, message: "密码是必填项" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                r_serial: [
                    { required: true, message: "编号是必填项" }
                ],
                r_name: [
                    { required: true, message: "姓名是必填项" }
                ],
                // 验证角色是否选择
                r_role: [
                    {
                        required: true,
                        message: "性别是必选项",
                        trigger: "blur",
                    },
                ],
            },
            // 密码显示隐藏
            passwordType: "password",
            // 重定向地址判断
            redirect: undefined,
        };
    },
    watch: {
        /*
            vm实例任何属性都可监听
            1.如果监听的是路由
            2.则监听的是对象
            3.handler中的形参也就是对象
        */

        // 路由发生变化则触发
        $route: {
            immediate: true,
            handler: function (route) {
                // 逻辑与判断, 如果存在query参数, 则获取redirect(重定向)路由地址
                this.redirect = route.query && route.query.redirect;
            },
        },
    },
    methods: {
        // 密码显示与隐藏
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            // 密码显示与隐藏渲染完毕后, 再执行内容聚焦
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        // 重置注册表单
        resetRegisterData() {
            // resetFields()：elementUI表单项的重置方法, 重置回当前data数据所绑定的默认值
            this.$refs.registerFormRef.resetFields();
        },
        // 处理注册表单
        handleRegisterData() {
            this.$refs.registerFormRef.validate((valid) => {
                if (valid) {
                    return new Promise(async (resolve, reject) => {
                        await register(this.registerForm);
                        this.$message({
                            message: "角色注册成功",
                            type: "success",
                        });
                        window.location.reload();
                        resolve();
                    });
                } else {
                    this.$message({
                        message: "角色注册失败",
                        type: "error",
                    });
                    reject();
                }
            });
        },
        // 重置登录表单
        resetLoginData() {
            // resetFields()：elementUI表单项的重置方法, 重置回当前data数据所绑定的默认值
            this.$refs.loginFormRef.resetFields();
        },
        // 处理登录表单
        handleLoginData() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (valid) {
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then((res) => {
                            if (res) {
                                this.$message({
                                    message: `您好, ${res.r_name}, 欢迎来到校园疫情管理系统`,
                                    type: "success",
                                });
                                setTimeout(()=>{
                                    this.$router.push({
                                        // path: this.redirect || "/",
                                        path: '/home/roleLoginInfo'
                                    });
                                },2000)
                            } else {
                                this.$message({
                                    message:
                                        "您好,可能是账号密码错误了呢,检查一下哦!",
                                    type: "error",
                                });
                            }
                        });
                } else {
                    this.$message({
                        message: "角色登录失败",
                        type: "error",
                    });
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    /*
        图片引入发生BUG：Module not found: Error: Can't resolve
        1.问题所在
            - vue2.5及以下版本以上两种写法都没有问题, 2.6就出现这个问题,应该和webpack配置相关
        2.问题解析(webpack资源处理规则,分为：相对路径、没前缀路径、带~路径、相对根目录路径)
            1.相对路径: "./assets/logo_blue.png" 
            2.没有前缀的路径 "assets/logo_blue.png" 被webpack解析为 相对路径
            3.带~的路径
                - "~@/assets/theme/logo_blue.png" 被webpack解析为 require(src/assets/theme/logo_blue.png) 
                - 动态引入 @在webpack 被resolve.alias配置下等价于/src
            4.相对根目录的路径 "/assets/logo_blue.png" webpack不解析
    */
    background-image: url(~@/assets/login_images/2.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow: hidden;

    .login-form {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        width: 440px;
        max-width: 100%;
        padding: 30px 35px 0;
        border-radius: 20px;
        background: rgba(43, 43, 43, 0.8);
    }

    .login-title {
        text-align: center;
        color: white;
        h3 {
            margin: 0px;
            font-size: 35px;
            font-weight: 900;
        }
    }
    .el-tabs .el-tabs__header .el-tabs__nav .el-tabs__item {
        color: white;
    }
    .form-tabs {
        margin-top: 20px;
        .login-tabs {
            .el-form-item:nth-child(3),
            .el-form-item:nth-child(4) {
                border: none;
                background: none;
                border-radius: none;
                text-align: center;
            }
        }
        .register-tabs {
            .el-form-item:nth-child(6),
            .el-form-item:nth-child(7) {
                border: none;
                background: none;
                border-radius: none;
                text-align: center;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.6);
        span {
            margin-right:20px;
        }
        p {
            text-align: center;
            margin: 0;
            padding: 0;
            line-height: 30px;

            color: white;
        }
        a:hover{
            color:skyblue;
            text-decoration:underline;
        }
    }
}
</style>
