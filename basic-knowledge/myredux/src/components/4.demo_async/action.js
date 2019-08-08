
// 定义常量
export const SEARCH_REQUEST = 'SEARCH_REQUEST' // 查询请求
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS' // 查询成功
export const SEARCH_FAIL = 'SEARCH_FAIL' // 查询失败

// 定义action
// export const srAction = creatAction(SEARCH_REQUEST, { connect: false });
// export const ssAction = creatAction(SEARCH_SUCCESS, { connect: false, data: null });
// export const sfAction = creatAction(SEARCH_FAIL, { connect: false, error: null });

function creatAction(contrast, param) {
    return {
        type: contrast,
        ...param
    }
};
// console.log(srAction)

export function srAction() {
    return {
        type: SEARCH_REQUEST,

    }
}
export function ssAction(json) {
    return {
        type: SEARCH_SUCCESS,
        data: json
    }
}

export function sfAction() {
    return {
        type: SEARCH_FAIL,
        error: 'error'
    }
}