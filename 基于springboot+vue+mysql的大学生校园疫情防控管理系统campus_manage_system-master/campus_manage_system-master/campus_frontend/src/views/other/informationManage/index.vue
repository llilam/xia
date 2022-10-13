<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="info-container" :key="1">
            <!-- 校内疫情消息管理 -->
            <el-card class="campusManage">
                <!-- 标题 -->
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>校内疫情消息通知</span>
                </div>

                <!-- 搜索与添加 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="请输入需要搜索的标题"
                            v-model="campusQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryCampus()"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addMessage1()"
                            >添加校内疫情消息</el-button
                        >
                    </el-col>
                </el-row>

                <!-- 增删改查 -->
                <el-table :data="newCampusInfoList" border stripe>
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column
                        label="标题"
                        prop="n_title"
                    ></el-table-column>
                    <el-table-column
                        label="内容"
                        prop="n_content"
                    ></el-table-column>
                    <el-table-column
                        label="时间"
                        prop="n_date"
                    ></el-table-column>
                    <el-table-column label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showCampus(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeCampus(scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    @size-change="campusHandleSizeChange"
                    @current-change="campusHandleCurrentChange"
                    :current-page="campusQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="campusQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(campusQueryInfo.total = campusInfoList.length)"
                >
                </el-pagination>

                <el-drawer
                    title="校内疫情新闻添加"
                    :visible.sync="campusDrawer"
                    direction="rtl"
                    :before-close="handleCampusClose"
                    class="drawer_one"
                >
                    <el-form
                        ref="campusFormRef"
                        :model="campusForm"
                        :rules="campusRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="标题" prop="n_title">
                            <el-input
                                v-model="campusForm.n_title"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="n_content">
                            <el-input
                                v-model="campusForm.n_content"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="n_date">
                            <el-input
                                v-model="campusForm.n_date"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="insertCampus()"
                                >添加</el-button
                            >
                            <el-button type="pain">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-drawer>

                <el-dialog
                    title="修改校内疫情消息"
                    :visible.sync="campusDialog"
                    width="50%"
                >
                    <el-form
                        ref="campusFormRef"
                        :model="campusForm"
                        :rules="campusRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="标题" prop="n_title">
                            <el-input
                                v-model="campusForm.n_title"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="n_content">
                            <el-input
                                v-model="campusForm.n_content"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="n_date">
                            <el-input
                                v-model="campusForm.n_date"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="updateCampus()"
                                >修改</el-button
                            >
                            <el-button type="pain">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-card>

            <!-- 国内疫情消息管理 -->
            <el-card class="nationalManage">
                <!-- 标题 -->
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>国内疫情消息通知</span>
                </div>
                <!-- 搜索与添加 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="请输入需要搜索的标题"
                            v-model="nationalQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryNational()"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addMessage2()"
                            >添加国内疫情消息</el-button
                        >
                    </el-col>
                </el-row>
                <!-- 增删改查 -->
                <el-table :data="newNationalInfoList" border stripe>
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column
                        label="标题"
                        prop="n_title"
                    ></el-table-column>
                    <el-table-column
                        label="时间"
                        prop="n_date"
                    ></el-table-column>
                    <el-table-column label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showNational(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeNational(scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="nationalHandleSizeChange"
                    @current-change="nationalHandleCurrentChange"
                    :current-page="nationalQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="nationalQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(nationalQueryInfo.total = nationalInfoList.length)"
                >
                </el-pagination>

                <el-drawer
                    title="国内疫情新闻添加"
                    :visible.sync="nationalDrawer"
                    direction="rtl"
                    :before-close="handleNationalClose"
                    class="drawer_one"
                >
                    <el-form
                        ref="nationalFormRef"
                        :model="nationalForm"
                        :rules="nationalRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="标题" prop="n_title">
                            <el-input
                                v-model="nationalForm.n_title"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="n_date">
                            <el-input
                                v-model="nationalForm.n_date"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="insertNational()"
                                >添加</el-button
                            >
                            <el-button type="pain">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-drawer>

                <el-dialog
                    title="修改国内疫情消息"
                    :visible.sync="nationalDialog"
                    width="50%"
                >
                    <el-form
                        ref="nationalFormRef"
                        :model="nationalForm"
                        :rules="nationalRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="标题" prop="n_title">
                            <el-input
                                v-model="nationalForm.n_title"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="n_date">
                            <el-input
                                v-model="nationalForm.n_date"
                                placeholder="请输入信息~"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="updateNational()"
                                >修改</el-button
                            >
                            <el-button type="pain">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-card>
        </div>
    </transition-group>
</template>

<script>
import {
    allCampus,
    addCampus,
    alterCampus,
    getCampus,
    deleteCampus,
    allDomestic,
    addDomestic,
    alterDomestic,
    getDomestic,
    deleteDomestic,
} from "@/api/other";
export default {
    name: "InformationManage",
    data() {
        return {
            campusQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            campusInfoList: [],
            campusDrawer: false,
            campusDialog: false,
            campusForm: {
                n_title: "",
                n_content: "",
                n_date: "",
            },
            campusRules: {
                n_title: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                n_content: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                n_date: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },

            nationalQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            nationalInfoList: [],
            nationalDrawer: false,
            nationalDialog: false,
            nationalForm: {
                n_title: "",
                n_date: "",
            },
            nationalRules: {
                n_title: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                n_date: [
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
        this.getAllCampus();
        this.getAllNational();
    },
    methods: {
        addMessage1(){
            this.campusForm = {};
            this.campusDrawer = true
        },
        addMessage2(){
            this.nationalForm = {};
            this.nationalDrawer = true
        },
        async getAllCampus() {
            let res = await allCampus();
            res.data.forEach((item) => {
                item.n_date = item.n_date.slice(0, 10);
            });
            this.campusInfoList = res.data;
        },
        async queryCampus() {
            if (this.campusQueryInfo.query.length > 0) {
                let res = await getCampus(this.campusQueryInfo.query);
                this.campusInfoList = res.data;
            } else {
                this.getAllCampus();
            }
        },
        async insertCampus() {
            this.$refs.campusFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addCampus(this.campusForm);
                    if (res.status === 200) {
                        this.getAllCampus();
                        this.$message({
                            type: "success",
                            message: "校内通知添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "校内通知已存在",
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
        async showCampus(row) {
            this.campusDialog = true;
            this.campusForm = row;
        },
        async updateCampus() {
            this.$refs.campusFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterCampus(this.campusForm);
                    if (res.status === 200) {
                        this.getAllCampus();
                        this.$message({
                            type: "success",
                            message: "校内通知修改成功",
                        });
                        this.campusDialog = false;
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息~",
                    });
                }
            });
        },
        removeCampus(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteCampus(row.id);
                if (res.status === 200) {
                    this.getAllCampus();
                    this.$message({
                        type: "success",
                        message: "校内通知删除成功",
                    });
                }
            });
        },
        handleCampusClose(done) {
            done();
        },

        async getAllNational() {
            let res = await allDomestic();
            res.data.forEach((item) => {
                item.n_date = item.n_date.slice(0, 10);
            });
            this.nationalInfoList = res.data;
        },
        async queryNational() {
            if (this.nationalQueryInfo.query.length > 0) {
                let res = await getDomestic(this.nationalQueryInfo.query);
                this.nationalInfoList = res.data;
            } else {
                this.getAllNational();
            }
        },
        async insertNational() {
            this.$refs.nationalFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addDomestic(this.nationalForm);
                    if (res.status === 200) {
                        this.getAllNational();
                        this.$message({
                            type: "success",
                            message: "国内通知添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "国内通知已存在",
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
        async showNational(row) {
            this.nationalDialog = true;
            this.nationalForm = row;
        },
        async updateNational() {
            this.$refs.nationalFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterDomestic(this.nationalForm);
                    if (res.status === 200) {
                        this.getAllNational();
                        this.$message({
                            type: "success",
                            message: "国内通知修改成功",
                        });
                        this.nationalDialog = false;
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "请完善信息~",
                    });
                }
            });
        },
        async removeNational(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteDomestic(row.id);
                if (res.status === 200) {
                    this.getAllNational();
                    this.$message({
                        type: "success",
                        message: "国内通知删除成功",
                    });
                }
            });
        },
        handleNationalClose(done) {
            done();
        },
        campusHandleSizeChange(val) {
            this.campusQueryInfo.pageSize = val;
        },
        campusHandleCurrentChange(val) {
            this.campusQueryInfo.pageNum = val;
        },
        nationalHandleSizeChange(val) {
            this.nationalQueryInfo.pageSize = val;
        },
        nationalHandleCurrentChange(val) {
            this.nationalQueryInfo.pageNum = val;
        },
    },
    computed: {
        newCampusInfoList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.campusInfoList.slice(
                (this.campusQueryInfo.pageNum - 1) *
                    this.campusQueryInfo.pageSize,
                this.campusQueryInfo.pageNum * this.campusQueryInfo.pageSize
            );
        },
        newNationalInfoList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.nationalInfoList.slice(
                (this.nationalQueryInfo.pageNum - 1) *
                    this.nationalQueryInfo.pageSize,
                this.nationalQueryInfo.pageNum * this.nationalQueryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.info-container {
    .campusManage {
        padding: 10px;
        margin-bottom: 30px;
        .title {
            margin: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #cdcdcd;
        }
        .title span {
            margin-left: 5px;
        }
        .el-row {
            margin-top: 15px !important;
            margin-left: 1px !important;
        }
        .el-table {
            margin: 10px;
            margin-top: 16px;
        }
        .el-pagination {
            margin-left: 10px;
        }
    }
    .nationalManage {
        padding: 10px;
        margin-bottom: 30px;
        .title {
            margin: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #cdcdcd;
        }
        .title span {
            margin-left: 5px;
        }
        .el-row {
            margin-top: 15px !important;
            margin-left: 1px !important;
        }
        .el-table {
            margin: 10px;
            margin-top: 16px;
        }
        .el-pagination {
            margin-left: 10px;
        }
    }
}
</style>
