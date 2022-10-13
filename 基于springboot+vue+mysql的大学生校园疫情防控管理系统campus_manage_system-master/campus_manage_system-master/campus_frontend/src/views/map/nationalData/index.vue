<template>
    <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
    >
    <div class="national-container" :key="1">
        <el-row type="flex" justify="space-between">
            <el-col :span="12" class="leftTop">
                <p>国内疫情实时数据</p>
                <p>更新数据时间：{{ lastUpdateTime }}</p>
                <p>北京时间：{{ beijingTime }}</p>
                <p style="margin-top:10px;">(如数据出错, 请联系啊欢手机：18888888888)</p>
            </el-col>
            <el-col :span="12" class="rightTop">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card>
                            <p>现有确诊</p>
                            <p>{{ chinaTotal.nowConfirm }}</p>
                            <p>
                                较昨日<span>{{
                                    "+" + chinaAdd.nowConfirm
                                }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>无症状</p>
                            <p>{{ chinaTotal.noInfect }}</p>
                            <p>
                                较昨日<span>{{ "+" + chinaAdd.noInfect }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>现有疑似</p>
                            <p>{{ chinaTotal.suspect }}</p>
                            <p>
                                较昨日<span>{{ "+" + chinaAdd.suspect }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>现在重症</p>
                            <p>{{ chinaTotal.nowSevere }}</p>
                            <p>
                                较昨日<span>{{ chinaAdd.nowSevere }}</span>
                            </p>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card>
                            <p>累计确诊</p>
                            <p>{{ chinaTotal.confirm }}</p>
                            <p>
                                较昨日<span>{{ "+" + chinaAdd.confirm }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>境外输入</p>
                            <p>{{ chinaTotal.importedCase }}</p>
                            <p>
                                较昨日<span>{{
                                    "+" + chinaAdd.importedCase
                                }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>累计治愈</p>
                            <p>{{ chinaTotal.heal }}</p>
                            <p>
                                较昨日<span>{{ "+" + chinaAdd.heal }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>累计死亡</p>
                            <p>{{ chinaTotal.dead }}</p>
                            <p>
                                较昨日<span>{{ "+" + chinaAdd.dead }}</span>
                            </p>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
            <el-col :span="12" class="leftBottom">
                <el-table :data="chinaData" border height="500" :default-sort = "{prop: 'confirm', order: 'descending'}">
                    <el-table-column align="center" prop="name" label="省份" width="65">
                    </el-table-column>
                    <el-table-column align="center" prop="confirm" label="累计确诊" sortable>
                    </el-table-column>
                    <el-table-column align="center" prop="confirmAdd" label="新增确诊" sortable>
                    </el-table-column>
                    <el-table-column align="center" prop="nowConfirm" label="现有确诊" sortable>
                    </el-table-column>
                    <el-table-column align="center" prop="wzzAdd" label="新增无症状" width="95">
                    </el-table-column>
                    <el-table-column align="center" prop="riskAreaNum" label="风险地区数">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12" class="rightBottom">
                <echart-china :regionTotal="regionTotalArr"></echart-china>
            </el-col>
        </el-row>
    </div>
    </transition-group>
</template>

<script>
//解决跨域问题
const jsonp = require("jsonp");
import moment from 'moment'
import MapPage from "./components/Map";
import axios from 'axios';
export default {
    name: "NationalData",
    data() {
        return {
            // 国内疫情面板数据
            chinaTotal: {},
            // 国内疫情较昨日增加数量
            chinaAdd: {},
            // 各地区综合数据
            regionTotalArr: [],
            // 当前疫情更新的时间
            lastUpdateTime: null,
            // 国内疫情数据(接口)
            chinaData:[],
            // 定时器标识符
            timer:null,
            // 北京时间
            beijingTime:null
        };
    },
    components: {
        "echart-china": MapPage,
    },
    created() {
        this.getData();
    },
    mounted() {
        // 定时刷新时间
        this.timer = setInterval(() => {
            this.beijingTime = moment().format('YYYY年MM月DD日 ddd h:mm:ss');
        }, 100);
    },
    destroyed() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        // 获取当前各个地区的确诊人数, 返回地图组件区域名字与颜色
        async getData() {
            console.log(222222222);
            await jsonp(
                "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        const allData = JSON.parse(res.data.slice(0,res.data.lastIndexOf('localConfirmH5')+21) + '}');
                        console.log('我是面板数据：', allData);
                        console.log('6666666666666666666',allData);
                        // 中国数据面板
                        this.chinaTotal = allData.chinaTotal;
                        // 国内疫情数据
                        this.chinaAdd = allData.chinaAdd;
                        // 国内疫情更新时间
                        this.lastUpdateTime = allData.lastUpdateTime;

                        axios.get('https://shankapi.ifeng.com/feedflow/coopdoc/wuhanyiqing_data_local_city_detail/info/callback11?callback=callback11').then(res=>{
                            console.log('我是什么数据：', res);
                            // 计算各省疫情数量, 并传给地图组件
                            // 处理前获取数据
                            let allData = JSON.parse(res.data.slice(11,res.data.length-1));
                            allData.data.forEach(item=>{
                                this.chinaData.push({
                                    name:item.city,
                                    confirm: item.confirm,
                                    confirmAdd: item.confirmAdd,
                                    nowConfirm: item.nowConfirm,
                                    riskAreaNum: item.riskAreaNum,
                                    wzzAdd: item.wzzAdd
                                })
                            })

                            // 处理后筛选数据
                            const newRegionTotalArr = allData.data.map((item) => {
                                // 确诊人数判断, 不符合的数据也给红色
                                if (item.nowConfirm === 0) {
                                    // 返回区域名字与设置对应颜色
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#E2EBF4",
                                        },
                                    };
                                } else if (item.nowConfirm <= 9) {
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#FFE7B2",
                                        },
                                    };
                                } else if (item.nowConfirm <= 99) {
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#FFCEA0",
                                        },
                                    };
                                } else if (item.nowConfirm <= 499) {
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#FFA577",
                                        },
                                    };
                                } else if (item.nowConfirm <= 999) {
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#FF6341",
                                        },
                                    };
                                } else if (item.nowConfirm <= 9999) {
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#FF2736",
                                        },
                                    };
                                } else {
                                    return {
                                        name: item.city,
                                        itemStyle: {
                                            areaColor: "#DE1F05",
                                        },
                                    };
                                }
                            });

                            // 保存处理好的数据
                            this.regionTotalArr = newRegionTotalArr;
                        })
                    }
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
p {
    margin: 0;
    padding: 0;
}
.national-container {
    .leftTop {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p:first-child {
            font-size: 60px;
            color: #f56c6c;
        }
        p:nth-child(2) {
            color: skyblue;
            font-size: 20px;
            margin: 10px 0px;
        }
        p:nth-child(3) {
            color: #ecb35c;
            font-size: 20px;
        }
    }
    .rightTop {
        .el-card {
            width: 150px;
            height: 80px;
            border-radius: 10px;
            box-sizing: border-box;
            color: black;
            font-size: 12px;
            border: 1px solid black;
        }
        .el-row:first-child {
            margin-bottom: 20px;
            .el-col:nth-child(1) .el-card {
                background-color: #fcf1f0;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #fd5041;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #fd5041;
                    }
                }
            }
            .el-col:nth-child(2) .el-card {
                background-color: #fff6ee;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #ffa14e;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #ffa14e;
                    }
                }
            }
            .el-col:nth-child(3) .el-card {
                background-color: #f1f7f2;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #56bc7c;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #56bc7c;
                    }
                }
            }
            .el-col:nth-child(4) .el-card {
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #5c92ca;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #5c92ca;
                    }
                }
            }
        }
        .el-row:last-child {
            margin-bottom: 20px;
            .el-col:nth-child(1) .el-card {
                background-color: #fcf1f0;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #fd5041;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #fd5041;
                    }
                }
            }
            .el-col:nth-child(2) .el-card {
                background-color: #fff6ee;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #ffa14e;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #ffa14e;
                    }
                }
            }
            .el-col:nth-child(3) .el-card {
                background-color: #f1f7f2;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #56bc7c;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #56bc7c;
                    }
                }
            }
            .el-col:nth-child(4) .el-card {
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #5c92ca;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #5c92ca;
                    }
                }
            }
        }
    }
    .leftBottom {
        margin: 0px auto;
    }
}

</style>
