'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/css');

var _row = require('../row/row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './style/header.css';
// import './style/fontello.css'; //可以引入CSS文件夹下的字体文件，替代图片图标，节省网络资源


var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'gsp-header' },
        _react2.default.createElement(
          'div',
          { className: 'w-100' },
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              'div',
              { className: 'col-3 no-gutter header pl-0' },
              _react2.default.createElement('div', { className: 'icon-left-open-big', style: { fontSize: '25px', marginTop: '5px', marginLeft: '0' }, onClick: this.props.onLeftArrowClick })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-6 no-gutter header pl-0' },
              _react2.default.createElement(
                'span',
                { className: 'header header-brand' },
                this.props.name
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-3 no-gutter header pl-0' },
              _react2.default.createElement(
                'div',
                { className: 'float-right buttonright' },
                this.renderChildren(this.props)
              )
            )
          )
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

  return Header;
}(_react.Component);

exports.default = Header;