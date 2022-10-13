<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="lowRick-Manage" :key="1">
            <!-- 标题 -->
            <el-divider content-position="left" class="title"
                >低风险接触者信息管理</el-divider
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
                            @click="queryLowRick()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addMessage">添加低风险接触者信息</el-button>
                </el-col>
            </el-row>

            <!-- 增删改查 -->
            <el-table :data="newLowRickList" border stripe>
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
                            @click="showLowRick(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeLowRick(scope.row)"
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
                :total="(queryInfo.total = lowRickList.length)"
            >
            </el-pagination>

            <el-drawer
                title="角色添加"
                :visible.sync="lowRickDrawer"
                direction="rtl"
                :before-close="handleLowRickClose"
                class="drawer_one"
            >
                <el-form
                    ref="lowRickFormRef"
                    :model="lowRickForm"
                    :rules="lowRickRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input v-model="lowRickForm.m_stuid" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input v-model="lowRickForm.m_name" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="m_gender">
                        <el-input v-model="lowRickForm.m_gender" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input v-model="lowRickForm.m_college" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input v-model="lowRickForm.m_class" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍楼" prop="m_building">
                        <el-input v-model="lowRickForm.m_building" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍号" prop="m_building_num">
                        <el-input
                            v-model="lowRickForm.m_building_num"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期居住" prop="m_recent_place">
                        <el-input
                            v-model="lowRickForm.m_recent_place"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期接触史" prop="m_recent_history">
                        <el-input
                            v-model="lowRickForm.m_recent_history"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="健康状况" prop="m_health_status">
                        <el-input
                            v-model="lowRickForm.m_health_status"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertLowRick()"
                            >添加</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="修改低风险者信息"
                :visible.sync="lowRickDialog"
                width="50%"
            >
                <el-form
                    ref="lowRickFormRef"
                    :model="lowRickForm"
                    :rules="lowRickRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input v-model="lowRickForm.m_stuid" placeholder="请输入信息~" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input v-model="lowRickForm.m_name" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="m_gender">
                        <el-input v-model="lowRickForm.m_gender" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input v-model="lowRickForm.m_college" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input v-model="lowRickForm.m_class" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍楼" prop="m_building">
                        <el-input v-model="lowRickForm.m_building" placeholder="请输入信息~"></el-input>
                    </el-form-item>
                    <el-form-item label="宿舍号" prop="m_building_num">
                        <el-input
                            v-model="lowRickForm.m_building_num"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期居住" prop="m_recent_place">
                        <el-input
                            v-model="lowRickForm.m_recent_place"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="近期接触史" prop="m_recent_history">
                        <el-input
                            v-model="lowRickForm.m_recent_history"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="健康状况" prop="m_health_status">
                        <el-input
                            v-model="lowRickForm.m_health_status"
                             placeholder="请输入信息~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateLowRick()"
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
    allLowRick,
    addLowRick,
    alterLowRick,
    getLowRick,
    deleteLowRick
} from "@/api/manage";
export default {
    name: "LowRickManage",
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            lowRickList: [],
            // 控制抽屉打开
            lowRickDrawer: false,
            lowRickForm: {
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
            lowRickDialog: false,
            lowRickRules: {
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
            }
        };
    },
    created() {
        this.getAllLowRick();
    },
    methods: {
        addMessage(){
            this.lowRickDrawer = true
            this.lowRickForm = {}
        },
        async getAllLowRick() {
            let res = await allLowRick();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "男" : "女";
            });
            this.lowRickList = res.data;
        },
        async queryLowRick() {
            if (this.queryInfo.query.length > 0) {
                let res = await getLowRick(this.queryInfo.query);
                this.lowRickList = res.data;
                console.log(this.lowRickList);
            } else {
                this.getAllLowRick();
            }
        },
        insertLowRick() {
            this.$refs.lowRickFormRef.validate(async (valid)=>{
                if(valid){
                    let res = await addLowRick(this.lowRickForm);
                    if (res.status === 200) {
                        this.getAllLowRick();
                        this.$message({
                            type: "success",
                            message: "低风险者添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "低风险者已存在",
                        });
                    }
                }else{
                    this.$message({
                        type:'warning',
                        message:'请完善内容~'
                    })
                }
            })
        },
        async showLowRick(row) {
            this.lowRickDialog = true;
            this.lowRickForm = row;
        },
        updateLowRick() {
            this.$refs.lowRickFormRef.validate(async (valid)=>{
                if(valid){
                    let res = await alterLowRick(this.lowRickForm);
                    if (res.status === 200) {
                        this.getAllLowRick();
                        this.$message({
                            type: "success",
                            message: "低风险者修改成功",
                        });
                        this.lowRickDialog = false;
                    }
                }else{
                    this.$message({
                        type:'warning',
                        message:'请完善内容~'
                    })
                }
            })
        },
        async removeLowRick(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteLowRick(row.id);
                if (res.status === 200) {
                    this.getAllLowRick();
                    this.$message({
                        type: "success",
                        message: "低风险者删除成功",
                    });
                }
            });
        },
        handleLowRickClose(done) {
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
        newLowRickList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.lowRickList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.lowRick-Manage {
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
