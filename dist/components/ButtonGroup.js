'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');

var Button = require('./Button');

var StyleConstants = require('../constants/Style');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes;

var ButtonGroup = React.createClass({
  displayName: 'ButtonGroup',

  propTypes: {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      ariaLabel: React.PropTypes.string,
      icon: React.PropTypes.string,
      onClick: React.PropTypes.func,
      style: React.PropTypes.object,
      text: React.PropTypes.string,
      type: React.PropTypes.oneOf(buttonTypes)
    }).isRequired),
    primaryColor: React.PropTypes.string,
    type: React.PropTypes.oneOf(buttonTypes)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      buttons: [],
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'primaryOutline'
    };
  },
  render: function render() {
    var _this = this;

    var styles = this.styles();

    return React.createElement(
      'div',
      null,
      this.props.buttons.map(function (button, i) {
        var isFirstChild = i === 0;
        var isLastChild = i === _this.props.buttons.length - 1;
        var isOnlyChild = isFirstChild && isLastChild;
        var isDisabled = button.type === 'disabled';

        return React.createElement(
          Button,
          {
            ariaLabel: button.ariaLabel,
            icon: button.icon,
            key: i,
            onClick: isDisabled ? null : button.onClick,
            primaryColor: _this.props.primaryColor,
            style: _extends({}, styles.component, isFirstChild && styles.firstChild, isLastChild && styles.lastChild, isOnlyChild && styles.onlyChild, isDisabled && styles.disabled, button.style),
            type: _this.props.type
          },
          button.text
        );
      })
    );
  },
  styles: function styles() {
    return {
      component: _extends({
        boxSizing: 'border-box',
        borderRadius: 0,
        borderWidth: 1,
        borderRightWidth: this.props.type === 'base' ? 1 : 0,
        verticalAlign: 'middle'
      }, this.props.style),
      firstChild: {
        borderRadius: '2px 0 0 2px'
      },
      lastChild: {
        borderRadius: '0 2px 2px 0',
        borderRightWidth: 1
      },
      onlyChild: {
        borderRadius: 2,
        borderWidth: 1
      },
      disabled: {
        backgroundColor: 'transparent',
        color: StyleConstants.Colors.FOG,
        cursor: 'default',
        fill: StyleConstants.Colors.FOG,
        ':hover': {
          backgroundColor: 'transparent'
        },
        ':active': {
          backgroundColor: 'transparent'
        }
      }
    };
  }
});

module.exports = Radium(ButtonGroup);