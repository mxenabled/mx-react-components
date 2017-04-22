'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');
var StyleConstants = require('../constants/Style');
var Icon = require('./Icon');

var ToggleSwitch = React.createClass({
  displayName: 'ToggleSwitch',

  propTypes: {
    checked: React.PropTypes.bool,
    falseIcon: React.PropTypes.string,
    leftLabel: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    rightLabel: React.PropTypes.string,
    showIcons: React.PropTypes.bool,
    showLabels: React.PropTypes.bool,
    styles: React.PropTypes.object,
    trueIcon: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      checked: false,
      falseIcon: 'close-skinny',
      leftLabel: 'Off',
      onToggle: function onToggle() {},

      rightLabel: 'On',
      showLabels: false,
      showIcons: true,
      trueIcon: 'check-skinny'
    };
  },
  _handleToggle: function _handleToggle(event) {
    this.props.onToggle(event);
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { className: 'toggle-switch-component', style: styles.component },
      this.props.showLabels ? React.createElement(
        'div',
        { className: 'left-label', onClick: this._handleToggle, style: _extends({}, styles.label, this.props.checked ? styles.inactiveLabel : styles.activeLabel) },
        this.props.leftLabel
      ) : null,
      React.createElement(
        'div',
        {
          className: 'toggle-switch-track',
          onClick: this._handleToggle,
          style: _extends({}, styles.track, styles[this.props.checked + 'Track'])
        },
        this.props.showIcons ? React.createElement(
          'span',
          null,
          React.createElement(Icon, { className: 'true-icon', style: _extends({}, styles.icon, styles.trueIcon), type: this.props.trueIcon }),
          React.createElement(Icon, { className: 'false-icon', style: _extends({}, styles.icon, styles.falseIcon), type: this.props.falseIcon })
        ) : null,
        React.createElement('div', { className: 'toggle-switch-toggle', style: styles.toggle })
      ),
      this.props.showLabels ? React.createElement(
        'div',
        { className: 'right-label', onClick: this._handleToggle, style: _extends({}, styles.label, this.props.checked ? styles.activeLabel : styles.inactiveLabel) },
        this.props.rightLabel
      ) : null
    );
  },
  styles: function styles() {
    return _extends({}, {
      component: {
        alignItems: 'center',
        display: 'flex',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'relative'
      },
      icon: {
        fill: StyleConstants.Colors.WHITE,
        position: 'absolute',
        top: 0,
        zIndex: 2
      },
      trueIcon: {
        left: 0
      },
      falseIcon: {
        right: 0
      },
      label: {
        cursor: 'pointer',
        fontWeight: 'bold'
      },
      inactiveLabel: {
        color: StyleConstants.Colors.FOG
      },
      activeLabel: {
        color: StyleConstants.Colors.PRIMARY
      },
      toggle: {
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: '100%',
        height: 20,
        left: this.props.checked ? 20 : 2,
        position: 'absolute',
        transition: 'all 0.5s ease',
        width: 20,
        zIndex: 3
      },
      track: {
        borderRadius: 20,
        boxSizing: 'border-box',
        cursor: 'pointer',
        height: 24,
        margin: '0 10px',
        padding: 2,
        position: 'relative',
        transition: 'all 0.5s ease',
        verticalAlign: 'middle',
        width: 42,
        zIndex: 1
      },
      trueTrack: {
        backgroundColor: StyleConstants.Colors.CHARCOAL
      },
      falseTrack: {
        backgroundColor: StyleConstants.Colors.ASH
      }
    }, this.props.styles);
  }
});

module.exports = Radium(ToggleSwitch);