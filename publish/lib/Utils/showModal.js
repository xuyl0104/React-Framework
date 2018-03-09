'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = showModal;

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

require('antd-mobile/lib/modal/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showModal(mode, title, message, actionArr, option, defaultValue) {

    if (mode === 'alert') {
        _modal2.default.alert(title, message, actionArr);
    }if (mode === 'prompt') {
        _modal2.default.prompt(title, message, actionArr, option, defaultValue);
    }
}