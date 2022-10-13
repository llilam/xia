<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="log-container" :key="1">
            <!-- 搜索 -->
            <el-row>
                <el-col :span="8">
                    <el-input
                        placeholder="请输入需要搜索的名字"
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryJournal()"
                        ></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <!-- 登录日志 -->
            <el-card shadow="never">
                <el-table :data="newJournalList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="编号"
                        prop="j_stuid"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="姓名"
                        prop="j_name"
                        width="100px"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="角色"
                        prop="j_role"
                        width="80px"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="浏览器"
                        prop="j_browser"
                        width="80px"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="IP地址"
                        prop="j_ip"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="IP所在城市"
                        prop="j_ipname"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="登录时间"
                        prop="j_date"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="登录状态"
                        prop="j_status"
                    ></el-table-column>
                </el-table>
            </el-card>

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
                :total="(queryInfo.total = journalList.length)"
            >
            </el-pagination>
        </div>
    </transition-group>
</template>

<script>
import { allJournal, getJournal, addJournal } from "@/api/other";
export default {
    name: "LoginJournal",
    data() {
        return {
            // 用户数据列表默认参数
            queryInfo: {
                // 查询参数
                query: "",
                // 当前页码
                pageNum: 1,
                // 每页显示条数
                pageSize: 2,
                // 总数据条数
                total: 0,
            },
            // 用户列表
            userList: [],
            journalList:[],
        };
    },
    created() {
        /*
            登录日志实现思路
            1.判断本地存储有没有中间值, 中间值为了限制用户无限刷新无限添加数据
            2.如果本地存储没有中间值，则添加数据，添加数据函数中设置中间值
            3.下一次刷新时，因为本地存储中已经有中间值进行判断，所以不会再添加数据
            4.等用户退出时，本地存储清空，再次登录会继续添加日志
            5.每次添加的日志都会在数据库中存储
        */
        if(!localStorage.getItem('num')){
            this.addJournalData();
        }
        this.getAllJournal();
    },
    methods: {
        async queryJournal() {
            if (this.queryInfo.query.length > 0) {
                let res = await getJournal(this.queryInfo.query);
                res.data.forEach(item=>{
                    item.j_role = item.j_role == 3 ? '工作人员':'师生'
                })
                this.journalList = res.data;
            } else {
                this.getAllJournal();
            }
        },
        handleSizeChange(val) {
            this.queryInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.queryInfo.pageNum = val;
        },
        async addJournalData(){
            let data = returnCitySN;
            let {r_serial,r_name,r_role} = JSON.parse(localStorage.getItem("rolesData"));
            let status = localStorage.getItem("campusToken");
            if(status){
                status = '登录成功'
            }
            let obj = {
                j_ip:data.cip,
                j_ipname:data.cname,
                j_browser:this.browserVersion,
                j_date:this.nowTime,
                j_name:r_name,
                j_stuid:r_serial,
                j_status:status,
                j_role: r_role,
                pid:r_role
            }
            await addJournal(obj);
            // 限制一次登录只能记录一次日志
            localStorage.setItem('num',1);
        },
        async getAllJournal(){
            let res = await allJournal();
            res.data.forEach(item=>{
                item.j_role = item.j_role == 3 ? '工作人员':'师生'
            })
            this.journalList = res.data;
        }
    },
    computed: {
        newJournalList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.journalList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
        browserVersion() {
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Opera") > -1) {
                return "Opera";
            } else if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } else if (userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            } else if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            } else if (userAgent.indexOf("MSIE 6.0") > -1) {
                return "IE6";
            } else if (userAgent.indexOf("MSIE 7.0") > -1) {
                return "IE7";
            } else if (userAgent.indexOf("MSIE 8.0") > -1) {
                return "IE8";
            } else if (userAgent.indexOf("MSIE 9.0") > -1) {
                return "IE9";
            } else if (userAgent.indexOf("MSIE 10.0") > -1) {
                return "IE10";
            } else if (userAgent.indexOf("MSIE 11.0") > -1) {
                return "IE11";
            }
            return "Browser";
        },
        nowTime(){
            return this.$moment().format('YYYY-MM-DD HH:mm:ss');
        }
    },
};
</script>

<style lang="scss" scoped>
.log-container {
    .el-row .el-col {
        line-height: 40px;
    }
    .el-card {
        margin: 20px 0px;
    }
}
</style>
