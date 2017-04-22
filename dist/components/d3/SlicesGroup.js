'use strict';

var React = require('react');

var SlicesGroup = React.createClass({
  displayName: 'SlicesGroup',

  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    handleChartMouseOver: React.PropTypes.func.isRequired,
    sliceWidth: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string.isRequired,
    xScaleValueFunction: React.PropTypes.func.isRequired
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'g',
      { className: 'slices' },
      this.props.data.map(function (dataPoint, index) {
        return React.createElement('rect', {
          height: _this.props.adjustedHeight,
          key: 'slice-' + index,
          onMouseOver: _this.props.handleChartMouseOver.bind(null, dataPoint),
          opacity: 0,
          transform: _this.props.translation,
          width: _this.props.sliceWidth,
          x: _this.props.xScaleValueFunction(dataPoint.x) - _this.props.sliceWidth / 2,
          y: 0
        });
      })
    );
  }
});

module.exports = SlicesGroup;