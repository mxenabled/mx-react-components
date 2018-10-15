"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTheme = withTheme;
exports.ThemeProvider = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../constants/App'),
    themeShape = _require.themeShape;
/**
 * Use ThemeProvider at the top-level of the application to
 * make theme available to all theme-able components without
 * the need to explicitly pass the theme prop.
 */


var ThemeProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ThemeProvider, _React$Component);

  function ThemeProvider() {
    _classCallCheck(this, ThemeProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThemeProvider).apply(this, arguments));
  }

  _createClass(ThemeProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        mxTheme: this.props.theme
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return ThemeProvider;
}(_react.default.Component);
/**
 * ThemeContext is for use inside components that need access
 * to the theme.
 */


exports.ThemeProvider = ThemeProvider;

_defineProperty(ThemeProvider, "propTypes", {
  theme: themeShape
});

_defineProperty(ThemeProvider, "childContextTypes", {
  mxTheme: themeShape
});

var ThemeContext =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ThemeContext, _React$Component2);

  function ThemeContext() {
    _classCallCheck(this, ThemeContext);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThemeContext).apply(this, arguments));
  }

  _createClass(ThemeContext, [{
    key: "render",
    value: function render() {
      return this.props.children(this.context.mxTheme);
    }
  }]);

  return ThemeContext;
}(_react.default.Component);
/**
  * `withTheme` injects the `theme` from `ThemeProvider` as a prop into `Component`.
  *
  * `theme` can still be provided as a prop to the themed component to override the theme.
  */


_defineProperty(ThemeContext, "contextTypes", {
  mxTheme: themeShape
});

function withTheme(Component) {
  var ThemedComponent =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(ThemedComponent, _React$Component3);

    function ThemedComponent() {
      _classCallCheck(this, ThemedComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(ThemedComponent).apply(this, arguments));
    }

    _createClass(ThemedComponent, [{
      key: "render",
      value: function render() {
        var _this = this;

        return _react.default.createElement(ThemeContext, null, function (theme) {
          return _react.default.createElement(Component, _extends({}, _this.props, {
            theme: _this.props.theme || theme
          }));
        });
      }
    }]);

    return ThemedComponent;
  }(_react.default.Component);

  ThemedComponent.propTypes = {
    theme: themeShape
  };
  ThemedComponent.displayName = "withTheme(".concat(Component.displayName || Component.name, ")");
  return ThemedComponent;
}