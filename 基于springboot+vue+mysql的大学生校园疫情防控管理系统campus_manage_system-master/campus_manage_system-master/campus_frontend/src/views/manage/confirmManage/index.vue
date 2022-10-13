<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="confirmManage" :key="1">
            <!-- 标题 -->
            <el-divider content-position="left" class="title"
                >确诊管理</el-divider
            >

            <!-- 搜索与添加 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="请输入需要搜索的人员姓名"
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryConfirm()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addMessage()"
                        >添加确诊信息</el-button
                    >
                </el-col>
            </el-row>

            <!-- 增删改查 -->
            <el-table :data="newConfirmList" border stripe>
                <el-table-column
                    align="center"
                    label="#"
                    type="index"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="编号"
                    prop="m_stuid"
                    width="140px"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="姓名"
                    prop="m_name"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="性别"
                    prop="m_gender"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="学院"
                    prop="m_college"
                    width="125px"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="班级"
                    prop="m_class"
                    width="150px"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="宿舍楼"
                    prop="m_building"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="宿舍号"
                    prop="m_build_num"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="确诊来源"
                    prop="m_inject_source"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="确诊时间"
                    prop="m_inject_date"
                ></el-table-column>
                <el-table-column align="center" label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showConfirm(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeConfirm(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="(queryInfo.total = confirmList.length)"
            >
            </el-pagination>

            <el-drawer
                title="确诊者信息添加"
                :visible.sync="confirmDrawer"
                direction="rtl"
                :before-close="handleConfirmClose"
                class="drawer_one"
            >
                <el-form
                    ref="confirmFormRef"
                    :model="confirmForm"
                    :rules="confirmRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input
                            v-model="confirmForm.m_stuid"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input
                            v-model="confirmForm.m_name"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="m_gender">
                        <el-input
                            v-model="confirmForm.m_gender"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input
                            v-model="confirmForm.m_college"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input
                            v-model="confirmForm.m_class"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍楼" prop="m_building">
                        <el-input
                            v-model="confirmForm.m_building"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍号" prop="m_build_num">
                        <el-input
                            v-model="confirmForm.m_build_num"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确诊来源" prop="m_inject_source">
                        <el-input
                            v-model="confirmForm.m_inject_source"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确诊时间" prop="m_inject_date">
                        <el-date-picker
                            v-model="confirmForm.m_inject_date"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertConfirm()"
                            >添加</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="修改确诊者信息"
                :visible.sync="confirmDialog"
                width="50%"
            >
                <el-form
                    ref="confirmUpdateRef"
                    :model="confirmForm"
                    :rules="confirmRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input
                            v-model="confirmForm.m_stuid"
                            placeholder="请填写信息~"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input
                            v-model="confirmForm.m_name"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="m_gender">
                        <el-input
                            v-model="confirmForm.m_gender"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input
                            v-model="confirmForm.m_college"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input
                            v-model="confirmForm.m_class"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍楼" prop="m_building">
                        <el-input
                            v-model="confirmForm.m_building"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍号" prop="m_build_num">
                        <el-input v-model="confirmForm.m_build_num"></el-input>
                    </el-form-item>
                    <el-form-item label="确诊来源" prop="m_inject_source">
                        <el-input
                            v-model="confirmForm.m_inject_source"
                            placeholder="请填写信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确诊时间" prop="m_inject_date">
                        <el-date-picker
                            v-model="confirmForm.m_inject_date"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateConfirm()"
                            >修改</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {
    allInfection,
    addInfection,
    alterInfection,
    getInfection,
    deleteInfection,
} from "@/api/manage";
export default {
    name: "ConfirmManage",
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            confirmList: [],
            // 控制抽屉打开
            confirmDrawer: false,
            confirmForm: {
                m_stuid: "",
                m_name: "",
                m_gender: "",
                m_college: "",
                m_class: "",
                m_building: "",
                m_build_num: "",
                m_inject_source: "",
                m_inject_date: "",
            },
            confirmDialog: false,
            confirmRules: {
                m_stuid: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_name: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_gender: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_college: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_class: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_building: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_build_num: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_inject_source: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_inject_date: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    created() {
        this.getAllConfirm();
    },
    methods: {
        addMessage(){
            this.confirmForm = {}
            this.confirmDrawer = true;
        },
        async getAllConfirm() {
            let res = await allInfection();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "男" : "女";
                item.m_inject_date = item.m_inject_date.slice(0, 10);
            });
            this.confirmList = res.data;
            console.log(this.confirmList);
        },
        async queryConfirm() {
            if (this.queryInfo.query.length > 0) {
                let res = await getInfection(this.queryInfo.query);
                this.confirmList = res.data;
                console.log(this.confirmList);
            } else {
                this.getAllConfirm();
            }
        },
        async insertConfirm() {
            this.$refs.confirmFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addInfection(this.confirmForm);
                    if (res.status === 200) {
                        this.getAllConfirm();
                        this.$message({
                            type: "success",
                            message: "确诊者添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "确诊者已存在",
                        });
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "信息未完善~",
                    });
                }
            });
        },
        async showConfirm(row) {
            this.confirmDialog = true;
            this.confirmForm = row;
        },
        async updateConfirm() {
            this.$refs.confirmUpdateRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterInfection(this.confirmForm);
                    if (res.status === 200) {
                        this.getAllConfirm();
                        this.$message({
                            type: "success",
                            message: "确诊者修改成功",
                        });
                        this.confirmDialog = false;
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "信息未完善~",
                    });
                }
            });
        },
        async removeConfirm(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteInfection(row.id);
                if (res.status === 200) {
                    this.getAllConfirm();
                    this.$message({
                        type: "success",
                        message: "感染者删除成功",
                    });
                }
            });
        },
        handleConfirmClose(done) {
            done();
        },
        handleSizeChange(val) {
            this.queryInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.queryInfo.pageNum = val;
        },
    },
    computed: {
        newConfirmList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.confirmList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.confirmManage {
    .el-divider {
        height: 2px;
    }
    .el-divider__text {
        font-size: 25px;
    }
    .el-row {
        margin: 40px 0px 20px 0px;
    }
    .el-table {
        margin-bottom: 20px;
    }
}
</style>
