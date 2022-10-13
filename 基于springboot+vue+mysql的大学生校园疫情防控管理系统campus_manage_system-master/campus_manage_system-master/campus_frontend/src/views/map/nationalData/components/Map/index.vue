<template>
    <!-- echarts容器必须指定有效且明确的宽高, 不包括百分比 -->
    <div class="chart-container" ref="chartsRef"></div>
</template>

<script>
import chinaJson from "@/assets/map/china.json";
export default {
    data() {
        return {
            // 中国数据是对象
            chinaMap: chinaJson,
        };
    },
    props: {
        // 接收父组件传递过来的数据, 必须是数组
        regionTotal: {
            type: Array,
        },
    },
    mounted() {
        // DOM加载完成后显示数据
        this.$nextTick(() => {
            this.initChart();
            // 数据发生变化, 则适配窗口变化
            window.addEventListener("resize", this.screenAdapter);
        });
    },
    destroyed() {
        // 移除监听(防止内存泄露)
        window.removeEventListener("resize", this.screenAdapter);
    },
    // 触发时机：初始化数据、后期数据更新
    watch: {
        // 接口数据发生变化, 则更新数据
        regionTotal() {
            this.updateChart();
        },
    },
    methods: {
        // 初始化echarts：获取容器、注册地图数据、使用地图数据、容器放入数据
        initChart() {
            // 1. echarts绑定容器
            this.chartInstance = this.$echarts.init(this.$refs.chartsRef);
            // 2. 注册地图(本地中国数据), 只有 geo 或 map 地图类型才可使用
            this.$echarts.registerMap("china", this.chinaMap);
            // 3. 配置地图
            const initOption = {
                // 地理坐标系组件
                geo: {
                    // 图表类型
                    type: "map",
                    // 使用注册的地图
                    map: "china",
                    // 组件离容器上侧距离
                    top: "1%",
                    left:"center",
                    // 是否开启缩放或平移
                    // roam: true,
                    // 是否显示数据在地图上
                    label: {
                        show: true,
                    },
                },
                // 提示框组件
                tooltip: {
                    trigger: "item",
                },
                // 视觉映射组件(数据指定维度, 映射对应视觉元素, 人话：根据数据展示不同颜色)
                visualMap: [
                    {
                        // 两种类型：分段型(visualMapPiecewise) 或 连续型(visualMapContinuous)
                        // piecewise分段型有三种模式：splitNumber(平均分段)、pieces(自定义分段)、categories(类别分段)
                        type: "piecewise",
                        // 自动平均分割成若干块(7个数据则平均分成7块)
                        splitNumber: 7,
                        // 自定义分段每块范围
                        pieces: [
                            /*
                                lt(小于, little than)
                                gt(大于, greater than)
                                lte(小于等于, little than or equals)
                                gte(大于等于, greater than or equals）

                                注意：如果两个 piece 区间重叠, 则会自动进行去重
                            */
                            {
                                lt: 0,
                                label: "确诊：0人",
                                color: "#E2EBF4",
                            },
                            {
                                gt: 1,
                                lte: 9,
                                label: "确诊：1-9人",
                                color: "#FFE7B2",
                            },
                            {
                                gt: 10,
                                lte: 99,
                                label: "确诊：10-99人",
                                color: "#FFCEA0",
                            },
                            {
                                gt: 100,
                                lte: 499,
                                label: "确诊：100-499人",
                                color: "#FFA577",
                            },
                            {
                                gt: 500,
                                lte: 999,
                                label: "确诊：500-999人",
                                color: "#FF6341",
                            },
                            {
                                gt: 1000,
                                lte: 9999,
                                label: "确诊：1000-9999人",
                                color: "#FF2736",
                            },
                            {
                                gt: 10000,
                                label: "确诊：10000人及以上",
                                color: "#DE1F05",
                            },
                        ],
                        // 七块范围数据宽高定义
                        itemWidth: 10,
                        itemHeight: 10,
                        // 七块范围数据水平或垂直排列
                        orient: "vertical",
                        // 七块范围数据整体相对于中国地图的上右下左范围
                        padding: [-500, 0, 0, 0],
                        // 组件离容器下侧距离
                        bottom: "-21%",
                        left: "1%",
                        // 文字颜色
                        textStyle: {
                            color: "#000000",
                            fontSize: 14,
                        },
                    },
                ],
            };
            // 容器显示数据
            this.chartInstance.setOption(initOption);
        },
        // 接口数据覆盖chinaJSON数据
        updateChart() {
            // 子组件接收父组件的数据, 修改中国地图中的名字、坐标、颜色
            const dataOption = {
                geo: {
                    regions: this.regionTotal,
                },
            };
            this.chartInstance.setOption(dataOption);
        },
        // 数据窗口适配
        screenAdapter() {
            // 监听窗口大小设置的option
            const AdapterOption = {};
            this.chartInstance.setOption(AdapterOption);
            this.chartInstance.resize();
        },
    },
};
</script>

<style lang="scss" scoped>
.chart-container {
    width: 680px;
    height: 680px;
}
</style>
