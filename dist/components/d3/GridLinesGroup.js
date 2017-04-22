'use strict';

var React = require('react');

var d3 = require('d3');

var ChartUtils = require('../../utils/Chart');

var GridLinesGroup = React.createClass({
  displayName: 'GridLinesGroup',

  propTypes: {
    axis: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string,
    scaleFunction: React.PropTypes.func.isRequired,
    tickSize: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      orientation: 'left',
      translation: 'translate(0,0)'
    };
  },
  componentDidMount: function componentDidMount() {
    this._renderGridLines();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._renderGridLines();
  },
  _renderGridLines: function _renderGridLines() {
    var _this = this;

    var max = d3.max(this.props.data, function (d) {
      return d[_this.props.axis];
    });
    var min = d3.min(this.props.data, function (d) {
      return d[_this.props.axis];
    });

    var _ChartUtils$getAxisTi = ChartUtils.getAxisTickSpecification(min, max),
        tickValues = _ChartUtils$getAxisTi.tickValues;

    var gridLinesFunction = d3.svg.axis().scale(this.props.scaleFunction()).orient(this.props.orientation).tickSize(this.props.tickSize, 0, 0).tickFormat('').ticks(tickValues.length).tickValues(tickValues);

    d3.select(this.gridLines).call(gridLinesFunction);
  },
  render: function render() {
    var _this2 = this;

    return React.createElement('g', {
      className: this.props.axis + '-grid-line',
      ref: function ref(_ref) {
        return _this2.gridLines = _ref;
      },
      transform: this.props.translation
    });
  }
});

module.exports = GridLinesGroup;