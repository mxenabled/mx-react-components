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

var Icon = require('../components/Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var Menu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      hoverItemIndex: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleMouseOver", function (hoverItemIndex) {
      _this.setState({
        hoverItemIndex: hoverItemIndex
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleMouseOut", function () {
      _this.setState({
        hoverItemIndex: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderItems", function (styles, theme) {
      return _this.props.items.map(function (item, index) {
        return React.createElement("div", {
          key: item.label,
          onClick: item.onClick,
          onMouseOut: _this._handleMouseOut,
          onMouseOver: _this._handleMouseOver.bind(null, index),
          style: _extends({}, styles.menuItem, {
            backgroundColor: index === _this.state.hoverItemIndex ? theme.Colors.PRIMARY : 'transparent',
            color: index === _this.state.hoverItemIndex ? theme.Colors.WHITE : theme.Colors.GRAY_500
          })
        }, React.createElement(Icon, {
          size: 20,
          style: _extends({}, styles.itemIcon, {
            fill: index === _this.state.hoverItemIndex ? theme.Colors.WHITE : theme.Colors.GRAY_700
          }),
          type: item.icon
        }), React.createElement("span", {
          style: styles.itemLabel
        }, item.label));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: {
          display: 'block',
          position: 'relative',
          width: 40
        },
        dotsWrapper: {
          backgroundColor: _this.props.isOpen ? theme.Colors.GRAY_100 : 'transparent',
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          cursor: 'pointer',
          margin: 3,
          padding: 6
        },
        menu: {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          position: 'absolute',
          top: 40,
          padding: 10,
          maxWidth: 260,
          zIndex: 10
        },
        menuIcon: {
          fill: theme.Colors.PRIMARY
        },
        menuItem: {
          color: theme.Colors.GRAY_500,
          cursor: 'pointer',
          marginRight: 5,
          whiteSpace: 'nowrap'
        },
        itemIcon: {
          padding: '10px 5px',
          opacity: 0.5
        },
        itemLabel: {
          paddingRight: 10,
          position: 'relative',
          top: 3
        }
      };
    });

    return _this;
  }

  _createClass(Menu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.isOpen) {
        this.setState({
          hoverItemIndex: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          alignItems = _this$props.alignItems;
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-menu",
        onClick: this.props.onClick,
        style: _extends({}, styles.component, this.props.style)
      }, React.createElement("div", {
        style: styles.dotsWrapper
      }, React.createElement(Icon, {
        size: 20,
        style: styles.menuIcon,
        type: "kabob_horizontal"
      })), isOpen ? React.createElement("div", {
        className: "mx-menu-open",
        style: _extends({}, styles.menu, alignItems === 'right' ? {
          right: 3
        } : {
          left: 3
        })
      }, this._renderItems(styles, theme)) : null);
    }
  }]);

  return Menu;
}(React.Component);

_defineProperty(Menu, "propTypes", {
  alignItems: PropTypes.oneOf(['left', 'right']),
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func
  })).isRequired,
  onClick: PropTypes.func,
  theme: themeShape
});

_defineProperty(Menu, "defaultProps", {
  alignItems: 'left',
  isOpen: false,
  onClick: function onClick() {}
});

module.exports = (0, _Theme.withTheme)(Menu);