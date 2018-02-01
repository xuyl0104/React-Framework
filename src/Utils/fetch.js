import fetch from 'isomorphic-fetch';
import OfflineFunc from './offline';

export default class Request {
    constructor(url, options) {
        this.url = url;
        this.options = options;
    }

    checkNetworkStatus() {
        let object = OfflineFunc().check();
        console.log(OfflineFunc());
        console.log(object.status);
        console.log(OfflineFunc().check());
    }

    get() {
        const defaultOptions = {
            credentials: 'include',
            method: 'GET'
        };
        const newOptions = {
            ...defaultOptions,
            ...this.options
        };
    }

    post() {}

    put() {}

    delete() {}

    toJson(promise) {
        return promise.json();
    }
    
    request() {
        const defaultOptions = {
            credentials: 'include'
        };
        const newOptions = {
            ...defaultOptions,
            ...this.options
        };
        if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers
            };
            newOptions.body = JSON.stringify(newOptions.body);
        }

        console.log(newOptions);
        let fetch_promise = fetch(this.url, newOptions);

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
    }
}