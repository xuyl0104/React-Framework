'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./listview.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Listview = function (_Component) {
    _inherits(Listview, _Component);

    function Listview() {
        _classCallCheck(this, Listview);

        return _possibleConstructorReturn(this, (Listview.__proto__ || Object.getPrototypeOf(Listview)).apply(this, arguments));
    }

    _createClass(Listview, [{
        key: 'render',
        value: function render() {
            var text = this.props.text;
            // let style = this.props.style;
            var tagClassName = void 0;
            var tagClassNameLg = void 0;
            var length = this.props.children.length;
            if (!this.props.children.length) {
                length = 1;
            }
            // console.log(this.props.children);
            switch (length) {
                case 1:
                    tagClassName = 4;tagClassNameLg = 4;
                    break;
                case 2:
                    tagClassName = 4;tagClassNameLg = 4;
                    break;
                case 3:
                    tagClassName = 4;tagClassNameLg = 4;
                    break;

                default:
                    tagClassName = 4;tagClassNameLg = 4;
                    break;
            }
            return _react2.default.createElement(
                'div',
                { className: 'listview d-flex',
                    onClick: this.props.onClick },
                _react2.default.createElement(
                    'label',
                    { className: "col-" + tagClassName + " col-lg-" + tagClassNameLg + " col-md-" + tagClassNameLg },
                    _react2.default.createElement(
                        'nobr',
                        null,
                        text
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: "itemContent col-" + (12 - tagClassName) + " col-lg-" + (12 - tagClassNameLg) + " col-md-" + (12 - tagClassNameLg) + " d-flex justify-content-between align-items-center pr-0" },
                    this.props.children
                )
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

    return Listview;
}(_react.Component);

exports.default = Listview;