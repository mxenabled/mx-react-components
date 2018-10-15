"use strict";

var _glamor = require("glamor");

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var PropTypes = require('prop-types');

var Icon = require('./Icon');

var Spin = require('./Spin');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes,
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Button)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_windowSizeIsSmall", function (theme) {
      var windowSize = StyleUtils.getWindowSize(theme.BreakPoints);
      return !(windowSize === 'medium' || windowSize === 'large');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_childIsVisible", function (child) {
      return !child.props || child.props.className !== 'visuallyHidden';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_hasVisibleChildren", function () {
      if (!_this.props.children) {
        return false;
      }

      if (!Array.isArray(_this.props.children)) {
        return _this._childIsVisible(_this.props.children);
      }

      return _this.props.children.some(_this._childIsVisible);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var windowSizeIsSmall = _this._windowSizeIsSmall(theme);

      return _objectSpread({
        component: _objectSpread({
          borderRadius: 2,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'transparent',
          boxSizing: 'border-box',
          display: 'inline-block',
          padding: '4px 14px',
          fontSize: theme.FontSizes.MEDIUM,
          fontFamily: theme.Fonts.SEMIBOLD,
          cursor: _this.props.type === 'disabled' ? 'default' : 'pointer',
          transition: 'all .2s ease-in',
          minWidth: 16,
          position: 'relative'
        }, _this.props.style),
        children: {
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '20px'
        },
        primary: {
          backgroundColor: theme.Colors.PRIMARY,
          borderColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE,
          fill: theme.Colors.WHITE,
          transition: 'all .2s ease-in',
          ':hover': windowSizeIsSmall ? null : {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -15),
            borderColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -15),
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
            borderColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
            transition: 'all .2s ease-in'
          }
        },
        primaryOutline: {
          backgroundColor: 'transparent',
          borderColor: theme.Colors.PRIMARY,
          color: theme.Colors.PRIMARY,
          fill: theme.Colors.PRIMARY,
          transition: 'all .2s ease-in',
          ':hover': windowSizeIsSmall ? null : {
            backgroundColor: theme.Colors.PRIMARY,
            color: theme.Colors.WHITE,
            fill: theme.Colors.WHITE,
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
            borderColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
            color: theme.Colors.WHITE,
            fill: theme.Colors.WHITE,
            transition: 'all .2s ease-in'
          }
        },
        primaryInverse: {
          backgroundColor: theme.Colors.WHITE,
          borderColor: theme.Colors.WHITE,
          color: theme.Colors.PRIMARY,
          fill: theme.Colors.PRIMARY,
          transition: 'all .2s ease-in',
          ':hover': windowSizeIsSmall ? null : {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.WHITE, -15),
            borderColor: StyleUtils.adjustColor(theme.Colors.WHITE, -15),
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.WHITE, -30),
            borderColor: StyleUtils.adjustColor(theme.Colors.WHITE, -30),
            transition: 'all .2s ease-in'
          }
        },
        secondary: {
          backgroundColor: theme.Colors.GRAY_300,
          borderColor: 'transparent',
          color: theme.Colors.GRAY_700,
          fill: theme.Colors.GRAY_500,
          transition: 'all .2s ease-in',
          ':hover': windowSizeIsSmall ? null : {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.GRAY_300, -15),
            borderColor: 'transparent',
            fill: theme.Colors.WHITE,
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.GRAY_300, -30),
            borderColor: 'transparent',
            fill: theme.Colors.WHITE,
            transition: 'all .2s ease-in'
          }
        },
        base: {
          backgroundColor: 'transparent',
          color: theme.Colors.PRIMARY,
          fill: theme.Colors.PRIMARY,
          transition: 'all .2s ease-in',
          borderColor: 'transparent',
          borderRadius: 2,
          borderWidth: 1,
          ':hover': windowSizeIsSmall ? null : {
            color: StyleUtils.adjustColor(theme.Colors.PRIMARY, -8),
            fill: StyleUtils.adjustColor(theme.Colors.PRIMARY, -8),
            transition: 'all .2s ease-in',
            borderColor: theme.Colors.GRAY_300
          },
          ':active': {
            color: StyleUtils.adjustColor(theme.Colors.PRIMARY, -16),
            fill: StyleUtils.adjustColor(theme.Colors.PRIMARY, -16),
            transition: 'all .2s ease-in',
            backgroundColor: theme.Colors.GRAY_100
          }
        },
        neutral: {
          backgroundColor: 'transparent',
          borderColor: theme.Colors.GRAY_300,
          borderRadius: 2,
          borderWidth: 1,
          color: theme.Colors.PRIMARY,
          fill: theme.Colors.PRIMARY,
          ':hover': windowSizeIsSmall ? null : {
            backgroundColor: theme.Colors.GRAY_100
          },
          ':active': {
            backgroundColor: StyleUtils.adjustColor(theme.Colors.GRAY_100, -15)
          }
        },
        disabled: {
          backgroundColor: 'transparent',
          borderColor: theme.Colors.GRAY_300,
          color: theme.Colors.GRAY_300,
          fill: theme.Colors.GRAY_300
        },
        icon: {
          marginLeft: _this._hasVisibleChildren() ? -4 : 0,
          marginRight: _this._hasVisibleChildren() ? 5 : 0
        },
        buttonText: {
          marginLeft: _this.props.isActive && _this.props.actionText ? 10 : 0
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      // Manually consume everything that isn't going to be passed down to the button so we don't have to keep adding props one at a time.
      // Keep elementProps for backwards compatibility.
      var _this$props = this.props,
          actionText = _this$props.actionText,
          buttonRef = _this$props.buttonRef,
          children = _this$props.children,
          className = _this$props.className,
          elementProps = _this$props.elementProps,
          icon = _this$props.icon,
          isActive = _this$props.isActive,
          style = _this$props.style,
          theme = _this$props.theme,
          rest = _objectWithoutProperties(_this$props, ["actionText", "buttonRef", "children", "className", "elementProps", "icon", "isActive", "style", "theme"]);

      var mergedTheme = StyleUtils.mergeTheme(theme);
      var styles = this.styles(mergedTheme); // We need to remove the styles prop from rest so we don't pass it to children.

      delete rest.styles;
      return React.createElement("button", _extends({
        className: 'mx-button ' + (0, _glamor.css)(_objectSpread({}, styles.component, styles[this.props.type], style)) + ' ' + (className || ''),
        disabled: this.props.type === 'disabled',
        ref: buttonRef
      }, rest, elementProps), React.createElement("div", {
        style: styles.children
      }, icon && !isActive && React.createElement(Icon, {
        size: 20,
        style: styles.icon,
        type: icon
      }), isActive && React.createElement(Spin, {
        direction: "counterclockwise"
      }, React.createElement(Icon, {
        size: 20,
        type: "spinner"
      })), React.createElement("div", {
        style: styles.buttonText
      }, isActive ? actionText : children)));
    }
  }]);

  return Button;
}(React.Component);

_defineProperty(Button, "propTypes", {
  'aria-label': PropTypes.string,
  actionText: PropTypes.string,
  buttonRef: PropTypes.func,
  // Object or string since glamor supplies an object, not a string.
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  elementProps: PropTypes.object,
  icon: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  styles: PropTypes.object,
  theme: themeShape,
  type: PropTypes.oneOf(buttonTypes)
});

_defineProperty(Button, "defaultProps", {
  elementProps: {},
  onClick: function onClick() {},
  isActive: false,
  styles: {},
  type: 'primary'
});

module.exports = (0, _Theme.withTheme)(Button);