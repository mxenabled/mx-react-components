"use strict";

var _Theme = require("../Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropTypes = require('prop-types');

var Radium = require('radium');

var React = require('react');

var _require = require('glamor'),
    css = _require.css;

var _require2 = require('../../constants/App'),
    themeShape = _require2.themeShape;

var _require3 = require('../../utils/KeyPress'),
    isEnterOrSpaceKey = _require3.isEnterOrSpaceKey;

var StyleUtils = require('../../utils/Style');

var Tab =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tab)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleSpaceAndEnter", function (e) {
      if (isEnterOrSpaceKey(e)) {
        _this.props.onClick();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        tab: {
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_500,
          cursor: 'pointer',
          display: 'inline-block',
          fontSize: theme.FontSizes.MEDIUM,
          fontStyle: theme.Fonts.SEMIBOLD,
          padding: theme.Spacing.MEDIUM,
          whiteSpace: 'nowrap',
          ':hover': {
            color: theme.Colors.GRAY_700
          },
          ':focus': {
            backgroundColor: theme.Colors.GRAY_300,
            color: theme.Colors.GRAY_700
          }
        },
        activeTab: _extends({
          cursor: 'default',
          color: theme.Colors.PRIMARY,
          borderBottom: '2px solid ' + theme.Colors.PRIMARY,
          ':hover': {
            color: theme.Colors.PRIMARY
          }
        }, _this.props.activeTabStyles)
      };
    });

    return _this;
  }

  _createClass(Tab, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);

      var style = _extends({}, styles.tab, this.props.styles.tab);

      if (this.props.isActive) style = _extends({}, style, styles.activeTab, this.props.styles.activeTab);
      return React.createElement("div", {
        "aria-label": "".concat(this.props.children, " tab"),
        className: "mx-tab ".concat(css(style)),
        onClick: this.props.onClick,
        onKeyUp: function onKeyUp(e) {
          return _this2._handleSpaceAndEnter(e);
        },
        tabIndex: 0
      }, this.props.children);
    }
  }]);

  return Tab;
}(React.Component);

_defineProperty(Tab, "propTypes", {
  activeTabStyles: PropTypes.object,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  styles: PropTypes.object,
  theme: themeShape
});

_defineProperty(Tab, "defaultProps", {
  isActive: false,
  onClick: function onClick() {},
  styles: {}
});

module.exports = (0, _Theme.withTheme)(Radium(Tab));