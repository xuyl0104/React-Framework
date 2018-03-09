'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = showToast;

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

require('antd-mobile/lib/toast/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showToast(type, text) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;


    if (type === "success") {
        _toast2.default.success(text, duration);
    } else if (type === "fail") {
        _toast2.default.fail(text, duration);
    } else if (type === "offline") {
        _toast2.default.offline(text, duration);
    } else if (type === "loading") {
        _toast2.default.loading(text, duration);
    }
}