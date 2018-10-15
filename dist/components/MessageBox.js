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

var _merge = require('lodash/merge');

var _isNil = require('lodash/isNil');

var Icon = require('../components/Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var MessageBox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MessageBox, _React$Component);

  function MessageBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MessageBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MessageBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var color = _this.props.color || theme.Colors.PRIMARY;
      return _merge({}, {
        component: {
          color: theme.Colors.GRAY_900,
          boxShadow: theme.ShadowMed,
          boxSizing: 'border-box',
          borderTop: 'none',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column'
        },
        alertbar: {
          background: color,
          border: theme.Colors.GRAY_300,
          color: theme.Colors.GRAY_900,
          borderTop: '1px solid ' + color,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          height: 5
        },
        button: {
          marginTop: _this.props.isSmall ? 10 : null,
          whiteSpace: 'nowrap',
          alignSelf: _this.props.isSmall ? null : 'flex-end',
          textAlign: _this.props.isSmall ? 'center' : null
        },
        header: {
          display: 'flex',
          padding: theme.Spacing.SMALL,
          paddingBottom: 0
        },
        icon: {
          fill: theme.Colors.GRAY_900,
          marginRight: theme.Spacing.SMALL
        },
        title: {
          fontFamily: theme.Fonts.SEMIBOLD,
          fontSize: theme.FontSizes.MEDIUM,
          marginBottom: 0
        },
        messageBody: {
          alignItems: 'baseline',
          display: 'flex',
          flex: '1 1 auto'
        },
        messageContent: {
          boxSizing: _this.props.isSmall ? null : 'content-box',
          textAlign: 'left',
          width: _this.props.isSmall ? '100%' : '75%',
          paddingRight: _this.props.isSmall ? 30 : null,
          fontSize: theme.FontSizes.MEDIUM
        },
        message: {
          fontSize: theme.FontSizes.MEDIUM,
          marginBottom: 0
        },
        messageWrapper: {
          display: 'flex',
          flexDirection: _this.props.isSmall ? 'column' : 'row',
          padding: theme.Spacing.SMALL
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(MessageBox, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("article", {
        "aria-live": "polite",
        className: "mx-message-box",
        role: "region",
        style: styles.component
      }, React.createElement("div", {
        style: styles.alertbar
      }), React.createElement("div", {
        style: styles.messageWrapper
      }, React.createElement("div", {
        style: styles.messageBody
      }, React.createElement("section", null, React.createElement(Icon, {
        size: 20,
        style: styles.icon,
        type: this.props.icon
      })), React.createElement("section", {
        role: "status",
        style: styles.messageContent
      }, React.createElement("p", {
        style: styles.title
      }, this.props.title), this.props.message ? React.createElement("p", {
        style: styles.message
      }, this.props.message) : null)), !_isNil(this.props.button) && React.createElement("div", {
        style: styles.button
      }, this.props.button)));
    }
  }]);

  return MessageBox;
}(React.Component);

_defineProperty(MessageBox, "propTypes", {
  button: PropTypes.node,
  color: PropTypes.string,
  icon: PropTypes.string,
  isSmall: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  styles: PropTypes.object,
  theme: themeShape,
  title: PropTypes.string
});

module.exports = (0, _Theme.withTheme)(MessageBox);