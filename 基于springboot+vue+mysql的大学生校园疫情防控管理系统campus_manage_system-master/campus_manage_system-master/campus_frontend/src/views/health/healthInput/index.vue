<template>
    <div class="health-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
            <el-row :gutter="20" :key="1">
                <el-col :span="10">
                    <el-tabs v-model="tabActiveName">
                        <el-tab-pane label="申报人信息" name="first">
                            <el-form
                                ref="applyFormRef"
                                :model="applyForm"
                                :rules="applyRules"
                                label-position="top"
                            >
                                <el-form-item label="姓名" prop="i_name">
                                    <el-input
                                        v-model="applyForm.i_name"
                                        :disabled="true"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="证件号码" prop="i_idcard">
                                    <el-input
                                        v-model="applyForm.i_idcard"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="i_phone">
                                    <el-input
                                        v-model="applyForm.i_phone"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="i_gender">
                                    <el-radio
                                        v-model="applyForm.i_gender"
                                        :label="0"
                                        border
                                        >男</el-radio
                                    >
                                    <el-radio
                                        v-model="applyForm.i_gender"
                                        :label="1"
                                        border
                                        >女</el-radio
                                    >
                                </el-form-item>
                                <el-form-item label="出生日期" prop="i_birth">
                                    <el-date-picker
                                        v-model="applyForm.i_birth"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    label="国籍/地区"
                                    prop="i_nationality"
                                >
                                    <el-input
                                        v-model="applyForm.i_nationality"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="户籍所在地"
                                    prop="i_domicile"
                                >
                                    <el-input
                                        v-model="applyForm.i_domicile"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="籍贯" prop="i_native">
                                    <el-input
                                        v-model="applyForm.i_native"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="居住地址" prop="i_address">
                                    <el-input
                                        v-model="applyForm.i_address"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="insertInfoer()"
                                        >添加</el-button
                                    >
                                    <el-button type="pain">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="健康信息" name="second">
                            <el-form
                                ref="healthFormRef"
                                :model="healthForm"
                                :rules="healthRules"
                                label-position="top"
                            >
                                <el-form-item label="编号" prop="m_stuid">
                                    <el-input
                                        v-model="healthForm.m_stuid"
                                        :disabled="true"
                                         placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" prop="m_name">
                                    <el-input
                                        v-model="healthForm.m_name"
                                        :disabled="true"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="学院" prop="m_college">
                                    <el-input
                                        v-model="healthForm.m_college"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="班级" prop="m_class">
                                    <el-input
                                        v-model="healthForm.m_class"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="近期居住地"
                                    prop="m_recent_resi"
                                >
                                    <el-input
                                        v-model="healthForm.m_recent_resi"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="近期接触地"
                                    prop="m_recent_touch"
                                >
                                    <el-input
                                        v-model="healthForm.m_recent_touch"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="接触日期"
                                    prop="m_recent_date"
                                >
                                    <!-- 时间控件会出现提交数据后少一天的BUG，加上value-format使日期写死即可 -->
                                    <el-date-picker
                                        v-model="healthForm.m_touch_date"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    label="身体状况"
                                    prop="m_health_status"
                                >
                                    <el-input
                                        v-model="healthForm.m_health_status"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="症状描述"
                                    prop="m_status_des"
                                >
                                    <el-input
                                        v-model="healthForm.m_status_des"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="insertMessage()"
                                        >添加</el-button
                                    >
                                    <el-button type="pain">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="新冠疫苗接种记录" name="third">
                            <el-form
                                ref="inoculateFormRef"
                                :model="inoculateForm"
                                :rules="inoculateRules"
                                label-position="top"
                            >
                                <el-form-item label="编号" prop="r_stuid">
                                    <el-input
                                        v-model="inoculateForm.r_stuid"
                                        :disabled="true"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" prop="r_name">
                                    <el-input
                                        v-model="inoculateForm.r_name"
                                        :disabled="true"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="疫苗名称" prop="r_vaccine">
                                    <el-input
                                        v-model="inoculateForm.r_vaccine"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="针次" prop="r_inject">
                                    <el-input
                                        v-model="inoculateForm.r_inject"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="批号" prop="r_num">
                                    <el-input
                                        v-model="inoculateForm.r_num"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="厂家名称"
                                    prop="r_manufacturer"
                                >
                                    <el-input
                                        v-model="inoculateForm.r_manufacturer"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="接种单位"
                                    prop="r_vac_unit"
                                >
                                    <el-input
                                        v-model="inoculateForm.r_vac_unit"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="接种时间"
                                    prop="r_vac_date"
                                >
                                    <el-date-picker
                                        v-model="inoculateForm.r_vac_date"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="insertRecord()"
                                        >添加</el-button
                                    >
                                    <el-button type="pain">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="14">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-descriptions
                                title="申请人信息预览"
                                :column="1"
                                border
                                class="preview-tab"
                                v-if="isDataOne"
                            >
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-key"></i>
                                        姓名
                                    </template>
                                    <span>{{ applyForm.i_name }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-user"></i>
                                        证件号码
                                    </template>
                                    <span>{{ applyForm.i_idcard }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-male"></i>
                                        手机号码
                                    </template>
                                    <span>{{ applyForm.i_phone }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-timer"></i>
                                        性别
                                    </template>
                                    <span>{{
                                        applyForm.i_gender == 0 ? '男' : '女'
                                    }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-medal-1"></i>
                                        出生日期
                                    </template>
                                    <span>{{ applyForm.i_birth }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-trophy-1"></i>
                                        国籍/地区
                                    </template>
                                    <span>{{ applyForm.i_nationality }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-medal-1"></i>
                                        户籍所在地
                                    </template>
                                    <span>{{ applyForm.i_domicile }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-money"></i>
                                        籍贯
                                    </template>
                                    <span>{{ applyForm.i_native }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-money"></i>
                                        居住地址
                                    </template>
                                    <span>{{ applyForm.i_address }}</span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="12">
                            <el-descriptions
                                title="健康信息预览"
                                :column="1"
                                border
                                v-if="isDataTwo"
                            >
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        编号
                                    </template>
                                    <span>{{ healthForm.m_stuid }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        姓名
                                    </template>
                                    <span>{{ healthForm.m_name }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        学院
                                    </template>
                                    <span>{{ healthForm.m_college }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        班级
                                    </template>
                                    <span>{{ healthForm.m_class }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        近期居住地
                                    </template>
                                    <span>{{ healthForm.m_recent_resi }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-trophy"></i>
                                        近期接触地
                                    </template>
                                    <span>{{ healthForm.m_recent_touch }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-time"></i>
                                        接触时间
                                    </template>
                                    <span>{{ healthForm.m_touch_date }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-medal-1"></i>
                                        健康状况
                                    </template>
                                    <span>{{
                                        healthForm.m_health_status
                                    }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        状况描述
                                    </template>
                                    <span>{{ healthForm.m_status_des }}</span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                    <el-descriptions
                        title="新冠疫苗接种预览"
                        :column="1"
                        border
                        style="margin-top: 30px"
                        v-if="isDataThree"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                编号
                            </template>
                            <span>{{ inoculateForm.r_stuid }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                姓名
                            </template>
                            <span>{{ inoculateForm.r_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                疫苗名称
                            </template>
                            <span>{{ inoculateForm.r_vaccine }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                针次
                            </template>
                            <span>{{ inoculateForm.r_inject }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                批号
                            </template>
                            <span>{{ inoculateForm.r_num }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                厂家名称
                            </template>
                            <span>{{ inoculateForm.r_manufacturer }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                接种单位
                            </template>
                            <span>{{ inoculateForm.r_vac_unit }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                接种时间
                            </template>
                            <span>{{ inoculateForm.r_vac_date }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
import {
    alterInfoer,
    alterMessage,
    alterRecord,
    getMessage,
    getRecord,
    getInfoer
} from "@/api/health";
export default {
    name: "HealthInput",
    data() {
        var reg1 = /^[\u4E00-\u9FA5]+$/;

        // 账号密码验证(匿名函数)
        let InvalidContext = (rule, value, callback) => {
            // 验证非法字符串
            if (reg1.test(value) === true) {
                callback(new Error("包含非法字符串、只可以是汉字"));
            } else {
                callback();
            }
        };

        // 字母数字汉字正则
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");
        // 手机号码正则
        const phone = new RegExp(
            "/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/"
        );
        // 邮箱正则
        const email = new RegExp(
            "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/"
        );
        // 证件号码正则
        const idCard = new RegExp(
            "/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"
        );

        // 账号密码验证(匿名函数)
        let InvalidString = (rule, value, callback) => {
            // 验证非法字符串
            if (pat.test(value) === true) {
                callback(new Error("包含非法字符串、只可以是字母数字或汉字"));
            } else {
                callback();
            }
        };

        // 手机号码验证(匿名函数)
        let InvalidPhone = (rule, value, callback) => {
            // 验证手机号合法性
            if (phone.test(value) === true) {
                callback(new Error("包括非法字符、只可以是数字"));
            } else {
                callback();
            }
        };

        // 邮箱验证(匿名函数)
        let InvalidEmail = (rule, value, callback) => {
            // 验证手机号合法性
            if (email.test(value) === true) {
                callback(new Error("邮箱不合法"));
            } else {
                callback();
            }
        };

        // 证件号码验证(匿名函数)
        let InvalidIdCard = (rule, value, callback) => {
            // 验证手机号合法性
            if (email.idCard(value) === true) {
                callback(new Error("证件号码不合法"));
            } else {
                callback();
            }
        };



        return {
            isDataOne: false,
            isDataTwo: false,
            isDataThree: false,
            tabActiveName: "first",
            applyForm: {
                i_name: this.$store.state.user.rolesData.r_name,
                i_idcard: "",
                i_phone: "",
                i_gender: 0,
                i_birth: "",
                i_nationality: "",
                i_domicile: "",
                i_native: "",
                i_address: "",
            },
            healthForm: {
                m_stuid: this.$store.state.user.rolesData.r_serial,
                m_name: this.$store.state.user.rolesData.r_name,
                m_college: "",
                m_recent_resi: "",
                m_recent_touch: "",
                m_recent_touch: "",
                m_touch_date: "",
                m_health_status: "",
                m_status_des: "",
            },
            inoculateForm: {
                r_stuid: this.$store.state.user.rolesData.r_serial,
                r_name: this.$store.state.user.rolesData.r_name,
                r_vaccine: "",
                r_inject: "",
                r_num: "",
                r_manufacturer: "",
                r_vac_unit: "",
                r_vac_date: "",
            },
            applyRules: {
                i_idcard: [
                    { 
                        min: 18,
                        max: 18,
                        required: true, 
                        message: "必填项, 请检查身份证号码是否有18位",
                        trigger: "change blur focus"
                    },
                ],
                i_phone: [
                    { 
                        min: 11,
                        max: 11,
                        required: true, 
                        message: "必填项, 请检查手机号码是否有11位",
                        trigger: "change blur focus"
                    },
                ],
                i_gender: [
                    { 
                        required: true, 
                        message: "必填项",
                        trigger: "change blur focus"
                    },
                ],
                i_birth: [
                    { 
                        required: true, 
                        message: "必填项",
                        trigger: "change blur focus"
                    },
                ],
                i_nationality: [
                    { 
                        required: true, 
                        message: "必填项",
                        trigger: "change blur focus"
                    },
                ],
                i_domicile: [
                    { 
                        required: true, 
                        message: "必填项",
                        trigger: "change blur focus"
                    },
                ],
                i_native: [
                    { 
                        required: true, 
                        message: "必填项",
                        trigger: "change blur focus"
                    },
                ],
                i_address: [
                    { 
                        required: true, 
                        message: "必填项",
                        trigger: "change blur focus"
                    },
                ],
            },
            healthRules: {
                m_recent_date:[
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_class: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_college: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_resi: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_touch: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_touch: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_touch_date: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_health_status: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                m_status_des: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
            },
            inoculateRules: {
                r_vaccine: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                r_inject: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                r_num: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                r_manufacturer: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                r_vac_unit: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
                r_vac_date: [
                    {
                        required: true,
                        message: "必填项",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    created() {
        this.getInfoers();
        this.getMessages();
        this.getRecords();
    },
    methods: {
        // 根据姓名查询+数据插入
        async insertInfoer() {
            this.$refs.applyFormRef.validate(async (valid)=>{
                if(valid){
                    let pid = this.$store.state.user.rolesData.r_role;
                    this.applyForm.pid = pid;
                    let res = await alterInfoer(this.applyForm);
                    this.$message({
                        type:'success',
                        message:'数据修改成功!'
                    })
                    this.getInfoers();
                    this.isDataOne = true;
                }else{
                    this.$message({
                        type:'warning',
                        message:'请完善输入信息谢谢!'
                    })
                }
            })
        },
        async insertMessage() {
            this.$refs.applyFormRef.validate(async (valid)=>{
                if(valid){
                    let pid = this.$store.state.user.rolesData.r_role;
                    this.healthForm.pid = pid;
                    let res = await alterMessage(this.healthForm);
                    this.$message({
                        type:'success',
                        message:'数据修改成功!'
                    })
                    this.getMessages();
                    this.isDataTwo = true;
                }else{
                    this.$message({
                        type:'warning',
                        message:'请完善输入信息谢谢!'
                    })
                }
            });
        },
        async insertRecord() {
            this.$refs.inoculateFormRef.validate(async (valid)=>{
                if(valid){
                    let pid = this.$store.state.user.rolesData.r_role;
                    this.inoculateForm.pid = pid;
                    let res = await alterRecord(this.inoculateForm);
                    this.$message({
                        type:'success',
                        message:'数据修改成功!'
                    })
                    this.getRecords();
                    this.isDataThree = true;
                }else{
                    this.$message({
                        type:'warning',
                        message:'请完善输入信息谢谢!'
                    })
                }
            });
        },
        async getInfoers() {
            let names = this.$store.state.user.rolesData.r_name
            let res = await getInfoer(names);
            if(res.data.length != 0){
                res.data[0].i_birth = res.data[0].i_birth.slice(0,10);
                this.applyForm = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'请添加或更改数据!'
                })
            }
        },
        async getMessages() {
            let names = this.$store.state.user.rolesData.r_name
            let res = await getMessage(names);
            if(res.data.length != 0){
                res.data[0].m_touch_date = res.data[0].m_touch_date.slice(0,10);
                this.healthForm = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'请添加或更改数据!'
                })
            }
        },
        async getRecords() {
            let names = this.$store.state.user.rolesData.r_name
            let res = await getRecord(names);
            if(res.data.length != 0){
                res.data[0].r_vac_date = res.data[0].r_vac_date.slice(0,10);
                this.inoculateForm = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'请添加或更改数据!'
                })
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
