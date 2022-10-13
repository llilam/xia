<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
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
        chartDataOne: {
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
        this.initChart();
        console.log(this.chartDataOne);
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
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                // 图例组件
                legend: {
                    left: "center",
                    bottom: "10",
                    data: [
                        "确诊管理",
                        "密切接触",
                        "中高风险",
                        "较低风险"
                    ]
                },
                series: [
                    {
                        name: "校内疫情数据",
                        type: "pie",
                        roseType: "radius",
                        radius: [15, 95],
                        center: ["50%", "38%"],
                        data: [
                            { value: this.chartDataOne.num1, name: "确诊管理" },
                            { value: this.chartDataOne.num2, name: "密切接触" },
                            { value: this.chartDataOne.num3, name: "中高风险" },
                            { value: this.chartDataOne.num4, name: "较低风险" },
                        ],
                        animationEasing: "cubicInOut",
                        animationDuration: 2600,
                    },
                ],
            });
        },
    },
};
</script>
