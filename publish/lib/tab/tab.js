'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./tab.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_Component) {
    _inherits(Tab, _Component);

    function Tab() {
        _classCallCheck(this, Tab);

        return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
    }

    _createClass(Tab, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tabs = this.props.tabs;
            var selectedTab = this.props.selected;
            var numOfTabs = tabs.length;
            var tabDivs = void 0;
            var className = void 0;

            var indicatorStyle = this.props.indicatorStyle || { color: '#318ccf', style: 'solid', width: '2px' };

            var activeStyle = this.props.activeStyle || { color: '#318ccf', backgroundColor: '#ffffff' };
            var activeIndicatorStyle = {
                borderBottomColor: indicatorStyle.color || "#318ccf",
                borderBottomStyle: indicatorStyle.style || "solid",
                borderBottomWidth: indicatorStyle.width || "2px"
            };

            var allActiveStyle = _extends({}, activeStyle, activeIndicatorStyle);
            var inactiveStyle = this.props.inactiveStyle || { color: '#000000', backgroundColor: '#ffffff' };

            switch (numOfTabs) {
                case 2:
                    className = "twoCols";
                    break;
                case 3:
                    className = "threeCols";
                    break;
                case 4:
                    className = "fourCols";
                    break;
                case 5:
                    // 三思啊
                    className = "fiveCols";
                    break;
                default:
                    break;
            }
            tabDivs = tabs.map(function (item, index) {
                return _react2.default.createElement(
                    'div',
                    { className: className,
                        style: selectedTab === index ? allActiveStyle : inactiveStyle,
                        key: index, onClick: _this2.onTabChange.bind(_this2, index) },
                    item
                );
            });
            return _react2.default.createElement(
                'div',
                { className: 'nav-tabs' },
                tabDivs
            );
        }

        /**
         * TODO: Tab下方的横线移动动画还未实现
         * @param {*} tabIndex 
         */

    }, {
        key: 'onTabChange',
        value: function onTabChange(tabIndex) {
            // let currentTab = this.state.selectedTab;
            // let newTab = tabIndex;
            // let tabAnimatationClass;
            // if(newTab > currentTab) {
            //     tabAnimatationClass = "no" + this.state.numOfTabs + "right" + (newTab - currentTab);
            // } else {
            //     tabAnimatationClass = "no" + this.state.numOfTabs + "left" + (newTab - currentTab);
            // }

            // console.log(currentTab + "--->" + tabIndex);
            // console.log(tabAnimatationClass);

            var selectedTab = tabIndex;
            // this.setState({
            //     selectedTab: tabIndex,
            //     // tabAnimatationClass: tabAnimatationClass
            // });
            this.props.callBack(selectedTab);
        }
    }]);

    return Tab;
}(_react.Component);

exports.default = Tab;