<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="contactsRick-Manage" :key="1">
            <!-- 标题 -->
            <el-divider content-position="left" class="title"
                >密切接触者信息管理</el-divider
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
                            @click="queryContacts()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addMessage"
                        >添加密切接触者信息</el-button
                    >
                </el-col>
            </el-row>

            <!-- 增删改查 -->
            <el-table :data="newContactsList" border stripe>
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
                    prop="m_building_num"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="近期居住"
                    prop="m_recent_place"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="近期接触史"
                    prop="m_recent_history"
                    width="120px"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="健康状况"
                    prop="m_health_status"
                ></el-table-column>
                <el-table-column align="center" label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showContacts(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeContacts(scope.row)"
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
                :total="(queryInfo.total = contactsList.length)"
            >
            </el-pagination>

            <el-drawer
                title="确诊者信息添加"
                :visible.sync="contactsDrawer"
                direction="rtl"
                :before-close="handleContactsClose"
                class="drawer_one"
            >
                <el-form
                    ref="contactsFormRef"
                    :model="contactsForm"
                    :rules="contactsRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input
                            v-model="contactsForm.m_stuid"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input
                            v-model="contactsForm.m_name"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="m_gender">
                        <el-input
                            v-model="contactsForm.m_gender"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input
                            v-model="contactsForm.m_college"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input
                            v-model="contactsForm.m_class"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍楼" prop="m_building">
                        <el-input
                            v-model="contactsForm.m_building"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="宿舍号"
                        prop="m_building_num"
                        placeholder="请输入信息~"
                    >
                        <el-input
                            v-model="contactsForm.m_building_num"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期居住" prop="m_recent_place">
                        <el-input
                            v-model="contactsForm.m_recent_place"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期接触史" prop="m_recent_history">
                        <el-input
                            v-model="contactsForm.m_recent_history"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="健康状况" prop="m_health_status">
                        <el-input
                            v-model="contactsForm.m_health_status"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertContacts()"
                            >添加</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="修改确诊者信息"
                :visible.sync="contactsDialog"
                width="50%"
            >
                <el-form
                    ref="contactsFormRef"
                    :model="contactsForm"
                    :rules="contactsRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input
                            v-model="contactsForm.m_stuid"
                            placeholder="请输入信息~"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input
                            v-model="contactsForm.m_name"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="m_gender">
                        <el-input
                            v-model="contactsForm.m_gender"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input
                            v-model="contactsForm.m_college"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input
                            v-model="contactsForm.m_class"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍楼" prop="m_building">
                        <el-input
                            v-model="contactsForm.m_building"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍号" prop="m_building_num">
                        <el-input
                            v-model="contactsForm.m_building_num"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期居住" prop="m_recent_place">
                        <el-input
                            v-model="contactsForm.m_recent_place"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期接触史" prop="m_recent_history">
                        <el-input
                            v-model="contactsForm.m_recent_history"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="健康状况" prop="m_health_status">
                        <el-input
                            v-model="contactsForm.m_health_status"
                            placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateContacts()"
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
    allClose,
    addClose,
    alterClose,
    getClose,
    deleteClose,
} from "@/api/manage";
export default {
    name: "ContactsManage",
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            contactsList: [],
            // 控制抽屉打开
            contactsDrawer: false,
            contactsForm: {
                m_stuid: "",
                m_name: "",
                m_gender: "",
                m_college: "",
                m_class: "",
                m_building: "",
                m_building_num: "",
                m_recent_place: "",
                m_recent_history: "",
                m_health_status: "",
            },
            contactsDialog: false,
            contactsRules: {
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
                m_building_num: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_place: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_history: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_health_status: [
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
        this.getAllContacts();
    },
    methods: {
        addMessage(){
            this.contactsDrawer = true;
            this.contactsForm = {}
        },
        async getAllContacts() {
            let res = await allClose();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "男" : "女";
            });
            this.contactsList = res.data;
        },
        async queryContacts() {
            if (this.queryInfo.query.length > 0) {
                let res = await getClose(this.queryInfo.query);
                this.contactsList = res.data;
                console.log(this.contactsList);
            } else {
                this.getAllContacts();
            }
        },
        async insertContacts() {
            this.$refs.contactsFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addClose(this.contactsForm);
                    if (res.status === 200) {
                        this.getAllContacts();
                        this.$message({
                            type: "success",
                            message: "密切者添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "密切者已存在",
                        });
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息",
                    });
                }
            });
        },
        async showContacts(row) {
            this.contactsDialog = true;
            this.contactsForm = row;
        },
        async updateContacts() {
            this.$refs.contactsFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterClose(this.contactsForm);
                    if (res.status === 200) {
                        this.getAllContacts();
                        this.$message({
                            type: "success",
                            message: "密切者修改成功",
                        });
                        this.contactsDialog = false;
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息",
                    });
                }
            });
        },
        async removeContacts(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteClose(row.id);
                if (res.status === 200) {
                    this.getAllContacts();
                    this.$message({
                        type: "success",
                        message: "密切者删除成功",
                    });
                }
            });
        },
        handleContactsClose(done) {
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
        newContactsList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.contactsList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.contactsRick-Manage {
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
