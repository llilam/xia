<template>
    <div class="personal-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
            <el-row :gutter="20" :key="1">
                <el-col :span="17">
                    <el-tabs v-model="tabActiveName" class="info-tab">
                        <el-tab-pane label="基本信息" name="first">
                            <el-form
                                ref="basicFormRef"
                                :model="basicForm"
                                :rules="basicRules"
                            >
                                <el-form-item label="我的账号">
                                    <el-input
                                        v-model="basicForm.i_stuid"
                                        :disabled="true"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="我的姓名">
                                    <el-input
                                        v-model="basicForm.i_name"
                                        placeholder="请输入内容~"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="我的性别" prop="i_gender">
                                    <el-radio
                                        v-model="basicForm.i_gender"
                                        :label="0"
                                        border
                                        >男</el-radio
                                    >
                                    <el-radio
                                        v-model="basicForm.i_gender"
                                        :label="1"
                                        border
                                        >女</el-radio
                                    >
                                </el-form-item>
                                <el-form-item label="出生日期" prop="i_birth">
                                    <el-date-picker
                                        v-model="basicForm.i_birth"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="我的民族" prop="i_nation">
                                    <el-input
                                        v-model="basicForm.i_nation"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="学校名称"
                                    prop="i_university"
                                >
                                    <el-input
                                        v-model="basicForm.i_university"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="我的分院" prop="i_college">
                                    <el-input
                                        v-model="basicForm.i_college"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="我的班级" prop="i_class">
                                    <el-input
                                        v-model="basicForm.i_class"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="updateBasics()"
                                        >更新</el-button
                                    >
                                    <el-button type="info">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="教育信息" name="second">
                            <el-form
                                ref="educateFormRef"
                                :model="educateForm"
                                :rules="educateRules"
                            >
                                <el-form-item
                                    label="学校名称"
                                    prop="i_university"
                                >
                                    <el-input
                                        v-model="educateForm.i_university"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="我的专业"
                                    prop="i_profession"
                                >
                                    <el-input
                                        v-model="educateForm.i_profession"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="入学时间"
                                    prop="i_enter_time"
                                >
                                    <el-date-picker
                                        v-model="educateForm.i_enter_time"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    label="我的学历"
                                    prop="i_background"
                                >
                                    <el-input
                                        v-model="educateForm.i_background"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="updateEducates()"
                                        >更新</el-button
                                    >
                                    <el-button type="info">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="7">
                    <el-descriptions
                        title="基本信息预览"
                        :column="1"
                        border
                        class="preview-tab"
                        v-if="isDataOne"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                我的账号
                            </template>
                            <span>{{ basicForm.i_stuid }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                我的姓名
                            </template>
                            <span>{{ basicForm.i_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                我的性别
                            </template>
                            <span>{{
                                basicForm.i_gender == 0 ? "男" : "女"
                            }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-timer"></i>
                                出生日期
                            </template>
                            <span>{{ basicForm.i_birth.slice(0, 10) }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                我的民族
                            </template>
                            <span>{{ basicForm.i_nation }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-trophy-1"></i>
                                学校名称
                            </template>
                            <span>{{ basicForm.i_university }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                我的分院
                            </template>
                            <span>{{ basicForm.i_college }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-money"></i>
                                我的班级
                            </template>
                            <span>{{ basicForm.i_class }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions
                        title="教育信息预览"
                        :column="1"
                        border
                        class="preview-tab"
                        v-if="isDataTwo"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                学校
                            </template>
                            <span>{{ educateForm.i_university }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-trophy"></i>
                                我的专业
                            </template>
                            <span>{{ educateForm.i_profession }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-time"></i>
                                入学时间
                            </template>
                            <span>{{
                                educateForm.i_enter_time.slice(0, 10)
                            }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                我的学历
                            </template>
                            <span>{{ educateForm.i_background }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
import {
    updateBasic,
    getBasic,
} from "@/api/personal";
export default {
    name: "PersonalInfo",
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

        return {
            isDataOne: false,
            isDataTwo: false,
            tabActiveName: "first",
            basicForm: {
                i_stuid: this.$store.state.user.rolesData.r_serial,
                i_name: this.$store.state.user.rolesData.r_name,
                i_gender: 0,
                i_birth: "",
                i_nation: "",
                i_university: "",
                i_college: "",
                i_class: "",
            },
            educateForm: {
                i_university: "",
                i_profession: "",
                i_enter_time: "",
                i_background: "",
            },
            basicRules: {
                i_gender: [
                    {
                        required: true,
                        message: "性别是必填项",
                        trigger: "change blur focus",
                    },
                ],
                i_birth: [
                    {
                        required: true,
                        message: "请选择时间",
                        trigger: "change blur focus",
                    },
                ],
                i_nation: [
                    {
                        required: true,
                        message: "民族是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_university: [
                    {
                        required: true,
                        message: "学校名称是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_college: [
                    {
                        required: true,
                        message: "学校院系是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_class: [
                    {
                        required: true,
                        message: "班级是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
            },
            educateRules: {
                i_university: [
                    {
                        required: true,
                        message: "学校名称是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_profession: [
                    {
                        required: true,
                        message: "专业是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_enter_time: [
                    {
                        required: true,
                        message: "请选择时间",
                        trigger: "change blur focus",
                    },
                ],
                i_background: [
                    {
                        required: true,
                        message: "学历是必填项",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
            },
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        async updates(num) {
            // let obj = Object.assign(this.basicForm, this.educateForm);
            let obj = null;
            if(num==1){
                obj = this.basicForm;
            }else{
                obj = this.educateForm;
            }
            let r_role = this.$store.state.user.rolesData.r_role;
            obj.rid = r_role;
            let test = await updateBasic(obj);
            if (test) {
                this.$message({
                    type: "success",
                    message: "数据修改成功",
                });
                this.getInfo();
            }
        },
        updateBasics() {
            this.$refs.basicFormRef.validate((valid) => {
                if (valid) {
                    this.updates(1);
                    this.isDataOne = true;
                } else {
                    this.$message({
                        type: "error",
                        message: "不好意思, 您数据还不完善, 请继续填写!!",
                    });
                }
            });
        },
        updateEducates() {
            this.$refs.educateFormRef.validate((valid) => {
                if (valid) {
                    this.updates(2);
                    this.isDataTwo = true;
                } else {
                    this.$message({
                        type: "error",
                        message: "不好意思, 您数据还不完善, 请继续填写!!",
                    });
                }
            });
        },
        async getInfo() {
            let r_serial = this.$store.state.user.rolesData.r_serial;
            let res = await getBasic(r_serial);
            console.log(res);
            if (res.data.length == 0) {
                this.$message({
                    type: "warning",
                    message: "您还没有基本信息,请填写",
                });
            } else {
                this.basicForm = res.data[0];
                this.educateForm = res.data[0];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-container {
    .info-tab {
        max-width: 800px;
    }
    .preview-tab {
        max-width: 700px;
        margin-bottom: 30px;
    }
}
</style>
