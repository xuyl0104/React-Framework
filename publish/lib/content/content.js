'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './style/content.css';


var Content = function (_Component) {
    _inherits(Content, _Component);

    function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
    }

    _createClass(Content, [{
        key: 'render',
        value: function render() {
            var backgroundColor = this.props.bgColor || '#f8f9fa';
            var padding = this.props.padding || [0, 0, 0, 0];
            var paddingTop = void 0,
                paddingRight = void 0,
                paddingBottom = void 0,
                paddingLeft = void 0;

            var _padding = _slicedToArray(padding, 4);

            paddingTop = _padding[0];
            paddingRight = _padding[1];
            paddingBottom = _padding[2];
            paddingLeft = _padding[3];

            return _react2.default.createElement(
                'div',
                { className: 'w-100 webkitscroll pt-' + paddingTop + ' pb-' + paddingBottom + ' pl-' + paddingLeft + ' pr-' + paddingRight + ' flex1',
                    style: { backgroundColor: backgroundColor } },
                this.renderChildren(this.props)
            );
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

    return Content;
}(_react.Component);

exports.default = Content;