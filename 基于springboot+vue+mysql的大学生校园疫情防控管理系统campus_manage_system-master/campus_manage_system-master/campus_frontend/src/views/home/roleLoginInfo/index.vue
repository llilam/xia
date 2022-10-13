<template>
    <div class="role-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
            <!-- 登录角色小信息 -->
            <el-card class="role-small-info" :key="1">
                <el-row type="flex" :gutter="60">
                    <el-col :span="1">
                        <img
                            src="@/assets/logo/logo.png"
                            alt="图片裂开找啊欢啊"
                            class="avatar"
                        />
                    </el-col>
                    <el-col :span="13">
                        <p>
                            {{ setTime }}, {{ infoList.i_name }},
                            2022年必须生龙活虎，好好加油!。
                        </p>
                        <p>折一根天使羽毛，愿拂去您的疲惫烦恼忧伤!</p>
                    </el-col>
                </el-row>
            </el-card>

            <!-- 登录角色大信息 -->
            <el-row
                class="role-big-info"
                type="flex"
                justify="space-around"
                :key="2"
            >
                <!-- 登录角色左信息 -->
                <el-col :span="11">
                    <div class="deadline">
                        <span>毕业倒计时</span>
                        <flip-countdown deadline="2022-06-20"></flip-countdown>
                    </div>
                    <el-card class="role-left-info">
                        <h3>基本信息</h3>
                        <ul>
                            <li>
                                我的账号<span>{{ roleList.i_stuid }}</span>
                            </li>
                            <li>
                                我的姓名<span>{{ roleList.i_name }}</span>
                            </li>
                            <li>
                                我的性别<span>{{
                                    infoList.i_gender == 0 ? "男" : "女"
                                }}</span>
                            </li>
                            <li>
                                出生日期<span>{{ infoList.i_birth }}</span>
                            </li>
                            <li>
                                我的民族<span>{{ infoList.i_nation }}</span>
                            </li>
                            <li>
                                学校名称<span>{{ infoList.i_university }}</span>
                            </li>
                            <li>
                                我的分院<span>{{ infoList.i_college }}</span>
                            </li>
                            <li>
                                我的班级<span>{{ infoList.i_class }}</span>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <!-- 登录角色右信息 -->
                <el-col :span="11">
                    <!-- 轮播 -->
                    <el-card class="role-right-info">
                        <el-carousel
                            :interval="1000"
                            type="card"
                            height="200px"
                            :autoplay="true"
                            indicator-position="none"
                            style="margin-top: 30px"
                        >
                            <el-carousel-item
                                v-for="(item, index) in imgPath"
                                :key="index"
                            >
                                <img :src="item" alt="图片裂开" />
                            </el-carousel-item>
                        </el-carousel>
                    </el-card>
                    <!-- 教育信息 -->
                    <el-card class="role-right-info" style="margin-top: 30px">
                        <h3>教育信息</h3>
                        <ul>
                            <li>
                                学校名称
                                <span>{{ infoList.i_university }}</span>
                            </li>
                            <li>
                                我的专业
                                <span>{{ infoList.i_profession }}</span>
                            </li>
                            <li>
                                入学时间
                                <span>{{ infoList.i_enter_time }}</span>
                            </li>
                            <li>
                                我的学历
                                <span>{{ infoList.i_background }}</span>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
import { getBasic } from "@/api/personal";
import "animate.css";
import FlipCountdown from "vue2-flip-countdown";
export default {
    name: "RoleLoginInfo",
    created() {
        this.getUserInfo();
    },
    data() {
        return {
            infoList: [],
            roleList: [],
            calender: new Date(),
            imgPath: [
                require("@/assets/home_images/2.jpg"),
                require("@/assets/home_images/1.jpg"),
                require("@/assets/home_images/3.jpg"),
            ],
        };
    },
    methods: {
        async getUserInfo() {
            let r_serial = this.$store.state.user.rolesData.r_serial;
            let res = await getBasic(r_serial);
            console.log('111111111:',res.data[0]);
            if (res.data.length != 0) {
                res.data[0].i_birth = res.data[0].i_birth.slice(0, 10);
                res.data[0].i_enter_time = res.data[0].i_enter_time.slice(
                    0,
                    10
                );
                this.infoList = res.data[0];
                this.roleList = res.data[0];
            } else {
                this.$message({
                    type: "warning",
                    message: "不好意思, 请先填写个人信息",
                });
                this.$router.push({
                    path: this.redirect || "/personal/personalInfo",
                });
            }
        },
    },
    computed: {
        setTime() {
            let time = new Date();
            let hours = time.getHours();
            if (hours >= 0 && hours <= 5) {
                return "晚上好";
            } else if (hours >= 6 && hours <= 11) {
                return "早上好";
            } else if (hours >= 12 && hours <= 14) {
                return "中午好";
            } else if (hours >= 15 && hours <= 18) {
                return "下午好";
            } else {
                return "晚上好";
            }
        },
    },
    components: { FlipCountdown },
};
</script>

<style lang="scss" scoped>
ul li {
    list-style: none;
}
.role-container {
    // 角色小信息
    .role-small-info {
        height: 60px;
        padding: 5px;
        .el-col:nth-child(1) {
            .avatar {
                width: 50px;
                background-color: rgba(0, 0, 0, 0.2);
                border: 1px solid black;
                border-radius: 100px;
            }
        }

        .el-col:nth-child(2) {
            color: black;
            p:first-child {
                font-size: 20px;
                padding-top: 5px;
                color: green;
            }
            p:last-child {
                font-size: 10px;
                line-height: 20px;
                color: black;
            }
        }
    }

    // 角色大信息
    .role-big-info {
        margin-top: 20px;
        .deadline {
            text-align: center;
            span {
                font-size: 30px;
                font-weight: bold;
                background: linear-gradient(to right, red, blue);
                -webkit-background-clip: text;
                color: transparent;
            }
        }
        // 登录角色左信息
        .role-left-info {
            padding: 20px;
            height: 450px;
            h3 {
                padding-bottom: 5px;
                border-bottom: 1px solid #c6c6c6;
            }
            ul {
                li {
                    padding-bottom: 25px;
                    color: #666;
                }
                padding: 10px;
                span {
                    padding-left: 20px;
                    color: black;
                }
            }
        }
        .role-right-info:first-child {
            height: 270px;
            .el-carousel__item img {
                width: 100%;
                height: 100%;
            }

            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }

            .el-carousel__item:nth-child(2n + 1) {
                background-color: #d3dce6;
            }
        }
        .role-right-info:last-child {
            padding: 20px;
            height: 260px;
            h3 {
                padding-bottom: 5px;
                border-bottom: 1px solid #c6c6c6;
            }
            ul {
                li {
                    padding-bottom: 25px;
                    color: #666;
                }
                padding: 10px;
                span {
                    padding-left: 20px;
                    color: black;
                }
            }
        }
    }
}
</style>
