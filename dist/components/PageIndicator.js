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

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var PageIndicator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PageIndicator, _React$Component);

  function PageIndicator() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PageIndicator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PageIndicator)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDotClick", function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (_this.props.onClick) {
        _this.props.onClick(index);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderDots", function (styles) {
      var dots = [];

      for (var i = 0; i < _this.props.count; i++) {
        var dotStyles = _this.props.activeIndex === i ? _extends({}, styles.dot, styles.dotActive) : styles.dot;
        dots.push(React.createElement("span", {
          className: 'mx-page-dot-' + i,
          key: 'dot' + i,
          onClick: _this._handleDotClick.bind(null, i),
          style: dotStyles
        }));
      }

      return dots;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: {
          textAlign: 'center',
          padding: '15px 0'
        },
        dot: {
          width: 6,
          height: 6,
          margin: 10,
          borderRadius: '100%',
          display: 'inline-block',
          verticalAlign: 'middle',
          backgroundColor: theme.Colors.GRAY_300,
          cursor: 'pointer'
        },
        dotActive: {
          backgroundColor: theme.Colors.GRAY_700
        }
      };
    });

    return _this;
  }

  _createClass(PageIndicator, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-page-indicator",
        style: styles.component
      }, this._renderDots(styles));
    }
  }]);

  return PageIndicator;
}(React.Component);

_defineProperty(PageIndicator, "propTypes", {
  activeIndex: PropTypes.number,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  theme: themeShape
});

module.exports = (0, _Theme.withTheme)(PageIndicator);