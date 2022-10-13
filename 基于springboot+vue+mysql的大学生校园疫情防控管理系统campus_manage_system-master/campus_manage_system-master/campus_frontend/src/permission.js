import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); 

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf(3) >= 0) return true; 
    if (!permissionRoles) return true;
    return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ["/login"]; 

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // 路由加载进度条
    NProgress.start(); 
    // 判断 token 是否存在
    if (getToken()) {
        if (to.path === "/login") {
            next({ path: "/" });
            NProgress.done(); 
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch("user/getInfo").then((res) => {
                    const roles = res[2].r_role;
                    store.dispatch("permission/GenerateRoutes", { roles }).then(() => {
                        // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    });
                }).catch((err) => {
                    store.dispatch("user/logout").then(() => {
                        next({ path: "/login" });
                    });
                });
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next(); //
                } else {
                    next({
                        path: "/401",
                        replace: true,
                        query: { noGoBack: true },
                    });
                }
                // 可删 ↑
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login"); // 否则全部重定向到登录页
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
