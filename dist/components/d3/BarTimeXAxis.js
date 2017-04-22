'use strict';

var React = require('react');

var d3 = require('d3');
var moment = require('moment');
var _merge = require('lodash/merge');

var StyleConstants = require('../../constants/Style');

var BarTimeXAxis = React.createClass({
  displayName: 'BarTimeXAxis',

  propTypes: {
    style: React.PropTypes.object,
    tickRange: React.PropTypes.array,
    tickSize: React.PropTypes.number,
    tickValues: React.PropTypes.array,
    timeAxisFormat: React.PropTypes.string.isRequired,
    transform: React.PropTypes.string,
    xScaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      style: {},
      tickSize: 6,
      tickValues: null,
      transform: 'translate(0,0)'
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

    var timeAxisFunction = d3.svg.axis().scale(this.props.xScaleFunction).tickValues(this.props.tickValues).tickFormat(function (d) {
      return moment.unix(d).format(_this.props.timeAxisFormat);
    }).outerTickSize(0);

    d3.select(this.timeAxis).call(timeAxisFunction);

    this._styleChart();
  },
  _styleChart: function _styleChart() {
    var style = _merge({}, this.styles(), this.props.style);
    var axis = d3.select(this.timeAxis);

    // Style x axis labels
    axis.selectAll('text').style(style.text);

    // Style x axis path
    axis.selectAll('path').style(style.path);
  },
  render: function render() {
    var _this2 = this;

    return React.createElement('g', {
      className: 'x-bar-time-axis',
      ref: function ref(_ref) {
        return _this2.timeAxis = _ref;
      },
      transform: this.props.transform
    });
  },
  styles: function styles() {
    return {
      text: {
        fill: StyleConstants.Colors.ASH,
        stroke: 'none',
        'font-size': StyleConstants.FontSizes.MEDIUM,
        'text-anchor': 'middle'
      },
      path: {
        stroke: StyleConstants.Colors.FOG,
        'stroke-width': 1,
        fill: 'none'
      }
    };
  }
});

module.exports = BarTimeXAxis;