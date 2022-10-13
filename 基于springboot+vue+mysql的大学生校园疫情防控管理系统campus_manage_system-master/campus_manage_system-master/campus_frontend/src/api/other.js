import request from "@/utils/request";

// 查询所有角色
export function allRole() {
    return request({
        url: "/role/all_role",
        method: "get",
    });
}
// 添加角色
export function addRole(data) {
    return request({
        url: "/role/insert_role",
        method: "post",
        data,
    });
}
// 修改角色
export function alterRole(data) {
    return request({
        url: "/role/update_role",
        method: "put",
        data,
    });
}
// 根据姓名获取角色
export function getRole(name) {
    return request({
        url: `/role/query_role?r_name=${name}`,
        method: "get",
    });
}
// 删除角色
export function deleteRole(id) {
    return request({
        url: `/role/remove_role/${id}`,
        method: "delete",
    });
}

// 查询作者信息
export function allAuthor() {
    return request({
        url: "/author/author_info",
        method: "get",
    });
}
// 根据名称修改作者信息
export function alterAuthor(data) {
    return request({
        url: "/author/update_author_info",
        method: "put",
        data,
    });
}

// 查询所有校内消息
export function allCampus() {
    return request({
        url: "/campus/all_campus",
        method: "get",
    });
}
// 添加校内消息
export function addCampus(data) {
    return request({
        url: "/campus/insert_campus",
        method: "post",
        data,
    });
}
// 修改校内消息
export function alterCampus(data) {
    return request({
        url: "/campus/update_campus",
        method: "put",
        data,
    });
}
// 根据标题获取校内消息
export function getCampus(title) {
    return request({
        url: `/campus/query_campus?n_title=${title}`,
        method: "get",
    });
}
// 删除校内消息
export function deleteCampus(id) {
    return request({
        url: `/campus/remove_campus/${id}`,
        method: "delete",
    });
}

// 查询所有国内消息
export function allDomestic() {
    return request({
        url: "/domestic/all_domestic",
        method: "get",
    });
}
// 添加国内消息
export function addDomestic(data) {
    return request({
        url: "/domestic/insert_domestic",
        method: "post",
        data,
    });
}
// 修改国内消息
export function alterDomestic(data) {
    return request({
        url: "/domestic/update_domestic",
        method: "put",
        data,
    });
}
// 根据标题获取国内消息
export function getDomestic(title) {
    return request({
        url: `/domestic/query_domestic?n_title=${title}`,
        method: "get",
    });
}
// 删除国内消息
export function deleteDomestic(id) {
    return request({
        url: `/domestic/remove_domestic/${id}`,
        method: "delete",
    });
}

// 查询所有登录日志
export function allJournal() {
    return request({
        url: "/journal/all_journal",
        method: "get",
    });
}
// 根据姓名模糊搜索
export function getJournal(name) {
    return request({
        url: `/journal/query_journal?j_name=${name}`,
        method: "get",
    });
}
// 添加登录日志
export function addJournal(data) {
    return request({
        url: "/journal/insert_journal",
        method: "post",
        data,
    });
}
