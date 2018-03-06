'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./checkbox.css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

require('antd-mobile/lib/list/style/css');

var _checkbox = require('antd-mobile/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

require('antd-mobile/lib/checkbox/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckGroup = function (_Component) {
    _inherits(CheckGroup, _Component);

    function CheckGroup() {
        _classCallCheck(this, CheckGroup);

        return _possibleConstructorReturn(this, (CheckGroup.__proto__ || Object.getPrototypeOf(CheckGroup)).apply(this, arguments));
    }

    _createClass(CheckGroup, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var option = this.props.option;
            var val = this.props.val;
            var selected = this.props.selected;
            return _react2.default.createElement(
                _list2.default,
                null,
                option.map(function (i, index) {
                    return _react2.default.createElement(
                        _checkbox2.default.CheckboxItem,
                        { key: index,
                            onChange: function onChange() {
                                return _this2.onCheckClick(val[index]);
                            },
                            checked: selected[index] === 1
                        },
                        i
                    );
                })
            );
        }
        // onChange = (val) => {
        //     console.log(val);
        // }

    }, {
        key: 'onCheckClick',
        value: function onCheckClick(selected) {
            this.props.onChange(selected);
        }
    }]);

    return CheckGroup;
}(_react.Component);

exports.default = CheckGroup;