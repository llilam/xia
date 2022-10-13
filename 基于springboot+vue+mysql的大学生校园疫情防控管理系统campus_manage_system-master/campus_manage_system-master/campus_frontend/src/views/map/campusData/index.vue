<template>
    <div class="dashboard-editor-container">
        <!-- 四大数据面板：字体图标+count-to -->
        <panel-group/>

        <!-- 折线图 -->
        <el-row class="bigCharts">
            <!-- 大图表绑定数据面板中的数据 -->
            <line-chart :chart-data="lineChartData" />
        </el-row>

        <!-- 饼图、柱形图 -->
        <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :lg="12">
                <div class="chart-wrapper">
                    <pie-chart v-if="signShow" :chart-data-one="PieChartData"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
                <div class="chart-wrapper">
                    <bar-chart  v-if="signShow" :chart-data-two="PieChartData"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
const jsonp = require("jsonp");
import {allInfection,allHighRick,allLowRick,allClose} from '@/api/manage'
export default {
    name: "CampusData",
    components: {
        PanelGroup,
        LineChart,
        PieChart,
        BarChart,
    },
    data(){
        return {
            lineChartData:{
                data1:[],
                data2:[],
                data3:[],
                data4:[],
            },
            PieChartData:{
                num1:0,
                num2:0,
                num3:0,
                num4:0,
            },
            signShow:false,
        }
    },
    created(){
        this.getData();
        this.getDataTwo();
    },
    methods:{
        async getData() {
            await jsonp(
                "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        // 只获取前7个
                        const result = JSON.parse(res.data).areaTree[0].children.slice(0,7);
                        result.forEach(item=>{
                            this.lineChartData.data1.push(item.total.nowConfirm);
                            this.lineChartData.data2.push(item.total.provinceLocalConfirm);
                            this.lineChartData.data3.push(item.total.dead);
                            this.lineChartData.data4.push(item.total.heal);
                        })
                    }
                }
            );
        },
        async getDataTwo(){
            let res1 = await allInfection();
            let res2 = await allHighRick();
            let res3 = await allLowRick();
            let res4 = await allClose();
            this.PieChartData.num1 = res1.data.length;
            this.PieChartData.num2 = res2.data.length;
            this.PieChartData.num3 = res3.data.length;
            this.PieChartData.num4 = res4.data.length;
            // 解决echarts渲染问题, 以上传值赋值一切正常，但是刷新后就没了, 这里设置一个标识符，等待数据完全渲染好了再显示echart组件，这样就没问题了
            this.signShow = true;
        },
    }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
    padding: 20px;
    position: relative;
    background-color:#f0f2f5;
    .bigCharts {
        background: white;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}

@media (max-width: 1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>
