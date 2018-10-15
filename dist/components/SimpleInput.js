"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var React = require('react');

var _merge = require('lodash/merge');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var SimpleInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleInput, _React$Component);

  function SimpleInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SimpleInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SimpleInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      focus: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onFocus", function (e) {
      _this.setState({
        focus: true
      });

      if (_this.props.elementProps.onFocus) _this.props.elementProps.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onBlur", function (e) {
      _this.setState({
        focus: false
      });

      if (_this.props.elementProps.onBlur) _this.props.elementProps.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _merge({}, {
        wrapper: _extends({}, {
          padding: theme.Spacing.SMALL,
          boxSizing: 'border-box',
          backgroundColor: theme.Colors.WHITE,
          border: _this.props.valid ? '1px solid ' + theme.Colors.GRAY_300 : '1px solid ' + theme.Colors.DANGER,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          outline: 'none',
          boxShadow: 'none'
        }, _this.props.style),
        activeWrapper: {
          border: '1px solid ' + theme.Colors.PRIMARY
        },
        input: {
          flex: '1 0 0%',
          color: theme.Colors.GRAY_700,
          fontSize: theme.FontSizes.MEDIUM,
          backgroundColor: theme.Colors.WHITE,
          border: 'none',
          outline: 'none',
          boxShadow: 'none'
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(SimpleInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnLoad && this.elementRef) {
        this.elementRef.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          elementProps = _this$props.elementProps,
          prefix = _this$props.prefix,
          suffix = _this$props.suffix;
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-simple-input",
        style: this.state.focus ? _objectSpread({}, styles.wrapper, styles.activeWrapper) : styles.wrapper
      }, prefix ? prefix : null, React.createElement("input", _extends({}, elementProps, {
        onBlur: this._onBlur,
        onFocus: this._onFocus,
        ref: function ref(_ref) {
          _this2.elementRef = _ref;
          if (typeof _this2.props.elementRef === 'function') _this2.props.elementRef(_ref);
        },
        style: styles.input,
        type: this.props.type
      })), suffix ? suffix : null);
    }
  }]);

  return SimpleInput;
}(React.Component);

_defineProperty(SimpleInput, "propTypes", {
  elementProps: PropTypes.object,
  elementRef: PropTypes.func,
  focusOnLoad: PropTypes.bool,
  prefix: PropTypes.node,
  //keep style for backwards compatibility
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  styles: PropTypes.object,
  suffix: PropTypes.node,
  theme: themeShape,
  type: PropTypes.string,
  valid: PropTypes.bool
});

_defineProperty(SimpleInput, "defaultProps", {
  elementProps: {},
  focusOnLoad: false,
  type: 'text',
  valid: true
});

module.exports = (0, _Theme.withTheme)(SimpleInput);