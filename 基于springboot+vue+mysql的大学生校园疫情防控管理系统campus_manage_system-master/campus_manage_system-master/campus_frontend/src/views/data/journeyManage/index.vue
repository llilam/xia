<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="journeyManage" :key="1">
            <!-- 标题 -->
            <el-divider content-position="left" class="title"
                >行程数据</el-divider
            >

            <!-- 搜索与添加 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="请输入需搜索的姓名"
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryJourney()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addMessage()"
                        >添加行程数据</el-button
                    >
                </el-col>
            </el-row>

            <!-- 增删改查 -->
            <el-table :data="newJourneyList" border stripe>
                <el-table-column
                    align="center"
                    label="#"
                    type="index"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="编号"
                    prop="d_stuid"
                    width="140px"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="姓名"
                    prop="d_name"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="所在学院"
                    width="130px"
                    prop="d_college"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="所在班级"
                    width="160px"
                    prop="d_class"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="所在宿舍楼"
                    width="100px"
                    prop="d_building"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="所在宿舍号"
                    width="100px"
                    prop="d_build_num"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="返程车次"
                    prop="d_return_num"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="返程时间"
                    width="100px"
                    prop="d_return_date"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="出发地区"
                    prop="d_start_area"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="到达地区"
                    prop="d_arrival_area"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="14天内到达或途径"
                    width="150px"
                    prop="d_in_reach"
                ></el-table-column>
                <el-table-column align="center" label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showJourney(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeJourney(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 
                分页

                current-page：当前页码
                page-sizes：显示条数
                page-size：当前显示条数
                layout：分页器显示什么组件
                total：总数据条数
            -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="(queryInfo.total = journeyList.length)"
            >
            </el-pagination>

            <!-- 添加行程数据对话框 -->
            <el-drawer
                title="行程数据添加"
                :visible.sync="journeyDrawer"
                direction="rtl"
                :before-close="handleJourneyClose"
                class="drawer_one"
            >
                <el-form
                    ref="journeyFormRef"
                    :model="journeyForm"
                    :rules="journeyRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="d_stuid">
                        <el-input v-model="journeyForm.d_stuid" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="d_name">
                        <el-input v-model="journeyForm.d_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="所在学院" prop="d_college">
                        <el-input v-model="journeyForm.d_college" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="所在班级" prop="d_class">
                        <el-input v-model="journeyForm.d_class" placeholder="请输入内容~"></el-input>
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
                        <el-input v-model="journeyForm.d_arrival_area" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="14天途径" prop="d_in_reach">
                        <el-input v-model="journeyForm.d_in_reach" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertJourney()">添加</el-button>
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <!-- 编辑申报 -->
            <el-dialog
                title="修改信息"
                :visible.sync="journeyDialog"
                width="50%"
            >
                <el-form
                    ref="journeyFormRef"
                    :model="journeyForm"
                    :rules="journeyRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="d_stuid">
                        <el-input v-model="journeyForm.d_stuid" placeholder="请输入内容~" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="d_name">
                        <el-input v-model="journeyForm.d_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="所在学院" prop="d_college">
                        <el-input v-model="journeyForm.d_college" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="所在班级" prop="d_class">
                        <el-input v-model="journeyForm.d_class" placeholder="请输入内容~"></el-input>
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
                        <el-input v-model="journeyForm.d_arrival_area" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="14天途径" prop="d_in_reach">
                        <el-input v-model="journeyForm.d_in_reach" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateJourney()">修改</el-button>
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {allJourney,addJourney,alterJourney,getJourney,deleteJourney} from "@/api/health";
export default {
    name: "journeyManage",
    data() {
        // 跨域请求数据
        const jsonp = require("jsonp");
        
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
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            journeyList: [],
            // 控制抽屉打开
            journeyDrawer: false,
            journeyForm: {
                d_stuid:'',
                d_name:'',
                d_college:'',
                d_class:'',
                d_building:'',
                d_build_num:'',
                d_return_num:'',
                d_return_date:'',
                d_start_area:'',
                d_arrival_area:'',
                d_in_reach:'',
            },
            journeyDialog: false,
            journeyRules: {
                d_stuid:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_name:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_college:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_class:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_building:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_build_num:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_return_num:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_return_date:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_start_area:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_arrival_area:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
                d_in_reach:[
                    { 
                        required: true, 
                        message: "必填项!",
                        trigger: "change blur focus",
                    }
                ],
            },
        };
    },
    created() {
        this.getAllJourney();
    },
    methods: {
        addMessage(){
            this.journeyDrawer = true
            this.journeyForm = {}
        },
        // 所有行程数据
        async getAllJourney() {
            let res = await allJourney();
            res.data.forEach((item) => {
                item.d_return_date = item.d_return_date.slice(0,10);
            });
            this.journeyList = res.data;
        },
        // 行程模糊查询
        async queryJourney() {
            if (this.queryInfo.query.length > 0) {
                let res = await getJourney(this.queryInfo.query);
                this.journeyList = res.data;
                console.log(this.journeyList);
            } else {
                this.getAllJourney();
            }
        },
        // 添加行程
        insertJourney() {
            this.$refs.journeyFormRef.validate(async (valid)=>{
                if(valid){
                    let res = await addJourney(this.journeyForm);
                    if (res.status === 200) {
                        this.getAllJourney();
                        this.$message({
                            type: "success",
                            message: "行程添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "行程已存在",
                        });
                    }
                }else{
                    this.$message({
                        type: "warning",
                        message: "信息未完善不能提交~",
                    });
                }
            })
        },
        // 显示当前行程
        async showJourney(row) {
            this.journeyDialog = true;
            this.journeyForm = row;
        },
        // 修改当前行程
        async updateJourney() {
            this.$refs.journeyFormRef.validate(async (valid)=>{
                if(valid){
                    let res = await alterJourney(this.journeyForm);
                    if (res.status === 200) {
                        this.getAllJourney();
                        this.$message({
                            type: "success",
                            message: "行程修改成功",
                        });
                        this.journeyDialog = false;
                    }
                }else{
                    this.$message({
                        type: "warning",
                        message: "信息未完善不能提交~",
                    });
                }
            })

            
        },
        // 删除当前行程
        async removeJourney(row) {
            this.$confirm('确认要删除该条数据嘛？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async () => {
                let res = await deleteJourney(row.id);
                if (res.status === 200) {
                    this.getAllJourney();
                    this.$message({
                        type: "success",
                        message: "行程删除成功",
                    });
                }
            });
        },
        handleJourneyClose(done) {
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
        newJourneyList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.journeyList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.journeyManage {
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
