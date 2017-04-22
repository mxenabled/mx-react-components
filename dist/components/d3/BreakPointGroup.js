'use strict';

var React = require('react');

var BreakPointGroup = React.createClass({
  displayName: 'BreakPointGroup',

  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    adjustedWidth: React.PropTypes.number.isRequired,
    breakPointDate: React.PropTypes.number.isRequired,
    breakPointLabel: React.PropTypes.string.isRequired,
    margin: React.PropTypes.object.isRequired,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      translation: 'translate(0,0)'
    };
  },
  render: function render() {
    var _props = this.props,
        adjustedHeight = _props.adjustedHeight,
        adjustedWidth = _props.adjustedWidth,
        breakPointDate = _props.breakPointDate,
        breakPointLabel = _props.breakPointLabel,
        margin = _props.margin,
        translation = _props.translation,
        xScaleValueFunction = _props.xScaleValueFunction;

    var breakPointXValue = xScaleValueFunction(breakPointDate);
    var breakPointLabelOffSet = 10;
    var breakPointLabelYPosition = 40;

    return React.createElement(
      'g',
      { className: 'break-point-items', transform: translation },
      React.createElement('line', {
        className: 'break-point-line',
        x1: breakPointXValue,
        x2: breakPointXValue,
        y1: margin.top,
        y2: adjustedHeight + margin.bottom
      }),
      adjustedWidth - breakPointXValue - breakPointLabelOffSet > 100 ? React.createElement(
        'text',
        {
          className: 'break-point-label',
          x: breakPointXValue + breakPointLabelOffSet,
          y: breakPointLabelYPosition
        },
        breakPointLabel
      ) : null
    );
  }
});

module.exports = BreakPointGroup;