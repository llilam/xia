<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: "chart",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "300px",
        },
        chartDataTwo: {
            // 类型是对象
            type: Object,
            // 必须要有
            required: true,
        },
    },
    data() {
        return {
            chart: null,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, "macarons");

            this.chart.setOption({
                // 提示框组件
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                // 绘网格图
                grid: {
                    top: 10,
                    left: "2%",
                    right: "2%",
                    bottom: "3%",
                    containLabel: true, // 是否包含坐标轴的刻度标签
                },
                // X坐标
                xAxis: [
                    {
                        type: "category", // 类型为类目轴
                        data: ["确诊管理", "密切接触", "中高风险", "较低风险"],
                        // 坐标轴刻度相关设置
                        axisTick: {
                            // 保证刻度线和标签对齐
                            alignWithLabel: true,
                        },
                    },
                ],
                // Y坐标
                yAxis: [
                    {
                        type: "value",
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        name: "校内疫情数据",
                        type: "bar",
                        barWidth: "60%",
                        data: [
                            this.chartDataTwo.num1,
                            this.chartDataTwo.num2,
                            this.chartDataTwo.num3,
                            this.chartDataTwo.num4,
                        ],
                        animationDuration,
                        // 定义不同颜色
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        "#EE7476",
                                        "#97ABC6",
                                        "#F4516C",
                                        "#F4C48A",
                                    ];
                                    return colorList[params.dataIndex];
                                },
                            },
                        },
                    },
                ],
            });
        },
    },
};
</script>
