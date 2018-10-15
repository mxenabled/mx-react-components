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

var SimpleInput = require('./SimpleInput');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var SearchInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _extends({}, {
        component: {
          display: 'inline-block',
          width: '100%'
        },
        searchIcon: {
          paddingRight: 7,
          fill: theme.Colors.PRIMARY
        },
        closeIcon: {
          paddingLeft: theme.Spacing.XSMALL,
          fill: theme.Colors.GRAY_300,
          cursor: 'pointer'
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(SearchInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var searchIconProps = {
        size: 20,
        style: styles.searchIcon
      };
      var closeIconProps = {
        size: 20,
        style: styles.closeIcon
      };
      return React.createElement("div", {
        className: "mx-search-input",
        style: _extends({}, styles.component, this.props.style)
      }, React.createElement(SimpleInput, {
        elementProps: {
          onBlur: this.props.onBlur,
          onChange: this.props.onChange,
          placeholder: this.props.placeholder,
          type: 'text',
          value: this.props.searchKeyword
        },
        elementRef: this.props.elementRef,
        focusOnLoad: this.props.focusOnLoad,
        prefix: React.createElement(Icon, _extends({
          elementProps: {
            onClick: function onClick() {
              return _this2.props.elementRef && _this2.props.elementRef.focus();
            }
          },
          type: "search"
        }, searchIconProps)),
        suffix: React.createElement(Icon, _extends({
          elementProps: {
            onClick: this.props.handleResetClick
          },
          type: "close-solid"
        }, closeIconProps)),
        theme: theme
      }));
    }
  }]);

  return SearchInput;
}(React.Component);

_defineProperty(SearchInput, "propTypes", {
  elementRef: PropTypes.func,
  focusOnLoad: PropTypes.bool,
  handleResetClick: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchKeyword: PropTypes.string,
  style: PropTypes.object,
  styles: PropTypes.object,
  theme: themeShape
});

_defineProperty(SearchInput, "defaultProps", {
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  placeholder: 'Search'
});

module.exports = (0, _Theme.withTheme)(SearchInput);