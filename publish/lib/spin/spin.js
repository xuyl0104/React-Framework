'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./spin.css');

require('./css/fontello.css');

require('./css/animation.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spin = function (_Component) {
    _inherits(Spin, _Component);

    function Spin() {
        _classCallCheck(this, Spin);

        return _possibleConstructorReturn(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).apply(this, arguments));
    }

    _createClass(Spin, [{
        key: 'render',
        value: function render() {
            var isSpinning = this.props.isSpinning;
            var indicator = this.props.indicator || "a";
            var className = void 0;
            switch (indicator) {
                case "a":
                    className = "icon-spin4";
                    break;
                case "b":
                    className = "icon-spin5";
                    break;
                case "c":
                    className = "icon-spin6";
                    break;
                default:
                    className = "icon-spin4";
                    break;
            }
            var indicatorSize = this.props.size || 30;
            var indicatorColor = this.props.color || "#318ccf";
            return _react2.default.createElement(
                'div',
                { className: 'spin', style: { display: isSpinning ? 'block' : 'none' } },
                _react2.default.createElement(
                    'div',
                    { className: 'theIcon' },
                    _react2.default.createElement('i', { className: className + ' animate-spin',
                        style: { fontSize: indicatorSize + 'px', color: indicatorColor, marginLeft: -indicatorSize / 2 + 'px' } })
                )
            );
        }
    }]);

    return Spin;
}(_react.Component);

exports.default = Spin;