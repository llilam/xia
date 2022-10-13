import request from "@/utils/request";

// 角色注册
export function register(data) {
    return request({
        url: "/role/reg_role",
        method: "post",
        data,
    });
}

// 角色登录
export function login(data) {
    return request({
        url: "/role/login_role",
        method: "post",
        data,
    });
}

// 校内疫情通知
export function campusNotices(){
    return request({
        url: "/campus/all_campus",
        method: "get"
    })
}

// 国内疫情通知
export function domesticNotices(){
    return request({
        url: "/domestic/all_domestic",
        method: "get"
    })
}

// 查询所有角色
export function queryAllRole() {
    return request({
        url: "/role/all_role",
        method: "get",
    });
}

// 根据姓名查询角色
export function querySingleRole(data) {
    return request({
        url: "/role/query_role",
        method: "get",
        data,
    });
}

// 角色修改
export function updateRole(data) {
    return request({
        url: "/role/update_role",
        method: "put",
        data,
    });
}

// 角色添加
export function insertRole(data) {
    return request({
        url: "/role/insert_role",
        method: "post",
        data,
    });
}

// 角色删除
export function removeRole(data) {
    return request({
        url: "/role/remove_role",
        method: "delete",
        data,
    });
}

// 根据账号修改密码
export function updatePass(data) {
    return request({
        url: "/role/update_role_pass",
        method: "post",
        data,
    });
}

