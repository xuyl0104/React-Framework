'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

require('antd-mobile/lib/icon/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './style/input.css';


var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.state = {
            showClear: false
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'render',
        value: function render() {
            var name = this.props.name;
            var label = this.props.label;
            var text = this.props.text || "";
            var placeholder = this.props.placeholder || "";
            var align = this.props.align || "left";
            var image = this.props.img;
            var clear = this.props.clear;
            var required = this.props.required || false;

            return _react2.default.createElement(
                'div',
                { className: 'gsp-input' },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group-input d-flex',
                        onClick: this.props.onClick },
                    _react2.default.createElement(
                        'label',
                        { className: "col-4 col-lg-3" + (required === true ? ' input-required' : '') },
                        _react2.default.createElement(
                            'nobr',
                            null,
                            label
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: "col-8 col-lg-9 d-flex justify-content-between pr-0" },
                        _react2.default.createElement('input', { type: 'text', value: text, onChange: this.onTextChange.bind(this), placeholder: placeholder, name: name,
                            onFocus: this.focus.bind(this), onBlur: this.blur.bind(this),
                            style: { textAlign: '' + align, border: 'none', width: '100%', fontSize: '17px', outline: 'none' } }),
                        _react2.default.createElement(
                            'div',
                            { className: 'pt-1 mt-2 ml-2',
                                style: { display: clear === true && text !== '' && this.state.showClear ? '' : 'none' },
                                onClick: this.clear.bind(this, name) },
                            _react2.default.createElement(_icon2.default, { type: 'cross-circle-o', size: 'xs', color: "#aaa" })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'pt-2 ml-2' },
                            image
                        )
                    )
                )
            );
        }
    }, {
        key: 'focus',
        value: function focus() {
            var _this2 = this;

            setTimeout(function () {
                return _this2.setState({
                    showClear: true
                });
            }, 100);
        }
    }, {
        key: 'blur',
        value: function blur() {
            var _this3 = this;

            setTimeout(function () {
                return _this3.setState({
                    showClear: false
                });
            }, 500);
        }
    }, {
        key: 'clear',
        value: function clear(e) {
            this.props.onChange(e = {
                target: {
                    name: this.props.name,
                    value: ""
                }
            });
        }
    }, {
        key: 'onTextChange',
        value: function onTextChange(e) {
            this.props.onChange(e);
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(props) {
            //遍历所有子组件
            return _react2.default.Children.map(props.children, function (child) {
                return child;
            });
        }
    }]);

    return Input;
}(_react.Component);

exports.default = Input;