"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
    function Request(url, options) {
        var _this = this;

        _classCallCheck(this, Request);

        this.buildRequestObservable = function (fetch, format) {
            var request = new Promise(function (resolve, reject) {
                fetch.then(function (response) {
                    if (!response.ok) {
                        // console.log(response)
                        reject(_this.buildErrorInfo('error', 'api调用失败: ' + response.status + " " + response.statusText));
                    } else {
                        if (format === 'json') {
                            response.json().then(function (data) {
                                resolve(data);
                            }).catch(function (e) {
                                console.log(e);
                                reject(_this.buildErrorInfo('error', e.toString()));
                            });
                        } else if (format === 'text') {
                            response.text().then(function (data) {
                                resolve(data);
                            }).catch(function (e) {
                                console.log(e);
                                reject(_this.buildErrorInfo('error', e.toString()));
                            });
                        } else if (format === 'blob') {
                            response.blob().then(function (data) {
                                resolve(data);
                            }).catch(function (e) {
                                console.log(e);
                                reject(_this.buildErrorInfo('error', e.toString()));
                            });
                        }
                    }
                }).catch(function (e) {
                    if (e.status === 'timeout') {
                        reject(_this.buildErrorInfo('timeout', '网络超时，请重试'));
                    }
                    reject(_this.buildErrorInfo('offline', 'fetch failed')); // 粗暴地认为是这种异常，之后版本会改进
                });
            });
            return _rxjs.Observable.fromPromise(request);
        };

        this.url = url;
        this.options = options;
    }

    _createClass(Request, [{
        key: "buildErrorInfo",
        value: function buildErrorInfo(code, msg) {
            return {
                status: code,
                msg: msg
            };
        }
    }, {
        key: "get",
        value: function get() {
            var defaultOptions = {
                credentials: 'include',
                method: 'GET'
            };
            var newOptions = _extends({}, defaultOptions, this.options);
            return this.buildRequestObservable(this.request(newOptions), newOptions.format || "json");
        }
    }, {
        key: "post",
        value: function post() {
            var defaultOptions = {
                credentials: 'include',
                method: 'POST'
            };
            var newOptions = _extends({}, defaultOptions, this.options);
            newOptions.headers = _extends({
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }, newOptions.headers);
            newOptions.body = JSON.stringify(newOptions.body);
            return this.buildRequestObservable(this.request(newOptions), newOptions.format || "json");
        }
    }, {
        key: "put",
        value: function put() {
            var defaultOptions = {
                credentials: 'include',
                method: 'PUT'
            };
            var newOptions = _extends({}, defaultOptions, this.options);
            newOptions.headers = _extends({
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }, newOptions.headers);
            newOptions.body = JSON.stringify(newOptions.body);
            return this.buildRequestObservable(this.request(newOptions), newOptions.format || "json");
        }
    }, {
        key: "delete",
        value: function _delete() {
            var defaultOptions = {
                credentials: 'include',
                method: 'DELETE'
            };
            var newOptions = _extends({}, defaultOptions, this.options);
            return this.buildRequestObservable(this.request(newOptions), newOptions.format || "json");
        }
    }, {
        key: "patch",
        value: function patch() {
            var defaultOptions = {
                credentials: 'include',
                method: 'PATCH'
            };
            var newOptions = _extends({}, defaultOptions, this.options);
            return this.buildRequestObservable(this.request(newOptions), newOptions.format || "json");
        }
    }, {
        key: "request",
        value: function request(options) {
            // console.log(options);
            var self = this;
            var fetch_promise = (0, _isomorphicFetch2.default)(this.url, options);

            var abort_fn = null;

            //这是一个可以被reject的promise
            var abort_promise = new Promise(function (resolve, reject) {
                abort_fn = function abort_fn() {
                    reject(self.buildErrorInfo('timeout', '网络超时，请重试'));
                };
            });

            //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
            var abortable_promise = Promise.race([fetch_promise, abort_promise]);

            setTimeout(function () {
                abort_fn();
            }, 5 * 1000);

            return abortable_promise;
        }
    }]);

    return Request;
}();

exports.default = Request;