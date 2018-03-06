'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = showModal;

require('./modal.css');

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

require('antd-mobile/lib/modal/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showModal(mode, title, message, texts, callbacks) {
    var _this = this;

    var actionArr = texts.map(function (text, index) {
        return {
            text: text,
            onPress: _this.onButtonClick.bind(_this, index)
        };
    });

    if (mode === 'alert') {
        _modal2.default.alert({ title: title }, { message: message }, { actionArr: actionArr });
    }if (mode === 'prompt') {
        _modal2.default.prompt('就餐时间', '请输入就餐时间', [{ text: 'Cancel' }, { text: 'Submit', onPress: function onPress(value) {
                return console.log('\u5C31\u9910\u65F6\u95F4:' + value);
            } }], 'plain-text', '18：00');
    }
}