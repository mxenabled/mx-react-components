'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Tooltip = React.createClass({
  displayName: 'Tooltip',

  propTypes: {
    icon: React.PropTypes.string,
    iconSize: React.PropTypes.number,
    placement: React.PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    style: React.PropTypes.object,
    tooltipStyle: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      icon: 'info',
      iconSize: 20,
      placement: 'top',
      tooltipStyle: {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      showTooltip: false
    };
  },
  _handleInfoMouseEnter: function _handleInfoMouseEnter() {
    this.setState({
      showTooltip: true
    });
  },
  _handleInfoMouseLeave: function _handleInfoMouseLeave() {
    this.setState({
      showTooltip: false
    });
  },
  _getPosition: function _getPosition() {
    var offSet = this.props.iconSize + 5;
    var width = this.props.tooltipStyle.width || 200;

    switch (this.props.placement) {
      case 'left':
        return {
          bottom: 0,
          margin: 'auto',
          right: offSet,
          top: 0
        };
      case 'right':
        return {
          bottom: 0,
          left: offSet,
          margin: 'auto',
          top: 0
        };
      case 'top':
        return {
          bottom: offSet,
          left: '50%',
          marginLeft: -(this.props.iconSize / 2 + width / 2)
        };
      case 'bottom':
        return {
          top: offSet,
          left: '50%',
          marginLeft: -(this.props.iconSize / 2 + width / 2)
        };
      default:
        return null;
    }
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { style: styles.component },
      this.state.showTooltip ? React.createElement(
        'div',
        { style: styles.tooltip },
        this.props.children
      ) : null,
      React.createElement(Icon, {
        elementProps: {
          onMouseEnter: this._handleInfoMouseEnter,
          onMouseLeave: this._handleInfoMouseLeave
        },
        size: this.props.iconSize,
        type: this.props.icon
      })
    );
  },
  styles: function styles() {
    return {
      component: _extends({}, {
        display: 'inline-block',
        fill: StyleConstants.Colors.ASH,
        position: 'relative'
      }, this.props.style),
      tooltip: _extends({}, {
        alignItems: 'center',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        display: 'flex',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        justifyContent: 'center',
        lineHeight: '1.3em',
        minHeight: '100%',
        padding: 10,
        position: 'absolute',
        textAlign: 'center',
        whiteSpace: 'normal',
        width: this.props.tooltipStyle.width || 200,
        zIndex: '10'
      }, this._getPosition(), this.props.tooltipStyle)
    };
  }
});

module.exports = Tooltip;