'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var _merge = require('lodash/merge');

var Icon = require('./Icon');
var StyleConstants = require('../constants/Style');

var Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    baseColor: React.PropTypes.string,
    elementProps: React.PropTypes.object,
    focusOnLoad: React.PropTypes.bool,
    handleResetClick: React.PropTypes.func,
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    rightIcon: React.PropTypes.string,
    style: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
    styles: React.PropTypes.object,
    type: React.PropTypes.string,
    valid: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      baseColor: StyleConstants.Colors.PRIMARY,
      elementProps: {},
      focusOnLoad: false,
      type: 'text',
      valid: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.style) {
      console.warn('The style prop is deprecated and will be removed in a future release. Please use styles.');
    }

    if (this.props.focusOnLoad && this.input) {
      this.input.focus();
    }
  },
  _onFocus: function _onFocus() {
    if (this.input) {
      this.input.focus();
    }

    this.setState({
      focus: true
    });
  },
  _onBlur: function _onBlur() {
    if (this.input) {
      this.input.blur();
    }

    this.setState({
      focus: false
    });
  },
  render: function render() {
    var _this = this;

    var elementProps = this.props.elementProps;

    var styles = this.styles();

    return React.createElement(
      'div',
      {
        onBlur: this._onBlur,
        onFocus: this._onFocus,
        style: _extends({}, styles.wrapper, this.state.focus ? styles.activeWrapper : null),
        tabIndex: 0
      },
      this.props.icon ? React.createElement(Icon, { size: 20, style: styles.icon, type: this.props.icon }) : null,
      React.createElement('input', _extends({}, elementProps, {
        ref: function ref(_ref) {
          _this.input = _ref;
        },
        style: styles.input,
        type: this.props.type
      })),
      this.props.rightIcon && this.props.handleResetClick ? React.createElement(Icon, {
        elementProps: {
          onClick: this.props.handleResetClick
        },
        size: 20,
        style: styles.rightIcon,
        type: this.props.rightIcon
      }) : null
    );
  },
  styles: function styles() {
    return _merge({}, {
      wrapper: _extends({}, {
        padding: StyleConstants.Spacing.SMALL,
        boxSizing: 'border-box',
        backgroundColor: StyleConstants.Colors.WHITE,
        border: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        outline: 'none',
        boxShadow: 'none'
      }, this.props.style),
      activeWrapper: {
        border: '1px solid ' + this.props.baseColor
      },
      icon: {
        paddingRight: 7,
        fill: this.props.baseColor
      },
      rightIcon: {
        paddingLeft: StyleConstants.Spacing.XSMALL,
        fill: StyleConstants.Colors.FOG,
        cursor: 'pointer'
      },
      input: {
        flex: '1 0 0%',
        color: StyleConstants.Colors.CHARCOAL,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        backgroundColor: StyleConstants.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    }, this.props.styles);
  }
});

module.exports = Input;