'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');
var Icon = require('../components/Icon');

var MessageBox = React.createClass({
  displayName: 'MessageBox',

  propTypes: {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    icon: React.PropTypes.string,
    styles: React.PropTypes.object,
    title: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: true
    };
  },
  _toggleMessageBox: function _toggleMessageBox() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { className: 'mx-message-box', style: styles.component },
      React.createElement(
        'div',
        { onClick: this.props.children ? this._toggleMessageBox : function () {}, style: styles.header },
        React.createElement(
          'div',
          { style: styles.leftHeader },
          React.createElement(Icon, {
            size: 20,
            style: _extends({}, styles.icon, { marginRight: StyleConstants.Spacing.SMALL }),
            type: this.props.icon
          }),
          React.createElement(
            'div',
            { style: styles.title },
            this.props.title
          )
        ),
        this.props.children && React.createElement(Icon, {
          size: 19,
          style: styles.icon,
          type: this.state.isOpen ? 'caret-up' : 'caret-down'
        })
      ),
      this.state.isOpen && React.createElement(
        'div',
        { style: styles.children },
        this.props.children
      )
    );
  },
  styles: function styles() {
    return _merge({}, {
      component: {
        color: StyleConstants.Colors.WHITE,
        boxSizing: 'border-box'
      },
      header: {
        background: this.props.color,
        display: 'flex',
        cursor: this.props.children ? 'pointer' : 'auto',
        padding: StyleConstants.Spacing.XSMALL,
        alignItems: 'center'
      },
      leftHeader: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        fontFamily: StyleConstants.Fonts.SEMIBOLD
      },
      icon: {
        fill: StyleConstants.Colors.WHITE
      },
      children: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.color, 0.1),
        padding: this.props.children ? StyleConstants.Spacing.SMALL : null
      }
    }, this.props.styles);
  }
});

module.exports = MessageBox;