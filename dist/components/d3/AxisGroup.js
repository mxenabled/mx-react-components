'use strict';

var React = require('react');
var d3 = require('d3');

var ChartUtils = require('../../utils/Chart');

var AxisGroup = React.createClass({
  displayName: 'AxisGroup',

  propTypes: {
    axis: React.PropTypes.string.isRequired,
    axisFormatFunction: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scaleFunction: React.PropTypes.func.isRequired,
    translation: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      translation: 'translate(0,0)'
    };
  },
  componentDidMount: function componentDidMount() {
    this._renderAxis();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._renderAxis();
  },
  _renderAxis: function _renderAxis() {
    var _this = this;

    var max = d3.max(this.props.data, function (d) {
      return d[_this.props.axis];
    });
    var min = d3.min(this.props.data, function (d) {
      return d[_this.props.axis];
    });

    var _ChartUtils$getAxisTi = ChartUtils.getAxisTickSpecification(min, max),
        tickValues = _ChartUtils$getAxisTi.tickValues;

    var axisFunction = d3.svg.axis().scale(this.props.scaleFunction()).orient(this.props.orientation).tickFormat(this.props.axisFormatFunction).ticks(tickValues.length).tickValues(tickValues);

    d3.select(this.axisGroup).call(axisFunction);
  },
  render: function render() {
    var _this2 = this;

    return React.createElement('g', {
      className: this.props.axis + '-axis',
      ref: function ref(_ref) {
        return _this2.axisGroup = _ref;
      },
      transform: this.props.translation
    });
  }
});

module.exports = AxisGroup;