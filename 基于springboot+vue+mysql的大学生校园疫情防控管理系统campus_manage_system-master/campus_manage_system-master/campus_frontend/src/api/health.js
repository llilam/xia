import request from "@/utils/request";

// 查询所有申报人
export function allInfoer() {
    return request({
        url: "/infoer/all_infoer",
        method: "get",
    });
}
// 添加申报人
export function addInfoer(data) {
    return request({
        url: "/infoer/insert_infoer",
        method: "post",
        data,
    });
}
// 修改申报人
export function alterInfoer(data) {
    return request({
        url: "/infoer/update_infoer",
        method: "put",
        data,
    });
}
// 根据姓名获取申报人
export function getInfoer(name) {
    return request({
        url: `/infoer/query_infoer?i_name=${name}`,
        method: "get"
    });
}
// 删除申报人
export function deleteInfoer(id) {
    return request({
        url: `/infoer/remove_infoer/${id}`,
        method: "delete"
    });
}


// 查询所有健康信息
export function allHealth() {
    return request({
        url: "/message/all_message",
        method: "get",
    });
}
// 添加健康信息
export function addMessage(data) {
    return request({
        url: "/message/insert_message",
        method: "post",
        data,
    });
}
// 修改健康信息
export function alterMessage(data) {
    return request({
        url: "/message/update_message",
        method: "put",
        data,
    });
}
// 根据姓名获取健康信息
export function getMessage(name) {
    return request({
        url: `/message/query_message?m_name=${name}`,
        method: "get"
    });
}
// 删除健康信息
export function deleteMessage(id) {
    return request({
        url: `/message/remove_message/${id}`,
        method: "delete"
    });
}


// 查询所有记录
export function allRecord() {
    return request({
        url: "/record/all_record",
        method: "get",
    });
}
// 添加记录
export function addRecord(data) {
    return request({
        url: "/record/insert_record",
        method: "post",
        data,
    });
}
// 修改记录
export function alterRecord(data) {
    return request({
        url: "/record/update_record",
        method: "put",
        data,
    });
}
// 根据姓名获取记录
export function getRecord(name) {
    return request({
        url: `/record/query_record?r_name=${name}`,
        method: "get"
    });
}
// 删除记录
export function deleteRecord(id) {
    return request({
        url: `/record/remove_record/${id}`,
        method: "delete"
    });
}


// 查询所有行程
export function allJourney() {
    return request({
        url: "/journey/all_journey",
        method: "get",
    });
}
// 添加行程
export function addJourney(data) {
    return request({
        url: "/journey/insert_journey",
        method: "post",
        data,
    });
}
// 修改行程
export function alterJourney(data) {
    return request({
        url: "/journey/update_journey",
        method: "put",
        data,
    });
}
// 根据姓名获取行程
export function getJourney(name) {
    return request({
        url: `/journey/query_journey?d_name=${name}`,
        method: "get"
    });
}
// 删除行程
export function deleteJourney(id) {
    return request({
        url: `/journey/remove_journey/${id}`,
        method: "delete"
    });
}

