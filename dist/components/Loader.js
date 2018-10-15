"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Spin = require('./Spin');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var Loader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Loader, _React$Component);

  function Loader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Loader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Loader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var color = _this.props.color || theme.Colors.PRIMARY;
      return {
        component: {
          backgroundColor: 'rgba(255,255,255,0.9)',
          bottom: 0,
          color: '#999',
          fontFamily: theme.Fonts.REGULAR,
          fontSize: '10px',
          fontWeight: 600,
          left: 0,
          letterSpacing: '1px',
          position: _this.props.isRelative ? 'absolute' : 'fixed',
          right: 0,
          textAlign: 'center',
          top: 0,
          zIndex: 100
        },
        content: {
          textAlign: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: 'auto',
          width: _this.props.isSmall ? '30px' : '50px',
          height: _this.props.isSmall ? '30px' : '50px'
        },
        circle: {
          borderRadius: '100%',
          width: _this.props.isSmall ? '30px' : '50px',
          height: _this.props.isSmall ? '30px' : '50px',
          borderTop: '3px solid ' + color,
          borderRight: '3px solid transparent',
          borderBottom: '3px solid transparent',
          borderLeft: '3px solid transparent'
        },
        text: {
          marginTop: '10px',
          fontSize: '10px'
        }
      };
    });

    return _this;
  }

  _createClass(Loader, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);

      if (this.props.isLoading) {
        return React.createElement("div", {
          className: "mx-loader",
          style: styles.component
        }, React.createElement("div", {
          className: "mx-loader-content",
          style: styles.content
        }, React.createElement(Spin, null, React.createElement("div", {
          style: styles.circle
        })), this.props.isSmall ? null : React.createElement("div", {
          className: "mx-loader-text",
          style: styles.text
        }, " ", this.props.children, " ")));
      } else {
        return React.createElement("div", null);
      }
    }
  }]);

  return Loader;
}(React.Component);

_defineProperty(Loader, "propTypes", {
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  isRelative: PropTypes.bool,
  isSmall: PropTypes.bool,
  theme: themeShape
});

_defineProperty(Loader, "defaultProps", {
  isLoading: false,
  isRelative: false,
  isSmall: false,
  children: 'LOADING...'
});

module.exports = (0, _Theme.withTheme)(Loader);