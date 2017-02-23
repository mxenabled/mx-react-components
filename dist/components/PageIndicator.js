'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var StyleConstants = require('../constants/Style');

var PageIndicator = React.createClass({
  displayName: 'PageIndicator',

  propTypes: {
    activeIndex: React.PropTypes.number,
    count: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func
  },

  _handleDotClick: function _handleDotClick() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (this.props.onClick) {
      this.props.onClick(index);
    }
  },
  _renderDots: function _renderDots() {
    var styles = this.styles();
    var dots = [];

    for (var i = 0; i < this.props.count; i++) {
      var dotStyles = this.props.activeIndex === i ? _extends({}, styles.dot, styles.dotActive) : styles.dot;

      dots.push(React.createElement('span', { key: 'dot' + i, onClick: this._handleDotClick.bind(null, i), style: dotStyles }));
    }

    return dots;
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { style: styles.component },
      this._renderDots()
    );
  },
  styles: function styles() {
    return {
      component: {
        textAlign: 'center',
        padding: '15px 0'
      },
      dot: {
        width: 6,
        height: 6,
        margin: 10,
        borderRadius: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundColor: StyleConstants.Colors.FOG,
        cursor: 'pointer'
      },
      dotActive: {
        backgroundColor: StyleConstants.Colors.CHARCOAL
      }
    };
  }
});

module.exports = PageIndicator;