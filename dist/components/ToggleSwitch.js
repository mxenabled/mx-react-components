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

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var Icon = require('./Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var ToggleSwitch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ToggleSwitch, _React$Component);

  function ToggleSwitch() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ToggleSwitch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ToggleSwitch)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleToggle", function (event) {
      _this.props.onToggle(event);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _extends({}, {
        component: {
          alignItems: 'center',
          display: 'flex',
          fontFamily: theme.Fonts.REGULAR,
          fontSize: theme.FontSizes.MEDIUM,
          position: 'relative'
        },
        icon: {
          fill: theme.Colors.WHITE,
          position: 'absolute',
          top: 0,
          zIndex: 2
        },
        trueIcon: {
          left: 0
        },
        falseIcon: {
          right: 0
        },
        label: {
          cursor: 'pointer',
          fontWeight: 'bold'
        },
        inactiveLabel: {
          color: theme.Colors.GRAY_300
        },
        activeLabel: {
          color: theme.Colors.PRIMARY
        },
        toggle: {
          backgroundColor: theme.Colors.WHITE,
          borderRadius: '100%',
          height: 20,
          left: _this.props.checked ? 20 : 2,
          position: 'absolute',
          transition: 'all 0.5s ease',
          width: 20,
          zIndex: 3
        },
        track: {
          borderRadius: 20,
          boxSizing: 'border-box',
          cursor: 'pointer',
          height: 24,
          minHeight: 24,
          margin: '0 10px',
          padding: 2,
          position: 'relative',
          transition: 'all 0.5s ease',
          verticalAlign: 'middle',
          width: 42,
          minWidth: 42,
          zIndex: 1
        },
        trueTrack: {
          backgroundColor: theme.Colors.GRAY_700
        },
        falseTrack: {
          backgroundColor: theme.Colors.GRAY_500
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(ToggleSwitch, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "toggle-switch-component",
        ref: this.props.elementRef,
        style: styles.component
      }, this.props.showLabels ? React.createElement("div", {
        className: "left-label",
        onClick: this._handleToggle,
        style: _extends({}, styles.label, this.props.checked ? styles.inactiveLabel : styles.activeLabel)
      }, this.props.leftLabel) : null, React.createElement("div", {
        className: "toggle-switch-track",
        onClick: this._handleToggle,
        style: _extends({}, styles.track, styles[this.props.checked + 'Track'])
      }, this.props.showIcons ? React.createElement("span", null, React.createElement(Icon, {
        className: "true-icon",
        style: _extends({}, styles.icon, styles.trueIcon),
        type: this.props.trueIcon
      }), React.createElement(Icon, {
        className: "false-icon",
        style: _extends({}, styles.icon, styles.falseIcon),
        type: this.props.falseIcon
      })) : null, React.createElement("div", {
        className: "toggle-switch-toggle",
        style: styles.toggle
      })), this.props.showLabels ? React.createElement("div", {
        className: "right-label",
        onClick: this._handleToggle,
        style: _extends({}, styles.label, this.props.checked ? styles.activeLabel : styles.inactiveLabel)
      }, this.props.rightLabel) : null);
    }
  }]);

  return ToggleSwitch;
}(React.Component);

_defineProperty(ToggleSwitch, "propTypes", {
  checked: PropTypes.bool,
  elementRef: PropTypes.func,
  falseIcon: PropTypes.string,
  leftLabel: PropTypes.string,
  onToggle: PropTypes.func,
  rightLabel: PropTypes.string,
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool,
  styles: PropTypes.object,
  theme: themeShape,
  trueIcon: PropTypes.string
});

_defineProperty(ToggleSwitch, "defaultProps", {
  checked: false,
  falseIcon: 'close-skinny',
  leftLabel: 'Off',
  onToggle: function onToggle() {},
  rightLabel: 'On',
  showLabels: false,
  showIcons: true,
  trueIcon: 'check-skinny'
});

module.exports = (0, _Theme.withTheme)(Radium(ToggleSwitch));