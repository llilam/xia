<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="journeyInput" :key="1">
            <el-row :gutter="100">
                <el-col :span="13">
                    <!-- 标题 -->
                    <div class="title">
                        <i class="el-icon-tickets"></i>
                        <span>行程录入</span>
                    </div>

                    <!-- 表单 -->
                    <el-form
                        ref="journeyFormRef"
                        :model="journeyForm"
                        :rules="journeyRules"
                        label-position="left"
                        label-width="140px"
                    >
                        <el-form-item label="编号" prop="d_stuid">
                            <el-input
                                v-model="journeyForm.d_stuid"
                                :disabled="true"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="d_name">
                            <el-input
                                v-model="journeyForm.d_name"
                                :disabled="true"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="所在学院" prop="d_college">
                            <el-input
                                v-model="journeyForm.d_college"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="所在班级" prop="d_class">
                            <el-input
                                v-model="journeyForm.d_class"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="所在宿舍楼" prop="d_building">
                            <el-input
                                v-model="journeyForm.d_building"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="所在宿舍号" prop="d_build_num">
                            <el-input
                                v-model="journeyForm.d_build_num"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="返程车次" prop="d_return_num">
                            <el-input
                                v-model="journeyForm.d_return_num"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="返程时间" prop="d_return_date">
                            <el-date-picker
                                v-model="journeyForm.d_return_date"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="出发地区" prop="d_start_area">
                            <el-input
                                v-model="journeyForm.d_start_area"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="到达地区" prop="d_arrival_area">
                            <el-input
                                v-model="journeyForm.d_arrival_area"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="14天内到达或途径"
                            prop="d_in_reach"
                        >
                            <el-input
                                v-model="journeyForm.d_in_reach"
                                placeholder="请输入内容~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="insertJourney()"
                                >添加</el-button
                            >
                            <el-button type="pain">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="9">
                    <el-descriptions
                        title="申请人信息预览"
                        :column="1"
                        border
                        class="preview-tab"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                编号
                            </template>
                            <span>{{ journeyForm.d_stuid }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                姓名
                            </template>
                            <span>{{ journeyForm.d_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                所在学院
                            </template>
                            <span>{{ journeyForm.d_college }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                所在班级
                            </template>
                            <span>{{ journeyForm.d_class }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                所在宿舍楼
                            </template>
                            <span>{{ journeyForm.d_building }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                所在宿舍号
                            </template>
                            <span>{{ journeyForm.d_build_num }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                返程车次
                            </template>
                            <span>{{ journeyForm.d_return_num }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-trophy-1"></i>
                                返程时间
                            </template>
                            <span>{{ journeyForm.d_return_date }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                出发地区
                            </template>
                            <span>{{ journeyForm.d_start_area }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-money"></i>
                                到达地区
                            </template>
                            <span>{{ journeyForm.d_arrival_area }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-money"></i>
                                14天内到达或途径
                            </template>
                            <span>{{ journeyForm.d_in_reach }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </div>
    </transition-group>
</template>

<script>
import { addJourney, alterJourney, getJourney } from "@/api/health";
export default {
    name: "JourneyInput",
    data() {
        // 字母数字汉字正则
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

        return {
            isData: false,
            journeyForm: {
                d_arrival_area: "",
                d_build_num: "",
                d_building: "",
                d_class: "",
                d_college: "",
                d_in_reach: "",
                d_name: this.$store.state.user.rolesData.r_name,
                d_return_date: "",
                d_return_num: "",
                d_start_area: "",
                d_stuid: this.$store.state.user.rolesData.r_serial,
            },
            journeyRules: {
                d_stuid: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_arrival_area: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_build_num: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_building: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_class: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_college: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_in_reach: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_name: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_return_date: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_return_num: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_start_area: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
                d_stuid: [
                    {
                        required: true,
                        message: "这是必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    created() {
        this.getJourneys();
    },
    methods: {
        async insertJourney() {
            this.$refs.journeyFormRef.validate(async (valid) => {
                if (valid) {
                    let pid = this.$store.state.user.rolesData.r_role;
                    this.journeyForm.pid = pid;
                    let res = await alterJourney(this.journeyForm);
                    this.$message({
                        type: "success",
                        message: "数据修改成功!",
                    });
                    this.getJourneys();
                    this.isData = true;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善输入信息谢谢!",
                    });
                }
            });
        },
        async getJourneys() {
            let r_serial = this.$store.state.user.rolesData.r_serial;
            let res = await getJourney(r_serial);
            console.log(res);
            if (res.data.length != 0) {
                res.data[0].d_return_date = res.data[0].d_return_date.slice(
                    0,
                    10
                );
                this.journeyForm = res.data[0];
            } else {
                this.$message({
                    type: "warning",
                    message: "请添加或更改数据!",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.journeyInput {
    padding-left: 20px;
    .title {
        padding-bottom: 20px;
        border-bottom: 1px solid #dadada;
        margin-bottom: 15px;
        span {
            margin-left: 10px;
            font-weight: bold;
            font-size: 17px;
        }
    }
}
</style>
