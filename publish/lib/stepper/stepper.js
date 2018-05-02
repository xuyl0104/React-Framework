'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/css');

var _steps = require('antd-mobile/lib/steps');

var _steps2 = _interopRequireDefault(_steps);

require('antd-mobile/lib/steps/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './style/stepper.css';


var Stepper = function (_Component) {
    _inherits(Stepper, _Component);

    function Stepper() {
        _classCallCheck(this, Stepper);

        return _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).apply(this, arguments));
    }

    _createClass(Stepper, [{
        key: 'render',
        value: function render() {
            var titles = this.props.titles || [];
            var descriptions = this.props.descriptions || [];
            var current = this.props.current;
            var direction = this.props.direction || "vertical";
            var stepDivs = titles.map(function (title, index) {
                return _react2.default.createElement(_steps2.default.Step, { title: title, description: descriptions[index], key: index });
            });
            return _react2.default.createElement(
                'div',
                { className: 'gsp-stepper' },
                _react2.default.createElement(
                    _steps2.default,
                    { current: current, direction: direction },
                    stepDivs
                )
            );
        }
    }]);

    return Stepper;
}(_react.Component);

exports.default = Stepper;