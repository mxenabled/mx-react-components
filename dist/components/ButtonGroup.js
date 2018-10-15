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

var Button = require('./Button');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes,
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var ButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ButtonGroup, _React$Component);

  function ButtonGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ButtonGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ButtonGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: _extends({
          boxSizing: 'border-box',
          borderRadius: 0,
          borderWidth: 1,
          borderRightWidth: _this.props.type === 'base' ? 1 : 0,
          margin: 0,
          verticalAlign: 'middle'
        }, _this.props.style),
        firstChild: {
          borderRadius: '2px 0 0 2px'
        },
        lastChild: {
          borderRadius: '0 2px 2px 0',
          borderRightWidth: 1
        },
        onlyChild: {
          borderRadius: 2,
          borderWidth: 1
        },
        disabled: {
          backgroundColor: 'transparent',
          color: theme.Colors.GRAY_300,
          cursor: 'default',
          fill: theme.Colors.GRAY_300,
          ':hover': {
            backgroundColor: 'transparent'
          },
          ':active': {
            backgroundColor: 'transparent'
          }
        }
      };
    });

    return _this;
  }

  _createClass(ButtonGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-button-group"
      }, this.props.buttons.map(function (button, i) {
        var isFirstChild = i === 0;
        var isLastChild = i === _this2.props.buttons.length - 1;
        var isOnlyChild = isFirstChild && isLastChild;
        var isDisabled = button.type === 'disabled';

        var style = button.style,
            rest = _objectWithoutProperties(button, ["style"]);

        return React.createElement(Button, _extends({
          key: i,
          style: _extends({}, styles.component, isFirstChild && styles.firstChild, isLastChild && styles.lastChild, isOnlyChild && styles.onlyChild, isDisabled && styles.disabled, style),
          theme: theme,
          type: _this2.props.type
        }, rest), button.text);
      }));
    }
  }]);

  return ButtonGroup;
}(React.Component);

_defineProperty(ButtonGroup, "propTypes", {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    'aria-label': PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
    type: PropTypes.oneOf(buttonTypes)
  }).isRequired),
  theme: themeShape,
  type: PropTypes.oneOf(buttonTypes)
});

_defineProperty(ButtonGroup, "defaultProps", {
  buttons: [],
  type: 'primaryOutline'
});

module.exports = (0, _Theme.withTheme)(Radium(ButtonGroup));