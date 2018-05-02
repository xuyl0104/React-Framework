'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './style/footer.css';


var Footer = function (_Component) {
    _inherits(Footer, _Component);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var buttonNameArr = this.props.buttonName;
            var buttonStyleArr = this.props.style || this.generateButtonStyle(buttonNameArr.length);
            var size = this.props.size || "lg";
            var buttonWidth = void 0;
            switch (buttonNameArr.length) {
                case 1:
                    buttonWidth = "w-100";
                    break;
                case 2:
                    buttonWidth = "w-50";
                    break;
                case 3:
                    buttonWidth = "w-33";
                    break;
                case 4:
                    buttonWidth = "w-25";
                    break;

                default:
                    break;
            }

            var paddingY = void 0;
            switch (size) {
                case "lg":
                    paddingY = "py-15";
                    break;
                case "sm":
                    paddingY = "py-11";
                    break;
                default:
                    paddingY = "py-15";
                    break;
            }

            var footerButtonDiv = buttonNameArr.map(function (button, index) {
                return _react2.default.createElement(
                    'div',
                    { className: buttonWidth + ' buttonHeight-' + size + ' text-center d-inline-block ' + paddingY,
                        style: buttonStyleArr[index],
                        key: index,
                        onClick: _this2.onButtonClick.bind(_this2, index) },
                    button
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'gsp-footer' },
                _react2.default.createElement(
                    'div',
                    { className: 'w-100' },
                    footerButtonDiv
                )
            );
        }
    }, {
        key: 'generateButtonStyle',
        value: function generateButtonStyle(numOfButtons) {
            var buttonStyleArr = [];
            var buttonStyle = void 0;
            for (var index = 0; index < numOfButtons; index++) {
                if (index % 2 === 1) {
                    buttonStyle = { 'color': '#318ccf', 'backgroundColor': '#ffffff' };
                } else if (index % 2 === 0) {
                    buttonStyle = { 'color': 'white', 'backgroundColor': '#318ccf' };
                }
                buttonStyleArr.push(buttonStyle);
            }
            return buttonStyleArr;
        }
    }, {
        key: 'onButtonClick',
        value: function onButtonClick(index) {
            // console.log(index);
            var callBackFunction = this.props.callBackFooterButtonClick[index];
            callBackFunction();
        }
    }]);

    return Footer;
}(_react.Component);

exports.default = Footer;