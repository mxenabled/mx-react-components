"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var keycode = require('keycode');

var _merge = require('lodash/merge');

var Icon = require('./Icon');

var _require = require('./accessibility/Listbox'),
    Listbox = _require.Listbox,
    Option = _require.Option;

var MXFocusTrap = require('./MXFocusTrap');

var _require2 = require('../constants/App'),
    themeShape = _require2.themeShape;

var StyleUtils = require('../utils/Style');

var SimpleSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleSelect, _React$Component);

  function SimpleSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SimpleSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SimpleSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleKeyUp", function (e) {
      if (keycode(e) === 'esc') {
        e.preventDefault();

        _this.props.onScrimClick();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _merge({}, {
        component: _extends({
          height: 0,
          position: 'relative'
        }, _this.props.style),
        menu: {
          alignSelf: 'stretch',
          backgroundColor: theme.Colors.WHITE,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_700,
          display: 'flex',
          flexDirection: 'column',
          fill: theme.Colors.GRAY_700,
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          top: 10,
          position: 'absolute',
          zIndex: 10
        },
        item: {
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          height: 40,
          padding: theme.Spacing.MEDIUM,
          ':hover': {
            backgroundColor: theme.Colors.PRIMARY,
            color: theme.Colors.WHITE,
            cursor: 'pointer',
            fill: theme.Colors.WHITE
          }
        },
        icon: {
          marginRight: theme.Spacing.SMALL
        },
        text: {
          whiteSpace: 'nowrap'
        },
        scrim: {
          bottom: 0,
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 9
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(SimpleSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);

      var mergedFocusTrapProps = _objectSpread({
        focusTrapOptions: {
          clickOutsideDeactivates: true
        }
      }, this.props.focusTrapProps);

      return React.createElement(MXFocusTrap, mergedFocusTrapProps, React.createElement("div", {
        onKeyUp: this._handleKeyUp,
        ref: this.props.elementRef,
        style: styles.component
      }, React.createElement(Listbox, {
        "aria-label": this.props['aria-label'],
        style: styles.menu
      }, this.props.children ? this.props.children : this.props.items.map(function (item, i) {
        var icon = item.icon,
            isSelected = item.isSelected,
            _onClick = item.onClick,
            text = item.text,
            rest = _objectWithoutProperties(item, ["icon", "isSelected", "onClick", "text"]);

        return React.createElement(Option, _extends({
          isSelected: isSelected,
          key: i,
          label: text,
          onClick: function onClick(e) {
            if (_this2.props.scrimClickOnSelect) {
              e.stopPropagation();

              _this2.props.onScrimClick();
            }

            if (_onClick && typeof _onClick === 'function') {
              _onClick(e, item);
            }
          },
          style: styles.item
        }, rest), icon ? React.createElement(Icon, {
          size: _this2.props.iconSize || 20,
          style: styles.icon,
          type: icon
        }) : null, React.createElement("div", {
          style: styles.text
        }, text));
      })), React.createElement("div", {
        onClick: function onClick(e) {
          e.stopPropagation();

          _this2.props.onScrimClick();
        },
        style: styles.scrim
      })));
    }
  }]);

  return SimpleSelect;
}(React.Component);

_defineProperty(SimpleSelect, "propTypes", {
  'aria-label': PropTypes.string,
  elementRef: PropTypes.func,
  focusTrapProps: PropTypes.object,
  iconSize: PropTypes.number,
  items: PropTypes.array.isRequired,
  onScrimClick: PropTypes.func,
  scrimClickOnSelect: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.object,
  theme: themeShape
});

_defineProperty(SimpleSelect, "defaultProps", {
  'aria-label': '',
  focusTrapProps: {},
  scrimClickOnSelect: false,
  items: [],
  onScrimClick: function onScrimClick() {}
});

module.exports = (0, _Theme.withTheme)(Radium(SimpleSelect));