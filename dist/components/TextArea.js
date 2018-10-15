"use strict";

var _Theme = require("./Theme");

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

var React = require('react');

var _merge = require('lodash/merge');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var TextArea =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextArea, _React$Component);

  function TextArea() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      focus: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onFocus", function () {
      _this.textarea.focus();

      _this.setState({
        focus: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onBlur", function () {
      _this.textarea.blur();

      _this.setState({
        focus: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _merge({}, {
        component: {
          display: 'block'
        },
        wrapper: {
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
        },
        active: {
          border: '1px solid ' + theme.Colors.PRIMARY
        },
        textarea: {
          flex: '1 0 0%',
          backgroundColor: theme.Colors.WHITE,
          border: 'none',
          outline: 'none',
          boxShadow: 'none'
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(TextArea, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          elementProps = _this$props.elementProps,
          rows = _this$props.rows;
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-text-area",
        onBlur: this._onBlur,
        onFocus: this._onFocus,
        ref: this.props.elementRef,
        style: _extends({}, styles.wrapper, this.state.focus ? styles.active : null),
        tabIndex: 0
      }, React.createElement("textarea", _extends({}, elementProps, {
        ref: function ref(_ref) {
          _this2.textarea = _ref;
        },
        rows: rows,
        style: styles.textarea
      })));
    }
  }]);

  return TextArea;
}(React.Component);

_defineProperty(TextArea, "propTypes", {
  elementProps: PropTypes.object,
  elementRef: PropTypes.func,
  rows: PropTypes.number,
  styles: PropTypes.object,
  theme: themeShape,
  valid: PropTypes.bool
});

_defineProperty(TextArea, "defaultProps", {
  elementProps: {},
  rows: 5,
  valid: true
});

module.exports = (0, _Theme.withTheme)(TextArea);