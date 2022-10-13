import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

// 静态路由(登录、后台首页、个人中心、校园疫情、我的健康)
export const constantRoutes = [
    {
        path: "/login",
        name: "Login",
        meta: { title: "校园疫情管理系统-登录" },
        component: () => import("@/views/login/index"),
        hidden: true,
    },
    {
        /*
          根路由特点
          1.进入 / 加载侧边栏
          2.重定向子组件home
              - 这个根路由, 没有路由名称
              - 这个根路由, 没有路由元
      */
        // 进入/--加载侧边栏组件--重定向子组件home
        path: "/",
        component: Layout,
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        meta: { title: "后台首页", icon: "home" },
        component: Layout,
        redirect: "/home/roleLoginInfo",
        children: [
            {
                path: "roleLoginInfo",
                name: "RoleLoginInfo",
                meta: { title: "角色登录信息", icon: "function" },
                component: () => import("@/views/home/roleLoginInfo"),
            },
            {
                path: "informationInform",
                name: "InformationInform",
                meta: { title: "疫情消息通知", icon: "function" },
                component: () => import("@/views/home/informationInform"),
            },
        ],
    },
    {
        path: "/personal",
        name: "Personal",
        meta: { title: "个人中心", icon: "personal" },
        component: Layout,
        redirect: "/personal/personalInfo",
        children: [
            {
                path: "personalInfo",
                name: "PersonalInfo",
                meta: { title: "个人信息", icon: "function" },
                component: () => import("@/views/personal/personalInfo"),
            },
            {
                path: "tree",
                name: "Tree",
                meta: { title: "修改密码", icon: "function" },
                component: () => import("@/views/personal/alterPassword"),
            },
        ],
    },
    {
        path: "/map",
        name: "Map",
        meta: { title: "校园疫情", icon: "map" },
        component: Layout,
        redirect: "/map/nationalData",
        children: [
            {
                path: "nationalData",
                name: "NationalData",
                meta: { title: "全国疫情数据", icon: "function" },
                component: () => import("@/views/map/nationalData"),
            },
            {
                path: "campusData",
                name: "CampusData",
                meta: { title: "校内疫情数据", icon: "function" },
                component: () => import("@/views/map/campusData"),
            },
        ],
    },
    {
        path: "/health",
        name: "Health",
        meta: { title: "我的健康", icon: "health" },
        component: Layout,
        redirect: "/health/healthInput",
        children: [
            {
                path: "healthInput",
                name: "HealthInput",
                meta: { title: "健康信息录入", icon: "function" },
                component: () => import("@/views/health/healthInput"),
            },
            {
                path: "journeyInput",
                name: "JourneyInput",
                meta: { title: "行程录入", icon: "function" },
                component: () => import("@/views/health/journeyInput"),
            },
        ],
    },
    {
        path: "/data",
        name: "Data",
        meta: { title: "疫情数据", icon: "data", role: [3] },
        component: Layout,
        redirect: "/data/healthManage",
        children: [
            {
                path: "healthManage",
                name: "HealthManage",
                meta: { title: "健康信息管理", icon: "function" },
                component: () => import("@/views/data/healthManage"),
            },
            {
                path: "journeyManage",
                name: "JourneyManage",
                meta: { title: "行程数据管理", icon: "function" },
                component: () => import("@/views/data/journeyManage"),
            },
        ],
    },
    {
        path: "/manage",
        name: "Manage",
        meta: { title: "疫情管理", icon: "manage", role: [3] },
        component: Layout,
        redirect: "/manage/confirmManage",
        children: [
            {
                path: "confirmManage",
                name: "ConfirmManage",
                meta: { title: "确诊管理", icon: "function" },
                component: () => import("@/views/manage/confirmManage"),
            },
            {
                path: "contactsManage",
                name: "ContactsManage",
                meta: { title: "密切接触者信息管理", icon: "function" },
                component: () => import("@/views/manage/contactsManage"),
            },
            {
                path: "highRickManage",
                name: "HighRickManage",
                meta: { title: "中高风险接触者信息管理", icon: "function" },
                component: () => import("@/views/manage/highRickManage"),
            },
            {
                path: "lowRickManage",
                name: "LowRickManage",
                meta: { title: "低风险接触者信息管理", icon: "function" },
                component: () => import("@/views/manage/lowRickManage"),
            },
        ],
    },
    {
        path: "/other",
        name: "Other",
        meta: { title: "其他管理", icon: "other", role: [3] },
        component: Layout,
        redirect: "/other/roleDataManage",
        children: [
            {
                path: "roleDataManage",
                name: "RoleDataManage",
                meta: { title: "角色数据管理", icon: "function" },
                component: () => import("@/views/other/roleDataManage"),
            },
            {
                path: "informationManage",
                name: "InformationManage",
                meta: { title: "疫情消息管理", icon: "function" },
                component: () => import("@/views/other/informationManage"),
            },
            {
                path: "loginJournal",
                name: "LoginJournal",
                meta: { title: "登录日志", icon: "function" },
                component: () => import("@/views/other/loginJournal"),
            },
        ],
    },
    // 404页必须放在末尾
    {
        // 访问其他路由路径, 则重定向到404
        path: "*",
        redirect: "/404",
        hidden: true,
    },
    {
        path: "/404",
        name: "Four zero Four",
        meta: { title: "校园疫情管理系统-404" },
        component: () => import("@/views/404"),
        hidden: true,
    },
];

// 动态路由
export const asyncRoutes = [];

// 初始化静态路由
const createRouter = () =>
    new Router({
        // 历史模式需要服务支持
        // mode: 'history',

        // 当切换到新路由时, 页面滚到顶部
        scrollBehavior: () => ({ y: 0 }),

        // 注册路由
        routes: constantRoutes,
    });

const router = createRouter();

router.beforeEach((to, form, next) => {
    if (to.path == "/login") {
        next();
    } else {
        const isToken = localStorage.getItem("campusToken") ? true : false;
        if (!isToken) {
            next("/login");
        } else {
            next();
        }
    }
});

// 重置路由
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
