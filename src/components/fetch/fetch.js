import fetch from 'isomorphic-fetch';
import "rxjs";
import { Observable } from "rxjs";

import './style/css';

export default class Request {
    constructor(url, options) {
        this.url = url;
        this.options = options;
    }


    buildRequestObservable = (fetch, format) => {
        const request = new Promise((resolve, reject) => {
            fetch.then((response) => {
                if (!response.ok) {
                    // console.log(response)
                    reject(this.buildErrorInfo('error', 'api调用失败: ' + response.status + " " + response.statusText));
                } else {
                    if(format === 'json') {
                        response.json()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((e) => {
                            console.log(e)
                            reject(this.buildErrorInfo('error', e.toString()));
                        });
                    } else if (format === 'text') {
                        response.text()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((e) => {
                            console.log(e)
                            reject(this.buildErrorInfo('error', e.toString()));
                        });
                    }
                    else if (format === 'blob') {
                        response.blob()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((e) => {
                            console.log(e)
                            reject(this.buildErrorInfo('error', e.toString()));
                        });
                    }
                }
            })
            .catch((e) => {
                if(e.status === 'timeout') {
                    reject(this.buildErrorInfo('timeout', '网络超时，请重试'));
                }
                reject(this.buildErrorInfo('offline', 'fetch failed')); // 粗暴地认为是这种异常，之后版本会改进
            });
        });
        return Observable.fromPromise(request);
    };

    buildErrorInfo(code, msg) {
        return {
            status: code,
            msg: msg
        }
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
        return this.buildRequestObservable(this.request(newOptions), newOptions.format|| "json");
    }

    post() {
        const defaultOptions = {
            credentials: 'include',
            method: 'POST'
        };
        const newOptions = {
            ...defaultOptions,
            ...this.options
        };
        newOptions.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            ...newOptions.headers
        };
        newOptions.body = JSON.stringify(newOptions.body);
        return this.buildRequestObservable(this.request(newOptions), newOptions.format|| "json");
    }

    put() {
        const defaultOptions = {
            credentials: 'include',
            method: 'PUT'
        };
        const newOptions = {
            ...defaultOptions,
            ...this.options
        };
        newOptions.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            ...newOptions.headers
        };
        newOptions.body = JSON.stringify(newOptions.body);
        return this.buildRequestObservable(this.request(newOptions), newOptions.format|| "json");
    }

    delete() {
        const defaultOptions = {
            credentials: 'include',
            method: 'DELETE'
        };
        const newOptions = {
            ...defaultOptions,
            ...this.options
        };
        return this.buildRequestObservable(this.request(newOptions), newOptions.format|| "json");
    }

    patch() {
        const defaultOptions = {
            credentials: 'include',
            method: 'PATCH'
        };
        const newOptions = {
            ...defaultOptions,
            ...this.options
        };
        return this.buildRequestObservable(this.request(newOptions), newOptions.format|| "json");
    }
    
    request(options) {
        // console.log(options);
        let self = this;
        let fetch_promise = fetch(this.url, options);

        let abort_fn = null;

        //这是一个可以被reject的promise
        let abort_promise = new Promise(function (resolve, reject) {
            abort_fn = function() {
                reject(self.buildErrorInfo('timeout', '网络超时，请重试'));
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