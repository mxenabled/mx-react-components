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

var Button = require('./Button');

var SimpleSelect = require('./SimpleSelect');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var HeaderMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeaderMenu, _React$Component);

  function HeaderMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HeaderMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HeaderMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      showSimpleSelectMenu: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
      _this.setState({
        showSimpleSelectMenu: !_this.state.showSimpleSelectMenu
      });
    });

    return _this;
  }

  _createClass(HeaderMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var items = this.props.items.map(function (item) {
        return _extends({}, item, {
          onClick: function onClick(event, itemClicked) {
            _this2.toggle();

            item.onClick(event, itemClicked);
          }
        });
      });
      return React.createElement("div", {
        className: "mx-header-menu",
        style: {
          width: 150
        }
      }, React.createElement(Button, {
        icon: this.props.buttonIcon,
        onClick: this.toggle,
        theme: theme,
        type: "neutral"
      }, this.props.buttonText), this.state.showSimpleSelectMenu ? React.createElement(SimpleSelect, {
        items: items,
        onScrimClick: this.toggle,
        styles: {
          menu: {
            left: 65
          }
        },
        theme: theme
      }) : null);
    }
  }]);

  return HeaderMenu;
}(React.Component);

_defineProperty(HeaderMenu, "propTypes", {
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  theme: themeShape
});

module.exports = (0, _Theme.withTheme)(HeaderMenu);