'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isEqual = require('lodash/isEqual');
var React = require('react');
var ReactDOM = require('react-dom');
var Radium = require('radium');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    dropdownStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    hoverColor: React.PropTypes.string,
    onChange: React.PropTypes.func,
    options: React.PropTypes.array,
    optionsStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    optionStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    optionTextStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    placeholderText: React.PropTypes.string,
    scrimStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    selected: React.PropTypes.object,
    selectedStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    valid: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hoverColor: StyleConstants.Colors.PRIMARY,
      onChange: function onChange() {},

      options: [],
      placeholderText: 'Select One',
      valid: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      highlightedValue: null,
      isOpen: false,
      selected: false,
      hoverItem: null
    };
  },
  getBackgroundColor: function getBackgroundColor(option) {
    if (option.value === this.state.hoverItem) {
      return {
        backgroundColor: this.props.hoverColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      };
    } else {
      return null;
    }
  },
  _handleScrimClick: function _handleScrimClick() {
    this.setState({
      isOpen: false,
      highlightedValue: null,
      hoverItem: null
    });
  },
  _handleClick: function _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  _handleOptionClick: function _handleOptionClick(option) {
    this.setState({
      selected: option,
      isOpen: false,
      highlightedValue: option,
      hoverItem: null
    });

    this.props.onChange(option);
  },
  _handleOptionMouseOver: function _handleOptionMouseOver(option) {
    this.setState({
      hoverItem: option.value
    });
  },
  _handleSelectChange: function _handleSelectChange(e) {
    var selectedOption = this.props.options.filter(function (option) {
      return option.value + '' === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  },
  _handleInputKeyDown: function _handleInputKeyDown(e) {
    var highlightedValue = this.state.highlightedValue;

    if (e.keyCode === 13 && highlightedValue) {
      this._handleOptionClick(highlightedValue);
    }

    if (e.keyCode === 40) {
      e.preventDefault();

      var nextIndex = this.props.options.indexOf(highlightedValue) + 1;

      if (nextIndex < this.props.options.length) {
        this.setState({
          highlightedValue: this.props.options[nextIndex]
        });

        this._scrollListDown(nextIndex);
      }
    }

    if (e.keyCode === 38) {
      e.preventDefault();

      var previousIndex = this.props.options.indexOf(highlightedValue) - 1;

      if (previousIndex > -1) {
        this.setState({
          highlightedValue: this.props.options[previousIndex]
        });

        this._scrollListUp(previousIndex);
      }
    }
  },
  _scrollListDown: function _scrollListDown(nextIndex) {
    var ul = ReactDOM.findDOMNode(this.optionList);
    var activeLi = ul.children[nextIndex];
    var heightFromTop = nextIndex * activeLi.clientHeight;

    if (heightFromTop > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  },
  _scrollListUp: function _scrollListUp(prevIndex) {
    var ul = ReactDOM.findDOMNode(this.optionList);
    var activeLi = ul.children[prevIndex];
    var heightFromBottom = (this.props.options.length - prevIndex) * activeLi.clientHeight;

    if (heightFromBottom > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  },
  _renderScrim: function _renderScrim() {
    if (this.state.isOpen) {
      var styles = this.styles();

      return React.createElement('div', {
        className: 'mx-select-scrim',
        onClick: this._handleScrimClick,
        style: [styles.scrim, this.props.scrimStyle]
      });
    } else {
      return null;
    }
  },
  _renderOptions: function _renderOptions() {
    var _this = this;

    if (this.state.isOpen) {
      var _ret = function () {
        var styles = _this.styles();

        if (_this.props.children) {
          return {
            v: React.createElement(
              'div',
              { className: 'mx-select-options', style: styles.options },
              _this.props.children
            )
          };
        } else {
          return {
            v: React.createElement(
              'ul',
              { className: 'mx-select-options', ref: function ref(_ref) {
                  return _this.optionList = _ref;
                }, style: styles.options },
              _this.props.options.map(function (option) {
                return React.createElement(
                  'li',
                  {
                    className: 'mx-select-option',
                    key: option.displayValue + option.value,
                    onClick: _this._handleOptionClick.bind(null, option),
                    onMouseOver: _this._handleOptionMouseOver.bind(null, option),
                    style: _extends({}, styles.option, _this.props.optionStyle, _isEqual(option, _this.state.highlightedValue) ? styles.activeItem : null, _this.getBackgroundColor(option))
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
                  _isEqual(option, _this.state.highlightedValue) ? React.createElement(Icon, { size: 20, style: styles.check, type: 'check' }) : null
                );
              })
            )
          };
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return null;
    }
  },
  render: function render() {
    var styles = this.styles();
    var selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return React.createElement(
      'div',
      { className: 'mx-select', style: _extends({}, this.props.style, { position: 'relative' }) },
      React.createElement(
        'div',
        { className: 'mx-select-custom',
          onClick: this._handleClick,
          onKeyDown: this._handleInputKeyDown,
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
  },
  styles: function styles() {
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
        boxSizing: 'border-box',
        outline: 'none'
      }, this.props.dropdownStyle),
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
      }, this.props.selectedStyle),
      activeItem: {
        fill: StyleConstants.Colors.PRIMARY,
        color: StyleConstants.Colors.PRIMARY
      },
      invalid: {
        borderColor: StyleConstants.Colors.STRAWBERRY
      },
      options: _extends({}, {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: '0 0 3px 3px',
        left: -1,
        right: -1,
        marginTop: 10,
        padding: 0,
        minWidth: '100%',
        position: 'absolute',
        zIndex: 10,
        fontSize: 12,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        maxHeight: 260,
        overflow: 'auto'
      }, this.props.optionsStyle),
      option: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: StyleConstants.Colors.WHITE,
        padding: 10,
        whiteSpace: 'nowrap'
      },
      optionIcon: {
        marginRight: 5
      },
      optionText: _extends({}, {
        flex: '1 0 0%'
      }, this.props.optionTextStyle),
      scrim: {
        position: 'fixed',
        zIndex: 9,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };
  }
});

module.exports = Radium(Select);