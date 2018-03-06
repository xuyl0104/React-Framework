'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showMessage;

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

require('antd/lib/message/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showMessage(type, text) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 70;

  _message2.default.config({
    top: position
  });
  if (type === "success") {
    _message2.default.success(text, duration);
  } else if (type === "fail") {
    _message2.default.error(text, duration);
  } else if (type === "info") {
    _message2.default.info(text, duration);
  } else if (type === "warning") {
    _message2.default.warning(text, duration);
  }
}