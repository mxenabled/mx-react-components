'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var StyleConstants = require('../constants/Style');

var RadioButton = React.createClass({
  displayName: 'RadioButton',

  propTypes: {
    activeButtonStyle: React.PropTypes.object,
    buttonStyle: React.PropTypes.object,
    checked: React.PropTypes.bool,
    color: React.PropTypes.string,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: StyleConstants.Colors.PRIMARY,
      onClick: function onClick() {}
    };
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { onClick: this.props.onClick, style: styles.component },
      React.createElement(
        'div',
        { style: styles.radioButton },
        this.props.checked ? React.createElement('div', { style: styles.radioButtonActive }) : null
      ),
      React.createElement(
        'div',
        { style: styles.children },
        this.props.children
      )
    );
  },
  styles: function styles() {
    return {
      component: _extends({}, {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }, this.props.style),
      radioButton: _extends({}, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        height: 15,
        marginRight: 5,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: '100%',
        backgroundColor: StyleConstants.Colors.WHITE
      }, this.props.buttonStyle),
      radioButtonActive: _extends({}, {
        width: '60%',
        height: '60%',
        borderRadius: '100%',
        backgroundColor: this.props.color
      }, this.props.activeButtonStyle)
    };
  }
});

module.exports = RadioButton;