'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');

var TextArea = React.createClass({
  displayName: 'TextArea',

  propTypes: {
    elementProps: React.PropTypes.object,
    primaryColor: React.PropTypes.string,
    rows: React.PropTypes.number,
    styles: React.PropTypes.object,
    valid: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      elementProps: {},
      primaryColor: StyleConstants.Colors.PRIMARY,
      rows: 5,
      valid: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },
  _onFocus: function _onFocus() {
    this.textarea.focus();

    this.setState({
      focus: true
    });
  },
  _onBlur: function _onBlur() {
    this.textarea.blur();

    this.setState({
      focus: false
    });
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        elementProps = _props.elementProps,
        rows = _props.rows;

    var styles = this.styles();

    return React.createElement(
      'div',
      {
        onBlur: this._onBlur,
        onFocus: this._onFocus,
        style: _extends({}, styles.wrapper, this.state.focus ? styles.active : null),
        tabIndex: 0
      },
      React.createElement('textarea', _extends({}, elementProps, {
        ref: function ref(_ref) {
          _this.textarea = _ref;
        },
        rows: rows,
        style: styles.textarea
      }))
    );
  },
  styles: function styles() {
    return _merge({}, {
      component: {
        display: 'block'
      },
      wrapper: {
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
      },
      active: {
        border: '1px solid ' + this.props.primaryColor
      },
      textarea: {
        flex: '1 0 0%',
        backgroundColor: StyleConstants.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    }, this.props.styles);
  }
});

module.exports = TextArea;