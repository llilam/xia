<template>
    <div class="echartsBox" />
</template>

<script>
const jsonp = require("jsonp");
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
    // 图表自适应屏幕分辨率
    mixins: [resize],
    // 接收数据
    props: {
        // 接收父组件传递的四大面板数据(周一到周五的实际数据与预期数据)
        chartData: {
            // 类型是对象
            type: Object,
            // 必须要有
            required: true,
        },
    },
    // 图表数据与配置默认为空
    data() {
        return {
            chart: null,
        };
    },
    watch: {
        // 当图表数据进行注入时, 图表发生变化
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val);
            },
        },
    },
    // vue实例已开始工作
    mounted() {
        // DOM加载完成, 则对图表进行初始化
        this.$nextTick(() => {
            this.initChart();
        });
    },
    // vue实例即将消失
    beforeDestroy() {
        // 如果图表不为空, 则结束程序
        if (!this.chart) {
            return;
        }
        // 释放图表使用的资源, 图表重新赋值为空
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        // 初始化图表
        initChart() {
            // 初始化图表(容器, 主题)
            this.chart = echarts.init(this.$el, "macarons");
            // 配置图表(四大面板数据：周一到周五的实际数据与预期数据)
            this.setOptions(this.chartData);
        },
        // 配置图表(参数：自定义数据中的第几层,结构赋值获取)
        setOptions({ expectedData, actualData } = {}) {
            this.chart.setOption({
                // 水平坐标轴自定义配置
                xAxis: {
                    data: ["台湾", "陕西", "浙江", "香港", "广西", "上海", "广东"],
                    boundaryGap: false, // 坐标轴两边留空
                    axisTick: {
                        show: false, // 是否显示坐标轴刻度
                    },
                },
                // 垂直坐标轴自定义配置
                yAxis: {
                    axisTick: {
                        show: false, // 是否显示坐标轴刻度
                    },
                },
                // 绘制网格
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                    top: 30,
                    containLabel: true, // 是否显示坐标轴刻度标签
                },
                // 提示框组件
                tooltip: {
                    // 触发类型
                    trigger: "axis",
                    // 指示器类型
                    axisPointer: {
                        type: "cross", // 十字准星指示器
                    },
                    padding: [5, 10],
                },
                // 图例组件(展现不同系列的标记、颜色、名字)
                legend: {
                    // 数据匹配父组件传递过来的数据
                    data: ["确诊人数", "密切接触者","中高风险接触者","低风险接触者"],
                },
                // 数据映射组件(折线图、柱形图、饼图等)
                series: [
                    {
                        name: "现有确诊",
                        // 所显示图类型的样式
                        itemStyle: {
                            normal: {
                                // 文字颜色
                                color: "#CA0000",
                                // 线颜色
                                lineStyle: {
                                    color: "#CA0000",
                                    width: 2,
                                },
                                areaStyle: {
                                    color: "#CA0000",
                                },
                            },
                        },
                        // 是否显示平滑曲线
                        smooth: true,
                        // 折线图
                        type: "line",
                        // 折线图所要的数据必须是数组,且数据对应x轴标志个数
                        data: this.chartData.data1,
                        // 动画间隔时间
                        animationDuration: 2800,
                        // 动画效果
                        animationEasing: "cubicInOut",
                    },
                    {
                        name: "省当地确诊",
                        smooth: true,
                        type: "line",
                        itemStyle: {
                            normal: {
                                color: "#CD8A09",
                                lineStyle: {
                                    color: "#CD8A09",
                                    width: 2,
                                },
                                areaStyle: {
                                    color: "#CD8A09",
                                },
                            },
                        },
                        data: this.chartData.data2,
                        animationDuration: 2800,
                        animationEasing: "quadraticOut",
                    },
                    {
                        name: "累计死亡",
                        itemStyle: {
                            normal: {
                                color: "#AC9408",
                                lineStyle: {
                                    color: "#AC9408",
                                    width: 2,
                                },
                                areaStyle: {
                                    color: "#AC9408",
                                },
                            },
                        },
                        smooth: true,
                        type: "line",
                        data: this.chartData.data3,
                        animationDuration: 2800,
                        animationEasing: "cubicInOut",
                    },
                    {
                        name: "累计治愈",
                        smooth: true,
                        type: "line",
                        itemStyle: {
                            normal: {
                                color: "#70CAD2",
                                lineStyle: {
                                    color: "#70CAD2",
                                    width: 2,
                                },
                                areaStyle: {
                                    color: "#70CAD2",
                                },
                            },
                        },
                        data: this.chartData.data4,
                        animationDuration: 2800,
                        animationEasing: "quadraticOut",
                    },
                ],
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.echartsBox {
    width: 100%;
    height: 350px;
}
</style>
