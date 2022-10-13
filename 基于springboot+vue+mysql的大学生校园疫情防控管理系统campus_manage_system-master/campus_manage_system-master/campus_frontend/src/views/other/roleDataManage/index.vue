<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="personal-container" :key="1">
            <el-row :gutter="70">
                <el-col :span="15">
                    <el-tabs v-model="tabActiveName" class="info-tab">
                        <el-tab-pane label="登录角色" name="first">
                            <!-- 搜索与添加 -->
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-input
                                        placeholder="请输入角色姓名"
                                        v-model="roleQueryInfo.query"
                                    >
                                        <el-button
                                            slot="append"
                                            icon="el-icon-search"
                                            @click="queryRole()"
                                        ></el-button>
                                    </el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button
                                        type="primary"
                                        @click="addAccount()"
                                        >添加角色</el-button
                                    >
                                </el-col>
                            </el-row>

                            <!-- 增删改查 -->
                            <el-table :data="newRoleList" border stripe>
                                <el-table-column
                                    align="center"
                                    label="#"
                                    type="index"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="编号"
                                    prop="r_account"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="姓名"
                                    prop="r_name"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="角色"
                                    prop="r_role"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="操作"
                                    width="180px"
                                >
                                    <template slot-scope="scope">
                                        <el-button
                                            type="primary"
                                            icon="el-icon-edit"
                                            size="mini"
                                            @click="showRole(scope.row)"
                                            >编辑</el-button
                                        >
                                        <el-button
                                            type="danger"
                                            icon="el-icon-delete"
                                            size="mini"
                                            @click="removeRole(scope.row)"
                                            >删除</el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="roleQueryInfo.pageNum"
                                :page-sizes="[1, 2, 5, 10]"
                                :page-size="roleQueryInfo.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="(roleQueryInfo.total = roleList.length)"
                            >
                            </el-pagination>

                            <el-drawer
                                title="角色添加"
                                :visible.sync="roleDrawer"
                                direction="rtl"
                                :before-close="handleRoleClose"
                                class="drawer_one"
                            >
                                <el-form
                                    ref="roleFormRef"
                                    :model="roleForm"
                                    :rules="roleRules"
                                    label-position="left"
                                    label-width="100px"
                                    style="padding: 20px; padding-top: 0px"
                                >
                                    <el-form-item label="账号" prop="r_account">
                                        <el-input
                                            v-model="roleForm.r_account"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="r_pwd">
                                        <el-input
                                            v-model="roleForm.r_pwd"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="姓名" prop="r_name">
                                        <el-input
                                            v-model="roleForm.r_name"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="编号" prop="r_serial">
                                        <el-input
                                            v-model="roleForm.r_serial"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="角色" prop="r_role">
                                        <el-input
                                            v-model="roleForm.r_role"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label-width="0px">
                                        <el-button
                                            type="primary"
                                            @click="insertRole()"
                                            >添加</el-button
                                        >
                                        <el-button type="pain">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-drawer>

                            <el-dialog
                                title="修改角色"
                                :visible.sync="roleDialog"
                                width="50%"
                            >
                                <el-form
                                    ref="roleFormRef"
                                    :model="roleForm"
                                    :rules="roleRules"
                                    label-position="left"
                                    label-width="100px"
                                    style="padding: 20px; padding-top: 0px"
                                >
                                    <el-form-item label="编号" prop="r_account">
                                        <el-input
                                            v-model="roleForm.r_account"
                                            placeholder="请输入内容~"
                                            disabled
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="姓名" prop="r_name">
                                        <el-input
                                            v-model="roleForm.r_name"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="角色" prop="r_role">
                                        <el-input
                                            v-model="roleForm.r_role"
                                            placeholder="请输入内容~"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label-width="0px">
                                        <el-button
                                            type="primary"
                                            @click="updateRole()"
                                            >修改</el-button
                                        >
                                        <el-button type="pain">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                        </el-tab-pane>
                        <el-tab-pane label="作者信息" name="second">
                            <el-form
                                ref="authorFormRef"
                                :model="authorForm"
                                :rules="authorRules"
                                label-position="top"
                            >
                                <el-form-item label="作者昵称" prop="a_name">
                                    <el-input
                                        v-model="authorForm.a_name"
                                        placeholder="请输入内容~"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="作者手机" prop="a_phone">
                                    <el-input
                                        v-model="authorForm.a_phone"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="作者邮箱" prop="a_email">
                                    <el-input
                                        v-model="authorForm.a_email"
                                        placeholder="请输入内容~"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="updateAuthorInfo()"
                                        >更新</el-button
                                    >
                                    <el-button type="pain">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="7">
                    <el-descriptions
                        title="作者信息预览"
                        :column="1"
                        border
                        class="preview-tab"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                我的昵称
                            </template>
                            <span>{{ authorForm.a_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                我的手机
                            </template>
                            <span>{{ authorForm.a_phone }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                我的邮箱
                            </template>
                            <span>{{ authorForm.a_email }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </div>
    </transition-group>
</template>

<script>
import {
    allRole,
    addRole,
    alterRole,
    getRole,
    deleteRole,
    allAuthor,
    alterAuthor,
} from "@/api/other";
export default {
    name: "RoleDataManage",
    created() {
        this.getAllRole();
        this.getAllAuthor();
    },
    data() {
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");
        const phone = new RegExp(
            "/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/"
        );
        const email = new RegExp(
            "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/"
        );
        let InvalidString = (rule, value, callback) => {
            // 验证非法字符串
            if (pat.test(value) === true) {
                callback(new Error("包含非法字符串、只可以是字母数字或汉字"));
            } else {
                callback();
            }
        };
        let InvalidPhone = (rule, value, callback) => {
            // 验证手机号合法性
            if (phone.test(value) === true) {
                callback(new Error("包括非法字符、只可以是数字"));
            } else {
                callback();
            }
        };
        let InvalidEmail = (rule, value, callback) => {
            // 验证手机号合法性
            if (email.test(value) === true) {
                callback(new Error("邮箱不合法"));
            } else {
                callback();
            }
        };
        return {
            tabActiveName: "first",
            roleQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            roleList: [],
            // 控制抽屉打开
            roleDrawer: false,
            roleForm: {
                r_account: "",
                r_name: "",
                r_role: "",
                r_serial: "",
                r_pwd: "",
            },
            roleDialog: false,
            roleRules: {
                r_account: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_pwd: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_name: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_serial: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_role: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
            authorForm: {
                a_name: "",
                a_phone: "",
                a_email: "",
            },
            authorRules: {
                a_name: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                a_phone: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                a_email: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    methods: {
        addAccount(){
            this.roleForm = {}
            this.roleDrawer = true;
        },
        async getAllRole() {
            let res = await allRole();
            res.data.forEach((item) => {
                if (item.r_role == 1) {
                    item.r_role = "学生";
                } else if (item.r_role == 2) {
                    item.r_role = "老师";
                } else {
                    item.r_role = "工作人员";
                }
            });
            this.roleList = res.data;
        },
        async getAllAuthor() {
            let res = await allAuthor();
            this.authorForm = res.data[0];
        },
        async queryRole() {
            if (this.roleQueryInfo.query.length > 0) {
                let res = await getRole(this.roleQueryInfo.query);
                this.roleList = res.data;
                console.log(this.roleList);
            } else {
                this.getAllRole();
            }
        },
        insertRole() {
            this.$refs.roleFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addRole(this.roleForm);
                    if (res.status === 200) {
                        this.getAllRole();
                        this.$message({
                            type: "success",
                            message: "角色添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "角色已存在",
                        });
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息~",
                    });
                }
            });
        },
        async showRole(row) {
            this.roleDialog = true;
            this.roleForm = row;
        },
        updateRole() {
            this.$refs.roleFormRef.validate(async (valid) => {
                if (valid) {
                    try{
                        let role = this.roleForm.r_role
                        let param = {
                            r_name: this.roleForm.r_name,
                            r_account: this.roleForm.r_account,
                            r_role: (role == '学生') ? 1 : ((role == '老师') ? 2 : 3) 
                        }
                        let res = await alterRole(param);
                        let localData = JSON.parse(localStorage.getItem('rolesData'));
                        localData.r_name = param.r_name;
                        localStorage.setItem('rolesData',JSON.stringify(localData));
                        if (res.status === 200) {
                            this.getAllRole();
                            this.$message({
                                type: "success",
                                message: "角色修改成功",
                            });
                            this.roleDialog = false;
                        }
                    }catch(e){
                        this.$message({
                            type: "success",
                            message: "角色修改失败" + JSON.stringify(e),
                        });
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息~",
                    });
                }
            });
        },
        updateAuthorInfo() {
            this.$refs.authorFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterAuthor(this.authorForm);
                    if (res.status === 200) {
                        this.getAllAuthor();
                        this.$message({
                            type: "success",
                            message: "作者信息修改成功",
                        });
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息~",
                    });
                }
            });
        },
        async removeRole(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteRole(row.id);
                if (res.status === 200) {
                    this.getAllRole();
                    this.$message({
                        type: "success",
                        message: "角色删除成功",
                    });
                }
            });
        },
        handleRoleClose(done) {
            done();
        },
        handleSizeChange(val) {
            this.roleQueryInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.roleQueryInfo.pageNum = val;
        },
    },
    computed: {
        workTime() {
            return (
                this.authorForm.a_start_time + "-" + this.authorForm.a_end_time
            );
        },
        newRoleList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.roleList.slice(
                (this.roleQueryInfo.pageNum - 1) * this.roleQueryInfo.pageSize,
                this.roleQueryInfo.pageNum * this.roleQueryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-container {
    padding-left: 20px;
    .info-tab {
        max-width: 800px;
        .el-row {
            margin: 10px 0px 20px 0px;
        }
        .el-table {
            margin-bottom: 20px;
        }
    }
    .preview-tab {
        max-width: 700px;
        margin-bottom: 30px;
    }
}
</style>
