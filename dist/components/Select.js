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

var _isEqual = require('lodash/isEqual');

var keycode = require('keycode');

var PropTypes = require('prop-types');

var Radium = require('radium');

var React = require('react');

var ReactDOM = require('react-dom');

var Icon = require('./Icon');

var _require = require('./accessibility/Listbox'),
    Listbox = _require.Listbox,
    Option = _require.Option;

var _require2 = require('../constants/App'),
    themeShape = _require2.themeShape;

var StyleUtils = require('../utils/Style'); // returns a function that takes a click event, stops it, then calls the callback


var haltEvent = function haltEvent(callback) {
  return function (e) {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };
};

var optionShape = PropTypes.shape({
  displayValue: PropTypes.any.isRequired,
  icon: PropTypes.any,
  value: PropTypes.any.isRequired
});

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleKeyDown", function (e) {
      switch (keycode(e)) {
        case 'esc':
          e.preventDefault();
          e.stopPropagation();

          _this._close();

          break;

        case 'enter':
        case 'space':
          if (_this.state.isOpen) return;
          e.preventDefault();
          e.stopPropagation();

          _this._open();

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_close", function () {
      _this.setState({
        isOpen: false
      });

      _this.elementRef.focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_open", function () {
      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleOptionClick", function (option) {
      _this.setState({
        selected: option
      }, function () {
        _this._close();

        _this.props.onChange(option);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_scrollListDown", function (nextIndex) {
      var ul = ReactDOM.findDOMNode(_this.optionList);
      var activeLi = ul.children[nextIndex];
      var heightFromTop = nextIndex * activeLi.clientHeight;

      if (heightFromTop > ul.clientHeight) {
        ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_scrollListUp", function (prevIndex) {
      var ul = ReactDOM.findDOMNode(_this.optionList);
      var activeLi = ul.children[prevIndex];
      var heightFromBottom = (_this.props.options.length - prevIndex) * activeLi.clientHeight;

      if (heightFromBottom > ul.clientHeight) {
        ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderScrim", function (styles) {
      if (_this.state.isOpen) {
        return React.createElement("div", {
          className: "mx-select-scrim",
          onClick: haltEvent(_this._close),
          style: [styles.scrim, _this.props.scrimStyle]
        });
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderOptions", function (styles) {
      if (_this.state.isOpen) {
        if (_this.props.children) {
          return React.createElement("div", {
            className: "mx-select-options",
            style: styles.options
          }, typeof _this.props.children === 'function' ? _this.props.children({
            onOptionClick: _this._handleOptionClick
          }) : _this.props.children);
        } else {
          return React.createElement(Listbox, {
            "aria-label": _this.props.placeholderText,
            className: "mx-select-options",
            ref: function ref(_ref) {
              return _this.optionList = _ref;
            },
            style: styles.options
          }, _this.props.options.map(function (option) {
            return React.createElement(Option, {
              className: "mx-select-option",
              isSelected: _isEqual(option, _this.state.selected),
              key: option.displayValue + option.value,
              label: option.displayValue,
              onClick: haltEvent(_this._handleOptionClick.bind(null, option)),
              style: _extends({}, styles.option, _this.props.optionStyle, _isEqual(option, _this.state.selected) ? styles.activeOption : null)
            }, option.icon ? React.createElement(Icon, {
              size: 20,
              style: styles.optionIcon,
              type: option.icon
            }) : null, React.createElement("div", {
              style: styles.optionText
            }, option.displayValue), _isEqual(option, _this.state.selected) ? React.createElement(Icon, {
              size: 20,
              type: "check"
            }) : null);
          }));
        }
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var focusedOption = {
        backgroundColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE,
        fill: theme.Colors.WHITE
      };
      return {
        component: _extends({}, {
          backgroundColor: theme.Colors.WHITE,
          borderRadius: 3,
          border: '1px solid ' + theme.Colors.GRAY_300,
          cursor: 'pointer',
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          padding: '8px 10px',
          position: 'relative',
          boxSizing: 'border-box'
        }, _this.props.dropdownStyle),
        select: {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          opacity: 0
        },
        selected: _extends({}, {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }, _this.props.selectedStyle),
        invalid: {
          borderColor: theme.Colors.DANGER
        },
        options: _extends({}, {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: '0 0 3px 3px',
          left: -1,
          right: -1,
          margin: '8px 0 0 0',
          padding: 0,
          minWidth: '100%',
          position: 'absolute',
          zIndex: 10,
          fontSize: 12,
          boxShadow: theme.ShadowHigh,
          boxSizing: 'border-box',
          maxHeight: 260,
          overflow: 'auto'
        }, _this.props.optionsStyle),
        activeOption: {
          fill: theme.Colors.PRIMARY,
          color: theme.Colors.PRIMARY
        },
        option: {
          display: 'flex',
          alignItems: 'center',
          color: theme.Colors.GRAY_700,
          cursor: 'pointer',
          backgroundColor: theme.Colors.WHITE,
          outline: 'none',
          padding: 10,
          whiteSpace: 'nowrap',
          ':focus': focusedOption,
          ':hover': focusedOption
        },
        optionIcon: {
          marginRight: 5
        },
        optionText: _extends({}, {
          flex: '1 0 0%'
        }, _this.props.optionTextStyle),
        scrim: {
          position: 'fixed',
          zIndex: 9,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      };
    });

    _this.state = {
      isOpen: false,
      selected: props.selected
    };
    return _this;
  }

  _createClass(Select, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (!_isEqual(newProps.selected, this.props.selected)) {
        this.setState({
          selected: newProps.selected
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var selected = this.state.selected || this.props.selected || {
        displayValue: this.props.placeholderText,
        value: ''
      };
      return React.createElement("div", {
        className: "mx-select",
        style: _extends({}, this.props.style, {
          position: 'relative'
        })
      }, React.createElement("div", {
        className: "mx-select-custom",
        onClick: haltEvent(this._open),
        onKeyDown: this._handleKeyDown,
        ref: function ref(_ref2) {
          _this2.elementRef = _ref2;
          if (typeof _this2.props.elementRef === 'function') _this2.props.elementRef(_ref2);
        },
        role: "button",
        style: styles.component,
        tabIndex: 0
      }, this._renderScrim(styles), React.createElement("div", {
        className: "mx-select-selected",
        key: "selected",
        style: styles.selected
      }, selected.icon ? React.createElement(Icon, {
        size: 20,
        style: styles.optionIcon,
        type: selected.icon
      }) : null, React.createElement("div", {
        style: styles.optionText
      }, selected.displayValue), React.createElement(Icon, {
        size: 20,
        type: this.state.isOpen ? 'caret-up' : 'caret-down'
      })), this.props.options.length || this.props.children ? this._renderOptions(styles) : null));
    }
  }]);

  return Select;
}(React.Component);

_defineProperty(Select, "propTypes", {
  dropdownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  elementRef: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(optionShape),
  optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderText: PropTypes.string,
  scrimStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selected: optionShape,
  selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  theme: themeShape,
  valid: PropTypes.bool
});

_defineProperty(Select, "defaultProps", {
  onChange: function onChange() {},
  options: [],
  placeholderText: 'Select One',
  valid: true
});

module.exports = (0, _Theme.withTheme)(Radium(Select));