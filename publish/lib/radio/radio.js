'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./radio.css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

require('antd-mobile/lib/list/style/css');

var _radio = require('antd-mobile/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

require('antd-mobile/lib/radio/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RadioGroup
 * options：选项名称
 * id：选项id
 * name：RadioGroup中的radio具有相同的name
 */
var RadioGroup = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.state = _this.props;
        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var values = this.props.val;
            var options = this.props.option;
            var id = this.props.id;
            var name = this.props.name;
            var mode = this.props.mode || "divide";
            var size = this.props.size || "md";
            var selected = this.props.selected;
            var radioDivs = void 0;
            if (mode === "divide") {
                radioDivs = options.map(function (option, index) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'divide ' + size + ' ' + (selected === values[index] ? 'radio-active' : ''),
                            key: index, onClick: _this2.onRadioClick.bind(_this2, values[index]) },
                        options[index]
                    );
                });
            } else if (mode === "vertical") {
                radioDivs = options.map(function (option, index) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'radiogroup', style: { 'margin': '8px 0' }, key: index },
                        _react2.default.createElement('input', {
                            type: 'radio', name: name, id: id[index],
                            checked: selected === values[index],
                            value: values[index],
                            onChange: _this2.onRadioClick.bind(_this2, values[index]) }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: id[index], className: '' + size },
                            options[index]
                        )
                    );
                });
            } else if (mode === "slideup") {
                // todo
                // 目前存在问题，初步打算使用Antd-mobile的picker，做出slideup的效果，但该插件改写有问题
            } else if (mode === "line") {
                var radios = void 0;
                radios = options.map(function (option, index) {
                    return _react2.default.createElement(
                        _radio2.default.RadioItem,
                        { key: index, checked: selected === values[index], onChange: _this2.onRadioClick.bind(_this2, values[index]) },
                        option
                    );
                });
                radioDivs = _react2.default.createElement(
                    _list2.default,
                    null,
                    radios
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'gsp-radio' },
                radioDivs
            );
        }
    }, {
        key: 'onRadioClick',
        value: function onRadioClick(selected) {
            this.props.onChange(selected);
        }
    }]);

    return RadioGroup;
}(_react.Component);

exports.default = RadioGroup;