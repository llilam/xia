<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="alter-container" :key="1">
            <h3>修改密码</h3>
            <el-divider content-position="right">校园疫情管理系统</el-divider>
            <el-form
                :model="alterForm"
                :rules="alterRules"
                ref="alterFormRef"
                label-width="100px"
                :label-position="labelPosition"
            >
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="alterForm.newPassword" placeholder="请输入新密码~"></el-input>
                </el-form-item>
                <el-form-item label="确定新密码" prop="checkPassword">
                    <el-input v-model="alterForm.checkPassword" placeholder="请确认新密码~"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePassword">修改密码</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </transition-group>
</template>

<script>
import {updatePwd} from '@/api/personal'
export default {
    name: "AlterPassword",
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
            labelPosition: "right",
            alterForm: {
                newPassword: "",
                checkPassword: "",
            },
            alterRules: {
                oldPassword: [
                    { required: true, message: "密码是必填项" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                newPassword: [
                    { required: true, message: "密码是必填项" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                checkPassword: [
                    { required: true, message: "密码是必填项" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
            },
        };
    },
    methods:{
        updatePassword(){
            console.log(this.$refs.alterFormRef);
            this.$refs.alterFormRef.validate(async (valid)=>{
                if(valid){
                    let obj = {
                        r_account: this.$store.state.user.rolesData.r_account,
                        r_pwd: this.alterForm.newPassword
                    }
                    console.log(obj);
                    let res = await updatePwd(obj);
                    if(res.data.length >= 15) {
                        localStorage.clear();
                        this.$message({
                            message: '密码修改成功, 即将跳转登录页, 请重新登录',
                            type: 'success'
                        });
                        setTimeout(()=>{
                            this.$router.push({ path: this.redirect || "/login" });
                        },3000);
                    }else{
                        this.$message({
                            message: '密码修改失败',
                            type: 'error'
                        });
                    }
                }else{
                    this.$message({
                        message: '请输入密码,谢谢',
                        type: 'warning'
                    });
                }
            });
        }
    }
};
</script>

<style>
.alter-container {
    max-width: 400px;
}
</style>
