// import fetch from 'cross-fetch';

import {
    srAction,
    ssAction,
    sfAction
} from './action';

function fetchSearch(isSuccess) {

    return dispatch => {
        dispatch(srAction())
        return fetch("./data.json")
            .then(res => {
                let contentType = res.headers.get('content-type');
                if(contentType.includes('application/json')) {
                    return res.json()
                }else if(contentType.includes('text/html')) {
                    return res.text()
                }
            })
            .then(d => {
                if(d.code == 1) {
                    if(isSuccess == 'success') {
                        dispatch(ssAction(d.result))

                    }else if(isSuccess == 'fail') {
                        dispatch(sfAction(d.error))
                    }
                }
            })
            .catch(err => {
                console.log('请求出错：', err);
            })
    }
}

export default fetchSearch;




