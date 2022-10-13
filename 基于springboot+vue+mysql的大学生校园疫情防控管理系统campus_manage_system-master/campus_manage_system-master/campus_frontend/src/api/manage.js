import request from "@/utils/request";

// 查询所有确诊者
export function allInfection() {
    return request({
        url: "/infection/all_infection",
        method: "get",
    });
}
// 添加确诊者
export function addInfection(data) {
    return request({
        url: "/infection/insert_infection",
        method: "post",
        data,
    });
}
// 修改确诊者
export function alterInfection(data) {
    return request({
        url: "/infection/update_infection",
        method: "put",
        data,
    });
}
// 根据姓名获取确诊者
export function getInfection(name) {
    return request({
        url: `/infection/query_infection?m_name=${name}`,
        method: "get"
    });
}
// 删除确诊者
export function deleteInfection(id) {
    return request({
        url: `/infection/remove_infection/${id}`,
        method: "delete"
    });
}



// 查询所有高风险者
export function allHighRick() {
    return request({
        url: "/highrick/all_highrick",
        method: "get",
    });
}
// 添加高风险者
export function addHighRick(data) {
    return request({
        url: "/highrick/insert_highrick",
        method: "post",
        data,
    });
}
// 修改高风险者
export function alterHighRick(data) {
    return request({
        url: "/highrick/update_highrick",
        method: "put",
        data,
    });
}
// 根据姓名获取高风险者
export function getHighRick(name) {
    return request({
        url: `/highrick/query_highrick?m_name=${name}`,
        method: "get"
    });
}
// 删除高风险者
export function deleteHighRick(id) {
    return request({
        url: `/highrick/remove_highrick/${id}`,
        method: "delete"
    });
}



// 查询所有低风险者
export function allLowRick() {
    return request({
        url: "/lowrick/all_lowrick",
        method: "get",
    });
}
// 添加低风险者
export function addLowRick(data) {
    return request({
        url: "/lowrick/insert_lowrick",
        method: "post",
        data,
    });
}
// 修改低风险者
export function alterLowRick(data) {
    return request({
        url: "/lowrick/update_lowrick",
        method: "put",
        data,
    });
}
// 根据姓名获取低风险者
export function getLowRick(name) {
    return request({
        url: `/lowrick/query_lowrick?m_name=${name}`,
        method: "get"
    });
}
// 删除低风险者
export function deleteLowRick(id) {
    return request({
        url: `/lowrick/remove_lowrick/${id}`,
        method: "delete"
    });
}



// 查询所有密切接触者
export function allClose() {
    return request({
        url: "/close/all_close",
        method: "get",
    });
}
// 添加密切接触者
export function addClose(data) {
    return request({
        url: "/close/insert_close",
        method: "post",
        data,
    });
}
// 修改密切接触者
export function alterClose(data) {
    return request({
        url: "/close/update_close",
        method: "put",
        data,
    });
}
// 根据姓名获取密切接触者
export function getClose(name) {
    return request({
        url: `/close/query_close?m_name=${name}`,
        method: "get"
    });
}
// 删除密切接触者
export function deleteClose(id) {
    return request({
        url: `/close/remove_close/${id}`,
        method: "delete"
    });
}