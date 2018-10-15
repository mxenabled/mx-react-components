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

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var Icon = require('./Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var SelectFullScreen =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectFullScreen, _React$Component);

  function SelectFullScreen() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectFullScreen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectFullScreen)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isOpen: false,
      selected: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClick", function () {
      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleCloseClick", function () {
      _this.setState({
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleOptionClick", function (option) {
      _this.setState({
        selected: option,
        isOpen: false
      });

      _this.props.onChange(option);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleSelectChange", function (e) {
      var selectedOption = _this.props.options.filter(function (option) {
        return option.value + '' === e.target.value;
      })[0];

      _this._handleOptionClick(selectedOption);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_optionFormatter", function (option, styles) {
      return React.createElement("div", {
        key: option.displayValue + option.value + '_value',
        style: styles.option
      }, option.displayValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderOptions", function (styles) {
      if (_this.state.isOpen) {
        return React.createElement("div", {
          style: [styles.optionsScrim, _this.props.isFixed && {
            position: 'fixed'
          }]
        }, React.createElement("div", {
          onClick: _this._handleCloseClick,
          style: styles.close
        }, React.createElement(Icon, {
          size: 20,
          style: styles.closeIcon,
          type: _this.props.closeIcon
        }), React.createElement("div", {
          style: styles.closeText
        }, "ESC")), React.createElement("div", {
          style: styles.content
        }, React.createElement("div", {
          style: styles.optionsHeader
        }, _this.props.optionsHeaderText), React.createElement("div", {
          className: "mx-select-full-screen-options",
          style: [styles.optionsWrapper, _this.props.optionsStyle]
        }, _this.props.options.map(function (option) {
          return React.createElement("div", {
            className: "mx-select-full-screen-option",
            key: option.displayValue + option.value,
            onClick: _this._handleOptionClick.bind(null, option)
          }, _this.props.optionFormatter ? _this.props.optionFormatter(option) : _this._optionFormatter(option, styles));
        }))));
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        close: {
          position: 'absolute',
          right: 20,
          top: 15,
          textAlign: 'center',
          cursor: 'pointer',
          color: theme.Colors.GRAY_500
        },
        closeIcon: {
          color: theme.Colors.GRAY_500
        },
        closeText: {
          fontSize: theme.FontSizes.TINY
        },
        component: {
          cursor: 'pointer',
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.LARGE,
          color: theme.Colors.GRAY_700,
          boxSizing: 'border-box',
          outline: 'none'
        },
        content: {
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300
        },
        optionsScrim: {
          backgroundColor: '#fff',
          bottom: 0,
          height: '100%',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 999
        },
        optionsWrapper: {
          border: '1px solid ' + theme.Colors.GRAY_300,
          height: 250,
          overflow: 'auto',
          width: 300
        },
        option: {
          cursor: 'pointer',
          backgroundColor: '#fff',
          padding: 10,
          whiteSpace: 'nowrap',
          fontSize: theme.FontSizes.MEDIUM,
          ':hover': {
            backgroundColor: theme.Colors.PRIMARY,
            color: theme.Colors.WHITE,
            opacity: 1
          }
        },
        optionsHeader: {
          color: theme.Colors.GRAY_700,
          fontSize: theme.FontSizes.XXLARGE,
          fontWeight: 'bold',
          paddingBottom: 10
        }
      };
    });

    return _this;
  }

  _createClass(SelectFullScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.onkeyup = function (e) {
        if (e.keyCode === 27) {
          _this2._handleCloseClick();
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var selected = this.state.selected || this.props.selected || {
        displayValue: this.props.placeholderText,
        value: ''
      };
      return React.createElement("div", {
        className: "mx-select-full-screen",
        ref: this.props.elementRef,
        style: [styles.component, this.props.style]
      }, React.createElement("div", {
        className: "mx-select-full-screen-selected",
        key: "selected",
        onClick: this._handleClick,
        style: this.props.selectedStyle
      }, selected.displayValue), this._renderOptions(styles));
    }
  }]);

  return SelectFullScreen;
}(React.Component);

_defineProperty(SelectFullScreen, "propTypes", {
  closeIcon: PropTypes.string,
  elementRef: PropTypes.func,
  isFixed: PropTypes.bool,
  onChange: PropTypes.func,
  optionFormatter: PropTypes.func,
  options: PropTypes.array,
  optionsHeaderText: PropTypes.string,
  optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderText: PropTypes.string,
  selected: PropTypes.object,
  selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  theme: themeShape
});

_defineProperty(SelectFullScreen, "defaultProps", {
  closeIcon: 'close',
  isFixed: false,
  onChange: function onChange() {},
  options: [],
  optionsHeaderText: 'Select An Option',
  placeholderText: 'Select One',
  selected: false
});

module.exports = (0, _Theme.withTheme)(Radium(SelectFullScreen));