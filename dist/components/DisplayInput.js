"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var _uniqueId = require('lodash/uniqueId');

var _merge = require('lodash/merge');

var Column = require('../components/grid/Column');

var Container = require('../components/grid/Container');

var Row = require('../components/grid/Row');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var DisplayInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DisplayInput, _React$Component);

  function DisplayInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DisplayInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DisplayInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_isLargeOrMediumWindowSize", function (theme) {
      var windowSize = StyleUtils.getWindowSize(theme.BreakPoints);
      return windowSize === 'large' || windowSize === 'medium';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getInputColumns", function (hasLabel, showHint) {
      if (showHint && hasLabel) {
        return {
          large: 8,
          medium: 7,
          small: 12
        };
      }

      if (showHint || hasLabel) {
        return {
          large: 10,
          medium: 9,
          small: 12
        };
      }

      return {
        large: 12,
        medium: 12,
        small: 12
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme, isLargeOrMediumWindowSize) {
      var wrapperFocus = {
        borderBottom: _this.props.valid ? '1px solid ' + theme.Colors.PRIMARY : '1px solid ' + theme.Colors.DANGER,
        boxShadow: 'none',
        outline: 'none'
      };
      return _merge({}, {
        error: {
          color: theme.Colors.DANGER
        },
        hint: {
          color: theme.Colors.PRIMARY,
          height: 20,
          paddingTop: 15,
          textAlign: 'right'
        },
        input: {
          backgroundColor: 'transparent',
          border: 0,
          color: theme.Colors.GRAY_700,
          fontSize: theme.FontSizes.LARGE,
          lineHeight: 1,
          textAlign: 'left',
          width: '100%',
          ':focus': {
            boxShadow: 'none',
            outline: 'none'
          }
        },
        inputWrapper: {
          alignItems: 'center',
          display: 'flex',
          padding: theme.Spacing.SMALL
        },
        children: {
          alignItems: 'center',
          color: theme.Colors.GRAY_700,
          display: 'flex',
          fontSize: theme.FontSizes.LARGE,
          height: theme.Spacing.LARGE,
          padding: theme.Spacing.SMALL
        },
        labelText: {
          alignItems: 'center',
          color: theme.Colors.GRAY_700,
          display: 'flex',
          fontSize: theme.FontSizes.SMALL,
          fontFamily: theme.Fonts.SEMIBOLD,
          paddingBottom: isLargeOrMediumWindowSize ? theme.Spacing.MEDIUM : theme.Spacing.XSMALL,
          paddingLeft: theme.Spacing.SMALL,
          paddingRight: theme.Spacing.SMALL,
          paddingTop: isLargeOrMediumWindowSize ? theme.Spacing.MEDIUM : theme.Spacing.XSMALL,
          textAlign: 'left'
        },
        status: {
          paddingBottom: theme.Spacing.XSMALL,
          paddingLeft: isLargeOrMediumWindowSize ? theme.Spacing.SMALL : theme.Spacing.XSMALL,
          paddingRight: theme.Spacing.SMALL,
          paddingTop: theme.Spacing.XSMALL
        },
        success: {
          color: theme.Colors.PRIMARY
        },
        wrapper: _extends({
          borderBottom: _this.props.valid ? '1px solid ' + theme.Colors.GRAY_300 : '1px solid ' + theme.Colors.DANGER,
          boxSizing: 'border-box',
          paddingBottom: theme.Spacing.XSMALL,
          marginLeft: isLargeOrMediumWindowSize ? 0 : -10,
          marginRight: isLargeOrMediumWindowSize ? 0 : -10,
          paddingTop: theme.Spacing.XSMALL,
          transition: 'all .2s ease-in',
          WebkitAppearance: 'none',
          whiteSpace: 'nowrap',
          ':focus': wrapperFocus
        }, _this.props.style),
        wrapperFocus: wrapperFocus
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(DisplayInput, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this._labelId = _uniqueId('DI');
      this._inputId = this.props.elementProps.id || _uniqueId('DI');
    }
  }, {
    key: "render",
    value: function render() {
      // Input properties
      var _this$props$elementPr = this.props.elementProps,
          disabled = _this$props$elementPr.disabled,
          onChange = _this$props$elementPr.onChange,
          rest = _objectWithoutProperties(_this$props$elementPr, ["disabled", "onChange"]); // Methods


      var theme = StyleUtils.mergeTheme(this.props.theme);
      var hasChildren = !!this.props.children;

      var isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize(theme);

      var showHint = this.props.showHint && !this.props.status && isLargeOrMediumWindowSize;
      var hasLabel = !!this.props.label; // Column Sizes

      var twoWidthColumn = {
        large: 2,
        medium: 2,
        small: 0
      };

      var inputColumn = this._getInputColumns(hasLabel, showHint);

      var labelColumn = {
        large: 2,
        medium: 3,
        small: 12
      };
      var statusColumn = {
        large: 10,
        medium: 9,
        small: 12
      }; // Styles

      var styles = this.styles(theme, isLargeOrMediumWindowSize);
      return React.createElement(Container, {
        className: "mx-display-input"
      }, React.createElement("div", {
        style: _extends({}, styles.wrapper, this.props.isFocused ? styles.wrapperFocus : {})
      }, React.createElement(Row, null, this.props.label ? React.createElement(Column, {
        span: labelColumn
      }, React.createElement("label", {
        htmlFor: this._inputId,
        id: this._labelId,
        style: _extends({}, styles.labelText, this.props.labelStyle)
      }, this.props.label)) : null, React.createElement(Column, {
        relative: !hasChildren,
        span: inputColumn
      }, hasChildren ? React.createElement("div", {
        style: _extends({}, styles.children, this.props.childrenStyle)
      }, this.props.children) : React.createElement("div", {
        style: styles.inputWrapper
      }, React.createElement("input", _extends({}, rest, {
        "aria-disabled": disabled,
        "aria-labelledby": this.props.label ? this._labelId : null,
        id: this._inputId,
        key: "input",
        onChange: disabled ? null : onChange,
        ref: this.props.elementRef,
        style: styles.input
      })))), showHint ? React.createElement(Column, {
        span: twoWidthColumn
      }, React.createElement("div", {
        style: styles.hint
      }, this.props.showHint && !this.props.status ? React.createElement("div", null, this.props.hint) : null)) : null)), React.createElement(Row, null, this.props.status ? React.createElement(Column, {
        offset: twoWidthColumn,
        span: statusColumn
      }, React.createElement("div", {
        style: styles.status
      }, React.createElement("div", {
        style: styles[this.props.status.type]
      }, this.props.status.message))) : null));
    }
  }]);

  return DisplayInput;
}(React.Component);

_defineProperty(DisplayInput, "propTypes", {
  childrenStyle: PropTypes.object,
  elementProps: PropTypes.object,
  elementRef: PropTypes.func,
  hint: PropTypes.string,
  isFocused: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  placeholder: PropTypes.string,
  showHint: PropTypes.bool,
  status: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  styles: PropTypes.object,
  theme: themeShape,
  valid: PropTypes.bool
});

_defineProperty(DisplayInput, "defaultProps", {
  elementProps: {
    type: 'text'
  },
  isFocused: false,
  valid: true
});

module.exports = (0, _Theme.withTheme)(Radium(DisplayInput));