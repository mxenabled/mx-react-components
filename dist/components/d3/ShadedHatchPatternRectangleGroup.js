'use strict';

var React = require('react');

var StyleConstants = require('../../constants/Style');

var ShadedHatchPatternRectangleGroup = React.createClass({
  displayName: 'ShadedHatchPatternRectangleGroup',

  propTypes: {
    fillColor: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fillColor: StyleConstants.Colors.FOG,
      translation: 'translate(0,0)'
    };
  },
  render: function render() {
    return React.createElement(
      'g',
      { className: 'shaded-hatch-pattern' },
      React.createElement(
        'pattern',
        {
          height: 4,
          id: 'diagonalHatch',
          patternUnits: 'userSpaceOnUse',
          width: 4
        },
        React.createElement('path', {
          d: 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2',
          stroke: this.props.fillColor,
          strokeWidth: 1
        })
      ),
      React.createElement('rect', {
        fill: 'url(#diagonalHatch)',
        height: this.props.height,
        transform: this.props.translation,
        width: this.props.width,
        x: this.props.x,
        y: this.props.y
      })
    );
  }
});

module.exports = ShadedHatchPatternRectangleGroup;