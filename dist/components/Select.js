'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var StyleConstants = require('../constants/Style');

// returns a function that takes a click event, stops it, then calls the callback
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

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this._handleKeyDown = function (e) {
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
    };

    _this._close = function () {
      _this.setState({ isOpen: false });
      _this.component.focus();
    };

    _this._open = function () {
      _this.setState({ isOpen: true });
    };

    _this._handleOptionClick = function (option) {
      _this.setState({ selected: option }, function () {
        _this._close();
        _this.props.onChange(option);
      });
    };

    _this._scrollListDown = function (nextIndex) {
      var ul = ReactDOM.findDOMNode(_this.optionList);
      var activeLi = ul.children[nextIndex];
      var heightFromTop = nextIndex * activeLi.clientHeight;

      if (heightFromTop > ul.clientHeight) {
        ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
      }
    };

    _this._scrollListUp = function (prevIndex) {
      var ul = ReactDOM.findDOMNode(_this.optionList);
      var activeLi = ul.children[prevIndex];
      var heightFromBottom = (_this.props.options.length - prevIndex) * activeLi.clientHeight;

      if (heightFromBottom > ul.clientHeight) {
        ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
      }
    };

    _this._renderScrim = function () {
      if (_this.state.isOpen) {
        var styles = _this.styles();

        return React.createElement('div', {
          className: 'mx-select-scrim',
          onClick: haltEvent(_this._close),
          style: [styles.scrim, _this.props.scrimStyle]
        });
      } else {
        return null;
      }
    };

    _this._renderOptions = function () {
      if (_this.state.isOpen) {
        var styles = _this.styles();

        if (_this.props.children) {
          return React.createElement(
            'div',
            { className: 'mx-select-options', style: styles.options },
            _this.props.children
          );
        } else {
          return React.createElement(
            Listbox,
            {
              'aria-label': _this.props.placeholderText,
              className: 'mx-select-options',
              ref: function ref(_ref) {
                return _this.optionList = _ref;
              },
              style: styles.options,
              useGlobalKeyHandler: true
            },
            _this.props.options.map(function (option) {
              return React.createElement(
                Option,
                {
                  className: 'mx-select-option',
                  isSelected: _isEqual(option, _this.state.selected),
                  key: option.displayValue + option.value,
                  label: option.displayValue,
                  onClick: haltEvent(_this._handleOptionClick.bind(null, option)),
                  style: _extends({}, styles.option, _this.props.optionStyle, _isEqual(option, _this.state.selected) ? styles.activeOption : null)
                },
                option.icon ? React.createElement(Icon, {
                  size: 20,
                  style: styles.optionIcon,
                  type: option.icon
                }) : null,
                React.createElement(
                  'div',
                  { style: styles.optionText },
                  option.displayValue
                ),
                _isEqual(option, _this.state.selected) ? React.createElement(Icon, { size: 20, type: 'check' }) : null
              );
            })
          );
        }
      } else {
        return null;
      }
    };

    _this.styles = function () {
      var focusedOption = {
        backgroundColor: _this.props.primaryColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      };

      return {
        component: _extends({}, {
          backgroundColor: StyleConstants.Colors.WHITE,
          borderRadius: 3,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          cursor: 'pointer',
          fontFamily: StyleConstants.FontFamily,
          fontSize: StyleConstants.FontSizes.MEDIUM,
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
          borderColor: StyleConstants.Colors.STRAWBERRY
        },
        options: _extends({}, {
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: '0 0 3px 3px',
          left: -1,
          right: -1,
          margin: '8px 0 0 0',
          padding: 0,
          minWidth: '100%',
          position: 'absolute',
          zIndex: 10,
          fontSize: 12,
          boxShadow: StyleConstants.ShadowHigh,
          boxSizing: 'border-box',
          maxHeight: 260,
          overflow: 'auto'
        }, _this.props.optionsStyle),
        activeOption: {
          fill: _this.props.primaryColor,
          color: _this.props.primaryColor
        },
        option: {
          display: 'flex',
          alignItems: 'center',
          color: StyleConstants.Colors.CHARCOAL,
          cursor: 'pointer',
          backgroundColor: StyleConstants.Colors.WHITE,
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
    };

    _this.state = {
      isOpen: false,
      selected: props.selected
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!_isEqual(newProps.selected, this.props.selected)) {
        this.setState({ selected: newProps.selected });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

      return React.createElement(
        'div',
        { className: 'mx-select', style: _extends({}, this.props.style, { position: 'relative' }) },
        React.createElement(
          'div',
          { className: 'mx-select-custom',
            onClick: haltEvent(this._open),
            onKeyDown: this._handleKeyDown,
            ref: function ref(_ref2) {
              return _this2.component = _ref2;
            },
            style: styles.component,
            tabIndex: '0'
          },
          this._renderScrim(),
          React.createElement(
            'div',
            { className: 'mx-select-selected', key: 'selected', style: styles.selected },
            selected.icon ? React.createElement(Icon, {
              size: 20,
              style: styles.optionIcon,
              type: selected.icon
            }) : null,
            React.createElement(
              'div',
              { style: styles.optionText },
              selected.displayValue
            ),
            React.createElement(Icon, {
              size: 20,
              type: this.state.isOpen ? 'caret-up' : 'caret-down'
            })
          ),
          this.props.options.length || this.props.children ? this._renderOptions() : null
        )
      );
    }
  }]);

  return Select;
}(React.Component);

Select.propTypes = {
  dropdownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(optionShape),
  optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderText: PropTypes.string,
  primaryColor: PropTypes.string,
  scrimStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selected: optionShape,
  selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valid: PropTypes.bool
};
Select.defaultProps = {
  primaryColor: StyleConstants.Colors.PRIMARY,
  onChange: function onChange() {},

  options: [],
  placeholderText: 'Select One',
  valid: true
};


module.exports = Radium(Select);