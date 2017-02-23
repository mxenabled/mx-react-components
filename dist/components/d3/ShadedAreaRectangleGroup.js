'use strict';

var React = require('react');

var StyleConstants = require('../../constants/Style');

var ShadedAreaRectangleGroup = React.createClass({
  displayName: 'ShadedAreaRectangleGroup',

  propTypes: {
    fillColor: React.PropTypes.string,
    fillOpacity: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fillColor: StyleConstants.Colors.FOG,
      fillOpacity: 0.1,
      translation: 'translate(0,0)'
    };
  },
  render: function render() {
    return React.createElement(
      'g',
      { className: 'shaded-area' },
      React.createElement('rect', {
        fill: this.props.fillColor,
        fillOpacity: this.props.fillOpacity,
        height: this.props.height,
        transform: this.props.translation,
        width: this.props.width,
        x: this.props.x,
        y: this.props.y
      })
    );
  }
});

module.exports = ShadedAreaRectangleGroup;