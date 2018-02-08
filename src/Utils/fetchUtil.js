import fetch from 'isomorphic-fetch';
import 'antd/lib/message/style/css';
import showMessage from './showMessage';

const codeMessage = {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功。',
    400: '操作失败，请重试',
    401: '操作失败，请重试',
    403: '操作失败，请重试',
    404: '页面未找到',
    406: '操作失败，请重试',
    410: '操作失败，请重试',
    422: '操作失败，请重试',
    500: '操作失败，请重试',
    502: '操作失败，请重试',
    503: '操作失败，请重试',
    504: '操作失败，请重试'
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    showMessage("warning", errortext, 2);
    // notification.error({message: `请求错误 ${response.status}: ${response.url}`, description: errortext});
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

/**
 * 
 * @param {*} url API请求路径
 * @param {*} options fetch请求参数
 * @param {*} type 返回的数据类型
 * @param {*} errorMessage 请求失败时显示的错误消息，默认为"操作失败"
 * @param {*} successText 请求成功时显示的提示消息
 */
export default function request(url, options, type, errorMessage, successText) {
    const defaultOptions = {
        credentials: 'include'
    };
    const newOptions = {
        ...defaultOptions,
        ...options
    };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        newOptions.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            ...newOptions.headers
        };
        newOptions.body = JSON.stringify(newOptions.body);
    }

    let fetch_promise = fetch(url, newOptions);

    let abort_fn = null;

    //这是一个可以被reject的promise
    let abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function() {
            reject(new Error('请求超时,请重试'));
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([fetch_promise, abort_promise]);

    setTimeout(function () {
        abort_fn();
    }, 5 * 1000);

    return abortable_promise
    .then(checkStatus)
    .then((response) => {
        if(successText !== "") {
            showMessage("success", successText);
        }
        if(type === "json") {
            return response.json()
        } else if(type === "text") {
            return response.text();
        }else if(type === "blob") {
            return response.blob();
        }

    })
    .catch((error) => {
        console.log(error.message);
        if(error.message) {
            showMessage("warning", error.message, 4);
        }
        if ('stack' in error && 'message' in error) {
            showMessage("warning", errorMessage, 2);
        }
    });
}