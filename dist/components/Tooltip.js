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

var Icon = require('./Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      showTooltip: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleInfoMouseEnter", function () {
      _this.setState({
        showTooltip: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleInfoMouseLeave", function () {
      _this.setState({
        showTooltip: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getPosition", function () {
      var offSet = _this.props.iconSize + 5;
      var width = _this.props.tooltipStyle.width || 200;

      switch (_this.props.placement) {
        case 'left':
          return {
            bottom: 0,
            margin: 'auto',
            right: offSet,
            top: 0
          };

        case 'right':
          return {
            bottom: 0,
            left: offSet,
            margin: 'auto',
            top: 0
          };

        case 'top':
          return {
            bottom: offSet,
            left: '50%',
            marginLeft: -(_this.props.iconSize / 2 + width / 2)
          };

        case 'bottom':
          return {
            top: offSet,
            left: '50%',
            marginLeft: -(_this.props.iconSize / 2 + width / 2)
          };

        default:
          return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: _extends({}, {
          display: 'inline-block',
          fill: theme.Colors.GRAY_500,
          position: 'relative'
        }, _this.props.style),
        tooltip: _extends({}, {
          alignItems: 'center',
          backgroundColor: theme.Colors.WHITE,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          display: 'flex',
          fontSize: theme.FontSizes.MEDIUM,
          justifyContent: 'center',
          lineHeight: '1.3em',
          minHeight: '100%',
          padding: 10,
          position: 'absolute',
          textAlign: 'center',
          whiteSpace: 'normal',
          width: _this.props.tooltipStyle.width || 200,
          zIndex: '10'
        }, _this._getPosition(), _this.props.tooltipStyle)
      };
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-tooltip",
        style: styles.component
      }, this.state.showTooltip ? React.createElement("div", {
        style: styles.tooltip
      }, this.props.children) : null, React.createElement(Icon, {
        elementProps: {
          onMouseEnter: this._handleInfoMouseEnter,
          onMouseLeave: this._handleInfoMouseLeave
        },
        size: this.props.iconSize,
        type: this.props.icon
      }));
    }
  }]);

  return Tooltip;
}(React.Component);

_defineProperty(Tooltip, "propTypes", {
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  style: PropTypes.object,
  theme: themeShape,
  tooltipStyle: PropTypes.object
});

_defineProperty(Tooltip, "defaultProps", {
  icon: 'info',
  iconSize: 20,
  placement: 'top',
  tooltipStyle: {}
});

module.exports = (0, _Theme.withTheme)(Tooltip);