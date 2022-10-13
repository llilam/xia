<template>
    <el-row :gutter="40" class="panel-group">
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col" >
            <!-- 通过点击面板, 发送新数据到父组件, 改变面板数据顺序 -->
            <div
                class="card-panel"
            >
                <div class="card-panel-icon-wrapper icon-diagnosis">
                    <svg-icon
                        icon-class="diagnosis"
                        class-name="card-panel-icon"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">现有确诊</div>
                    <!-- count-to: start-val开始数量, end-val结束数量, duration开始到结束相隔多少毫秒 -->
                    <count-to
                        :start-val="0"
                        :end-val="num1"
                        :duration="1000"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-close">
                    <svg-icon
                        icon-class="close"
                        class-name="card-panel-icon"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">密切接触接触者</div>
                    <count-to
                        :start-val="0"
                        :end-val="num2"
                        :duration="1000"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div
                class="card-panel"
            >
                <div class="card-panel-icon-wrapper icon-high">
                    <svg-icon icon-class="high" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">中高风险接触者</div>
                    <count-to
                        :start-val="0"
                        :end-val="num3"
                        :duration="1000"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div
                class="card-panel"
            >
                <div class="card-panel-icon-wrapper icon-low">
                    <svg-icon
                        icon-class="low"
                        class-name="card-panel-icon"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">低风险接触者</div>
                    <count-to
                        :start-val="0"
                        :end-val="num4"
                        :duration="1000"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import {allInfection,allHighRick,allLowRick,allClose} from '@/api/manage'
export default {
    components: {
        CountTo,
    },
    data(){
        return {
            num1:100000,
            num2:100000,
            num3:100000,
            num4:100000,
        }
    },
    created(){
        this.getInfection();
        this.getHighRick();
        this.getLowRick();
        this.getClose();
    },
    methods: {
        async getInfection(){
            let res = await allInfection();
            this.num1 = res.data.length;
        },
        async getHighRick(){
            let res = await allHighRick();
            this.num2 = res.data.length;
        },
        async getLowRick(){
            let res = await allLowRick();
            this.num3 = res.data.length;
        },
        async getClose(){
            let res = await allClose();
            this.num4 = res.data.length;
        },
    },
};
</script>

<style lang="scss" scoped>

.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .box_shadow{
        // -webkit-box-shadow: 10px 10px 5px black;
        box-shadow: 0px 0px 8px rgb(104, 104, 104);
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #000000;
            }

            .icon-diagnosis {
                background: #EE7476;
            }

            .icon-close {
                background: #8BA1BF;
            }

            .icon-high {
                background: #f4516c;
            }

            .icon-low {
                background: #F2B76F;
            }
        }

        .icon-diagnosis {
            color: #EE7476;
        }

        .icon-close {
            color: #8BA1BF;
        }

        .icon-high {
            color: #f4516c;
        }

        .icon-low {
            color: #F2B76F;
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}

@media (max-width: 550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;

        .svg-icon {
            display: block;
            margin: 14px auto !important;
            float: none !important;
        }
    }
}
</style>
