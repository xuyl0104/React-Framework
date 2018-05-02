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
// import './style/card.css';


var Card = function (_Component) {
    _inherits(Card, _Component);

    function Card() {
        _classCallCheck(this, Card);

        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {
            // let avatarPosition = this.props.avatarPosition || "start";
            // let avatarSize = this.props.avatarSize || 40;
            var title = this.props.title;
            var text = this.props.text;
            var topRight = this.props.topRight;
            var bottomRight = this.props.bottomRight;

            var middleLeft = this.props.middleLeft;
            var middleRight = this.props.middleRight;

            var position = this.props.position || "top";

            var width = this.props.width || "100%";

            var padding = this.props.padding || '8px 8px';
            var margin = this.props.margin || '0';

            if (position === "bottom") {
                return _react2.default.createElement(
                    'div',
                    { className: 'gsp-card' },
                    _react2.default.createElement(
                        'div',
                        { className: 'card', style: { 'padding': padding, 'margin': margin, borderRadius: '0', width: width }, onClick: this.props.onClick },
                        this.renderChildren(this.props),
                        _react2.default.createElement(
                            'div',
                            { className: 'media' },
                            this.props.avatar,
                            _react2.default.createElement(
                                'div',
                                { className: 'media-body' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'd-flex ml-1 justify-content-between' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        title
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        topRight
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'd-flex ml-1 justify-content-between' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        middleLeft
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        middleRight
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'd-flex ml-1 justify-content-between' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-end' },
                                        text
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-end' },
                                        bottomRight
                                    )
                                )
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'gsp-card' },
                    _react2.default.createElement(
                        'div',
                        { className: 'card', style: { 'padding': '8px 8px', borderRadius: '0' }, onClick: this.props.onClick },
                        _react2.default.createElement(
                            'div',
                            { className: 'media' },
                            this.props.avatar,
                            _react2.default.createElement(
                                'div',
                                { className: 'media-body' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'd-flex ml-1 justify-content-between' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        title
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        topRight
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'd-flex ml-1 justify-content-between' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        middleLeft
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-start' },
                                        middleRight
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'd-flex ml-1 justify-content-between' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-end' },
                                        text
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pt-1 align-self-end' },
                                        bottomRight
                                    )
                                )
                            )
                        ),
                        this.renderChildren(this.props)
                    )
                );
            }
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(props) {
            // console.log(props.children);
            //遍历所有子组件
            return _react2.default.Children.map(props.children, function (child) {
                return child;
            });
        }
    }]);

    return Card;
}(_react.Component);

exports.default = Card;