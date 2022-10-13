<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="health-container" :key="1">
            <!-- 申报人管理 -->
            <el-card class="applyManage">
                <!-- 标题 -->
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>申报人信息</span>
                </div>

                <!-- 搜索与添加 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="请输入姓名"
                            v-model="applyQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryInfoer"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addMessage1()"
                            >添加申报人</el-button
                        >
                    </el-col>
                </el-row>

                <!-- 增删改查 -->
                <el-table :data="newApplyList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="姓名"
                        prop="i_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="170px"
                        label="证件号码"
                        prop="i_idcard"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="130px"
                        label="手机号码"
                        prop="i_phone"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="性别"
                        prop="i_gender"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="95px"
                        label="出生日期"
                        prop="i_birth"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="90px"
                        label="国籍/地区"
                        prop="i_nationality"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="100px"
                        label="户籍所在地"
                        prop="i_native"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="籍贯"
                        prop="i_domicile"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="250px"
                        label="居住地址"
                        prop="i_address"
                    ></el-table-column>
                    <el-table-column align="center" label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showInfo(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeInfo(scope.row)"
                                >删除</el-button
                            >
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
                    @size-change="applyHandleSizeChange"
                    @current-change="applyHandleCurrentChange"
                    :current-page="applyQueryInfo.pageNum"
                    :page-sizes="[1, 2, 10, 15]"
                    :page-size="applyQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(applyQueryInfo.total = applyList.length)"
                >
                </el-pagination>
            </el-card>

            <!-- 健康状况管理 -->
            <el-card class="healthManage">
                <!-- 标题 -->
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>健康信息</span>
                </div>

                <!-- 搜索与添加 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="请输入姓名"
                            v-model="healthQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryMessage"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addMessage2()"
                            >添加健康信息</el-button
                        >
                    </el-col>
                </el-row>
                <!-- 增删改查 -->
                <el-table :data="newHealthList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="编号"
                        prop="m_stuid"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="姓名"
                        prop="m_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="学院"
                        prop="m_college"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="班级"
                        prop="m_class"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="近期居住地"
                        prop="m_recent_resi"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="近期接触地"
                        prop="m_recent_touch"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="接触时间"
                        prop="m_touch_date"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="健康状况"
                        prop="m_health_status"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="状况描述"
                        prop="m_status_des"
                    ></el-table-column>
                    <el-table-column align="center" label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showMessage(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeMessage(scope.row)"
                                >删除</el-button
                            >
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
                    @size-change="healthHandleSizeChange"
                    @current-change="healthHandleCurrentChange"
                    :current-page="healthQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="healthQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(healthQueryInfo.total = healthList.length)"
                >
                </el-pagination>
            </el-card>

            <!-- 接种记录管理 -->
            <el-card class="vaccinationManage">
                <!-- 标题 -->
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>接种记录</span>
                </div>
                <!-- 搜索与添加 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="请输入姓名"
                            v-model="vaccinationQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryRecord"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button
                            type="primary"
                            @click="addMessage3()"
                            >添加接种记录</el-button
                        >
                    </el-col>
                </el-row>
                <!-- 增删改查 -->
                <el-table :data="newVaccinationList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="150px"
                        label="编号"
                        prop="r_stuid"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="姓名"
                        prop="r_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="200px"
                        label="疫苗名称"
                        prop="r_vaccine"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="100px"
                        label="疫苗批号"
                        prop="r_num"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="50px"
                        label="针次"
                        prop="r_inject"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="厂家名称"
                        prop="r_manufacturer"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="300px"
                        label="接种单位"
                        prop="r_vac_unit"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="接种时间"
                        prop="r_vac_date"
                    ></el-table-column>
                    <el-table-column align="center" label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showRecord(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeRecord(scope.row)"
                                >删除</el-button
                            >
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
                    @size-change="vaccinationHandleSizeChange"
                    @current-change="vaccinationHandleCurrentChange"
                    :current-page="vaccinationQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="vaccinationQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="
                        (vaccinationQueryInfo.total = vaccinationList.length)
                    "
                >
                </el-pagination>
            </el-card>

            <!-- 添加申报人对话框 -->
            <el-drawer
                title="申报人添加"
                :visible.sync="applyDrawer"
                direction="rtl"
                :before-close="handleApplyClose"
                class="drawer_one"
            >
                <el-form
                    ref="applyFormRef"
                    :model="applyForm"
                    :rules="applyRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="姓名" prop="i_name">
                        <el-input v-model="applyForm.i_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="i_idcard">
                        <el-input v-model="applyForm.i_idcard" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="i_phone">
                        <el-input v-model="applyForm.i_phone" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="i_gender">
                        <el-radio v-model="applyForm.i_gender" :label="0" border
                            >男</el-radio
                        >
                        <el-radio v-model="applyForm.i_gender" :label="1" border
                            >女</el-radio
                        >
                    </el-form-item>
                    <el-form-item label="出生日期" prop="i_birth">
                        <el-date-picker
                            v-model="applyForm.i_birth"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="国籍/地区" prop="i_nationality">
                        <el-input v-model="applyForm.i_nationality" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="户籍所在地" prop="i_domicile">
                        <el-input v-model="applyForm.i_domicile" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯" prop="i_native">
                        <el-input v-model="applyForm.i_native" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="居住地址" prop="i_address">
                        <el-input v-model="applyForm.i_address" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertInfo()"
                            >添加</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <!-- 添加健康信息对话框 -->
            <el-drawer
                title="健康信息添加"
                :visible.sync="healthDrawer"
                direction="rtl"
                :before-close="handleHealthClose"
            >
                <el-form
                    ref="healthFormRef"
                    :model="healthForm"
                    :rules="healthRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input v-model="healthForm.m_stuid" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input v-model="healthForm.m_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input v-model="healthForm.m_college" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input v-model="healthForm.m_class" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="近期居住地" prop="m_recent_resi">
                        <el-input v-model="healthForm.m_recent_resi" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="近期接触地" prop="m_recent_touch">
                        <el-input
                            v-model="healthForm.m_recent_touch"
                            placeholder="请输入内容~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="接触时间" prop="m_touch_date">
                        <el-date-picker
                            v-model="healthForm.m_touch_date"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="健康状况" prop="m_health_status">
                        <el-input
                            v-model="healthForm.m_health_status"
                            placeholder="请输入内容~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="状况描述" prop="m_status_des">
                        <el-input v-model="healthForm.m_status_des" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertMessage()"
                            >添加</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <!-- 添加接种记录对话框 -->
            <el-drawer
                title="接种记录添加"
                :visible.sync="vaccinationDrawer"
                direction="rtl"
                :before-close="handleVaccinationClose"
            >
                <el-form
                    ref="inoculateFormRef"
                    :model="inoculateForm"
                    :rules="inoculateRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="r_stuid">
                        <el-input v-model="inoculateForm.r_stuid" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="r_name">
                        <el-input v-model="inoculateForm.r_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="疫苗名称" prop="r_vaccine">
                        <el-input v-model="inoculateForm.r_vaccine" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="针次" prop="r_inject">
                        <el-input v-model="inoculateForm.r_inject" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="批号" prop="r_num">
                        <el-input v-model="inoculateForm.r_num" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="厂家名称" prop="r_manufacturer">
                        <el-input
                            v-model="inoculateForm.r_manufacturer"
                            placeholder="请输入内容~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="接种单位" prop="r_vac_unit">
                        <el-input v-model="inoculateForm.r_vac_unit" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="接种时间" prop="r_vac_date">
                        <el-date-picker
                            v-model="inoculateForm.r_vac_date"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertRecord()"
                            >添加</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <!-- 编辑申报 -->
            <el-dialog title="修改信息" :visible.sync="applyDialog" width="50%">
                <el-form
                    ref="applyFormRef"
                    :model="applyForm"
                    :rules="applyRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="姓名" prop="i_name">
                        <el-input v-model="applyForm.i_name" placeholder="请输入内容~" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="i_idcard">
                        <el-input v-model="applyForm.i_idcard" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="i_phone">
                        <el-input v-model="applyForm.i_phone" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="i_gender">
                        <el-radio v-model="applyForm.i_gender" :label="0" border
                            >男</el-radio
                        >
                        <el-radio v-model="applyForm.i_gender" :label="1" border
                            >女</el-radio
                        >
                    </el-form-item>
                    <el-form-item label="出生日期" prop="i_birth">
                        <el-date-picker
                            v-model="applyForm.i_birth"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="国籍/地区" prop="i_nationality">
                        <el-input v-model="applyForm.i_nationality" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="户籍所在地" prop="i_domicile">
                        <el-input v-model="applyForm.i_domicile" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯" prop="i_native">
                        <el-input v-model="applyForm.i_native" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="居住地址" prop="i_address">
                        <el-input v-model="applyForm.i_address" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateInfo()"
                            >修改</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 编辑健康 -->
            <el-dialog
                title="修改信息"
                :visible.sync="healthDialog"
                width="50%"
            >
                <el-form
                    ref="healthFormRef"
                    :model="healthForm"
                    :rules="healthRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="m_stuid">
                        <el-input v-model="healthForm.m_stuid" placeholder="请输入内容~" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="m_name">
                        <el-input v-model="healthForm.m_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="m_college">
                        <el-input v-model="healthForm.m_college" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="m_class">
                        <el-input v-model="healthForm.m_class" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="近期居住地" prop="m_recent_resi">
                        <el-input v-model="healthForm.m_recent_resi" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="近期接触地" prop="m_recent_touch">
                        <el-input
                            v-model="healthForm.m_recent_touch"
                             placeholder="请输入内容~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="接触时间" prop="m_touch_date">
                        <el-date-picker
                            v-model="healthForm.m_touch_date"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="健康状况" prop="m_health_status">
                        <el-input
                            v-model="healthForm.m_health_status"
                             placeholder="请输入内容~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="状况描述" prop="m_status_des">
                        <el-input v-model="healthForm.m_status_des" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateMessage()"
                            >修改</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 编辑接种 -->
            <el-dialog
                title="修改信息"
                :visible.sync="vaccinationDialog"
                width="50%"
            >
                <el-form
                    ref="inoculateFormRef"
                    :model="inoculateForm"
                    :rules="inoculateRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="编号" prop="r_stuid">
                        <el-input v-model="inoculateForm.r_stuid" placeholder="请输入内容~" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="r_name">
                        <el-input v-model="inoculateForm.r_name" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="疫苗名称" prop="r_vaccine">
                        <el-input v-model="inoculateForm.r_vaccine" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="针次" prop="r_inject">
                        <el-input v-model="inoculateForm.r_inject" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="批号" prop="r_num">
                        <el-input v-model="inoculateForm.r_num" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="厂家名称" prop="r_manufacturer">
                        <el-input
                            v-model="inoculateForm.r_manufacturer"
                             placeholder="请输入内容~"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="接种单位" prop="r_vac_unit">
                        <el-input v-model="inoculateForm.r_vac_unit" placeholder="请输入内容~"></el-input>
                    </el-form-item>
                    <el-form-item label="接种时间" prop="r_vac_date">
                        <el-date-picker
                            v-model="inoculateForm.r_vac_date"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateRecord()"
                            >修改接种记录</el-button
                        >
                        <el-button type="pain">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {
    allInfoer,
    allHealth,
    allRecord,
    getInfoer,
    getMessage,
    getRecord,
    addInfoer,
    addMessage,
    addRecord,
    alterInfoer,
    alterMessage,
    alterRecord,
    deleteInfoer,
    deleteMessage,
    deleteRecord,
} from "@/api/health";
export default {
    name: "HealthManage",
    created() {
        // console.log(this.$store.state.user.rolesData.personal_info.health_infoers[0],"申报人信息");
        // console.log(this.$store.state.user.rolesData.personal_info.health_messages[0],"健康信息");
        // console.log(this.$store.state.user.rolesData.personal_info.health_records[0],"接种信息");
        this.getAllInfoer();
        this.getAllHealth();
        this.getAllRecord();
    },
    data() {
        // 字母数字汉字正则
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");
        // 手机号码正则
        const phone = new RegExp(
            "/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/"
        );
        // 邮箱正则
        const email = new RegExp(
            "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/"
        );
        // 证件号码正则
        const idCard = new RegExp(
            "/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"
        );

        // 账号密码验证(匿名函数)
        let InvalidString = (rule, value, callback) => {
            // 验证非法字符串
            if (pat.test(value) === true) {
                callback(new Error("包含非法字符串、只可以是字母数字或汉字"));
            } else {
                callback();
            }
        };

        // 手机号码验证(匿名函数)
        let InvalidPhone = (rule, value, callback) => {
            // 验证手机号合法性
            if (phone.test(value) === true) {
                callback(new Error("包括非法字符、只可以是数字"));
            } else {
                callback();
            }
        };

        // 邮箱验证(匿名函数)
        let InvalidEmail = (rule, value, callback) => {
            // 验证手机号合法性
            if (email.test(value) === true) {
                callback(new Error("邮箱不合法"));
            } else {
                callback();
            }
        };

        // 证件号码验证(匿名函数)
        let InvalidIdCard = (rule, value, callback) => {
            // 验证手机号合法性
            if (email.idCard(value) === true) {
                callback(new Error("证件号码不合法"));
            } else {
                callback();
            }
        };
        return {
            // 分页器
            applyQueryInfo: {
                query: "",
                pageNum: 1, // 当前页码
                pageSize: 2, // 每页显示条数
                total: 0,
            },
            healthQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            vaccinationQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            // 接口数据
            applyList: [],
            healthList: [],
            vaccinationList: [],
            // 抽屉显示与隐藏
            applyDrawer: false,
            healthDrawer: false,
            vaccinationDrawer: false,
            // 表单数据
            applyForm: {
                i_name: "",
                i_idcard: "",
                i_phone: "",
                i_gender: 0,
                i_birth: "",
                i_nationality: "",
                i_domicile: "",
                i_native: "",
                i_address: "",
            },
            healthForm: {
                m_stuid: "",
                m_name: "",
                m_college: "",
                m_class: "",
                m_recent_resi: "",
                m_recent_touch: "",
                m_touch_date: "",
                m_health_status: "",
                m_status_des: "",
            },
            inoculateForm: {
                r_stuid: "",
                r_name: "",
                r_vaccine: "",
                r_inject: "",
                r_num: "",
                r_manufacturer: "",
                r_vac_unit: "",
                r_vac_date: "",
            },
            // 验证规则
            applyRules: {
                i_name: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_idcard: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_phone: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_gender: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_birth: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_nationality: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_domicile: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_native: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                i_address: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
            healthRules: {
                m_stuid: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_name: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_college: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_class: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_resi: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_touch: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_touch_date: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_health_status: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                m_status_des: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
            inoculateRules: {
                r_stuid: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_name: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_vaccine: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_inject: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_num: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_manufacturer: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_vac_unit: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
                r_vac_date: [
                    {
                        required: true,
                        message: "必填项!",
                        trigger: "change blur focus",
                    },
                ],
            },
            // 对话框显示与隐藏
            applyDialog: false,
            healthDialog: false,
            vaccinationDialog: false,
        };
    },
    methods: {
        addMessage1(){
            this.applyDrawer = true;
            this.applyForm = {}
        },
        addMessage2(){
            this.healthDrawer = true;
            this.healthForm = {}
        },
        addMessage3(){
            this.vaccinationDrawer = true;
            this.inoculateForm = {}
        },
        // 所有申报人数据
        async getAllInfoer() {
            let res = await allInfoer();
            res.data.forEach((item) => {
                item.i_gender = item.i_gender == 0 ? "男" : "女";
                item.i_birth = item.i_birth.slice(0, 10);
            });
            this.applyList = res.data;
        },
        // 所有健康数据
        async getAllHealth() {
            let res = await allHealth();
            res.data.forEach((item) => {
                item.m_touch_date = item.m_touch_date.slice(0, 10);
            });
            this.healthList = res.data;
        },
        // 所有接种记录
        async getAllRecord() {
            let res = await allRecord();
            res.data.forEach((item) => {
                item.r_vac_date = item.r_vac_date.slice(0, 10);
            });
            this.vaccinationList = res.data;
        },
        // 申报人模糊搜索
        async queryInfoer() {
            console.log(this.applyQueryInfo.query);
            if (this.applyQueryInfo.query.length > 0) {
                let res = await getInfoer(this.applyQueryInfo.query);
                this.applyList = res.data;
            } else {
                this.getAllInfoer();
            }
        },
        // 健康信息模糊搜索
        async queryMessage() {
            console.log(this.healthQueryInfo.query);
            if (this.healthQueryInfo.query.length > 0) {
                let res = await getMessage(this.healthQueryInfo.query);
                console.log(res);
                this.healthList = res.data;
            } else {
                this.getAllHealth();
            }
        },
        // 接种记录模糊搜索
        async queryRecord() {
            console.log(this.vaccinationQueryInfo.query);
            if (this.vaccinationQueryInfo.query.length > 0) {
                let res = await getRecord(this.vaccinationQueryInfo.query);
                console.log(res);
                this.vaccinationList = res.data;
            } else {
                this.getAllRecord();
            }
        },
        // 添加申报人
        async insertInfo() {
            this.$refs.applyFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addInfoer(this.applyForm);
                    if (res.status === 200) {
                        this.getAllInfoer();
                        this.$message({
                            type: "success",
                            message: "申报人添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "申报人已存在",
                        });
                    }
                } else {
                    this.$message({
                        message: "请完善信息谢谢",
                        type: "warning",
                    });
                }
            });
        },
        // 添加健康信息
        async insertMessage() {
            this.$refs.healthFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addMessage(this.healthForm);
                    if (res.status === 200) {
                        this.getAllHealth();
                        this.$message({
                            type: "success",
                            message: "健康信息添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "健康信息已存在",
                        });
                    }
                } else {
                    this.$message({
                        message: "请完善信息谢谢",
                        type: "warning",
                    });
                }
            });
        },
        // 添加接种记录
        async insertRecord() {
            this.$refs.inoculateFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await addRecord(this.inoculateForm);
                    if (res.status === 200) {
                        this.getAllRecord();
                        this.$message({
                            type: "success",
                            message: "接种记录添加成功",
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: "接种记录已存在",
                        });
                    }
                } else {
                    this.$message({
                        message: "请完善信息谢谢",
                        type: "warning",
                    });
                }
            });
        },
        // 显示当前申报人
        async showInfo(row) {
            this.applyDialog = true;
            row.i_gender = row.i_gender == "男" ? 0 : 1;
            this.applyForm = row;
        },
        // 显示当前健康信息
        async showMessage(row) {
            this.healthDialog = true;
            this.healthForm = row;
        },
        // 显示当前接种记录
        async showRecord(row) {
            this.vaccinationDialog = true;
            this.inoculateForm = row;
        },
        // 修改当前申报人
        async updateInfo() {
            this.$refs.applyFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterInfoer(this.applyForm);
                    if (res.status === 200) {
                        this.getAllInfoer();
                        this.$message({
                            type: "success",
                            message: "申报人修改成功",
                        });
                        setTimeout(()=>{
                            this.applyDialog = false;
                        },2000)
                    }
                } else {
                    this.$message({
                        message: "请完善信息谢谢",
                        type: "warning",
                    });
                }
            });
        },
        // 修改当前健康信息
        async updateMessage() {
            this.$refs.healthFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterMessage(this.healthForm);
                    if (res.status === 200) {
                        this.getAllHealth();
                        this.$message({
                            type: "success",
                            message: "健康信息修改成功",
                        });
                        setTimeout(()=>{
                            this.healthDialog = false;
                        },2000);
                    }
                } else {
                    this.$message({
                        message: "请完善信息谢谢",
                        type: "warning",
                    });
                }
            });
        },
        // 修改当前接种记录
        async updateRecord() {
            this.$refs.inoculateFormRef.validate(async (valid) => {
                if (valid) {
                    let res = await alterRecord(this.inoculateForm);
                    if (res.status === 200) {
                        this.getAllRecord();
                        this.$message({
                            type: "success",
                            message: "接种记录修改成功",
                        });
                        setTimeout(()=>{
                            this.vaccinationDialog = false;
                        },2000);
                    }
                } else {
                    this.$message({
                        message: "请完善信息谢谢",
                        type: "warning",
                    });
                }
            });
        },
        // 删除当前申报人
        async removeInfo(row) {
            this.$confirm('', '你确定要删除该条数据嘛？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning',
                center: true
            }).then(async () => {
                let res = await deleteInfoer(row.id);
                if (res.status === 200) {
                    this.getAllInfoer();
                    this.$message({
                        type: "success",
                        message: "申报人删除成功",
                    });
                }
            })
        },
        // 删除当前申报人
        async removeMessage(row) {
            this.$confirm('', '你确定要删除该条数据嘛？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning',
                center: true
            }).then(async () => {
                let res = await deleteMessage(row.id);
                if (res.status === 200) {
                    this.getAllHealth();
                    this.$message({
                        type: "success",
                        message: "健康信息删除成功",
                    });
                }
            })
        },
        // 删除当前接种记录
        async removeRecord(row) {
            this.$confirm('', '你确定要删除该条数据嘛？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning',
                center: true
            }).then(async () => {
                let res = await deleteRecord(row.id);
                if (res.status === 200) {
                    this.getAllRecord();
                    this.$message({
                        type: "success",
                        message: "接种记录删除成功",
                    });
                }
            })
        },
        // 当鼠标离开抽屉触发1
        handleApplyClose(done) {
            done();
        },
        // 当鼠标离开抽屉触发2
        handleHealthClose(done) {
            done();
        },
        // 当鼠标离开抽屉触发3
        handleVaccinationClose(done) {
            done();
        },
        applyHandleSizeChange(val) {
            this.applyQueryInfo.pageSize = val;
        },
        applyHandleCurrentChange(val) {
            this.applyQueryInfo.pageNum = val;
        },
        healthHandleSizeChange(val) {
            this.healthQueryInfo.pageSize = val;
        },
        healthHandleCurrentChange(val) {
            this.healthQueryInfo.pageNum = val;
        },
        vaccinationHandleSizeChange(val) {
            this.vaccinationQueryInfo.pageSize = val;
        },
        vaccinationHandleCurrentChange(val) {
            this.vaccinationQueryInfo.pageNum = val;
        },
    },
    computed: {
        newApplyList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.applyList.slice(
                (this.applyQueryInfo.pageNum - 1) *
                    this.applyQueryInfo.pageSize,
                this.applyQueryInfo.pageNum * this.applyQueryInfo.pageSize
            );
        },
        newHealthList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.healthList.slice(
                (this.healthQueryInfo.pageNum - 1) *
                    this.healthQueryInfo.pageSize,
                this.healthQueryInfo.pageNum * this.healthQueryInfo.pageSize
            );
        },
        newVaccinationList() {
            // pageNum当前页数, pageSize每页显示条数
            // 分页公式第一部分：(当前页数-1)*每页显示条数：(1-1)*2=0、(2-1)*2=2
            // 分页公式第二部分：当前页数*每页条数=总数：1*2=2、2*2=4
            // slice得出：0,2、2,4
            return this.vaccinationList.slice(
                (this.vaccinationQueryInfo.pageNum - 1) *
                    this.vaccinationQueryInfo.pageSize,
                this.vaccinationQueryInfo.pageNum *
                    this.vaccinationQueryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.health-container {
    .applyManage {
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
    .healthManage {
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
    .vaccinationManage {
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
