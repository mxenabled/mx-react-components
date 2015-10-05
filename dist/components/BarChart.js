'use strict';

var React = require('react');
var Radium = require('radium');
var d3 = require('d3');

var StyleConstants = require('../constants/Style');

var BarChart = React.createClass({
  displayName: 'BarChart',

  propTypes: {
    barSpace: React.PropTypes.number,
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    fontSize: React.PropTypes.number,
    gridColor: React.PropTypes.string,
    height: React.PropTypes.number,
    margin: React.PropTypes.object,
    tickCount: React.PropTypes.number,
    width: React.PropTypes.number,
    xAxisLabelColor: React.PropTypes.string,
    xAxisPosition: React.PropTypes.string,
    yAxisLabelColor: React.PropTypes.string,
    yAxisPosition: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      barSpace: 0.1,
      colors: d3.scale.category20().range(),
      data: [],
      fontSize: 13,
      gridColor: '#999',
      height: 360,
      margin: {
        xAxis: 20,
        yAxis: 20
      },
      tickCount: 4,
      width: 360,
      xAxisLabelColor: '#333',
      xAxisPosition: 'bottom',
      yAxisLabelColor: '#999',
      yAxisPosition: 'left'
    };
  },

  _getTicks: function _getTicks() {
    var adjustedHeight = this.props.height - this.props.margin.xAxis;

    return d3.scale.identity().range([adjustedHeight, 0]).domain([0, d3.max(this.props.data, function (d) {
      return d.value;
    })]).ticks(this.props.tickCount);
  },

  _getXScale: function _getXScale() {
    return d3.scale.ordinal().rangeRoundBands([0, this.props.width], this.props.barSpace).domain(this.props.data.map(function (d) {
      return d.label;
    }));
  },

  _getYScale: function _getYScale() {
    var adjustedHeight = this.props.height - this.props.margin.xAxis;

    return d3.scale.linear().range([adjustedHeight, 0]).domain([0, d3.max(this.props.data, function (d) {
      return d.value;
    })]);
  },

  _renderBars: function _renderBars() {
    var _this = this;

    var adjustedHeight = this.props.height - this.props.margin.xAxis;
    var xScale = this._getXScale();
    var yScale = this._getYScale();

    return this.props.data.map(function (dataSet, index) {
      var y = yScale(dataSet.value);
      var translate = 'translate(' + xScale(dataSet.label) + ', 0)';

      return React.createElement('rect', {
        fill: _this.props.colors[index],
        height: adjustedHeight - y,
        key: index,
        transform: translate,
        width: xScale.rangeBand(),
        y: y
      });
    });
  },

  _renderGrid: function _renderGrid() {
    var _this2 = this;

    var yScale = this._getYScale();
    var ticks = this._getTicks();
    var stroke = this.props.gridColor;

    return ticks.map(function (tick, index) {
      return React.createElement(
        'g',
        { key: index, style: [styles.grid, { stroke: stroke }], transform: 'translate(0,' + yScale(tick) + ')' },
        React.createElement('line', { x2: _this2.props.width })
      );
    });
  },

  _renderXAxisLabels: function _renderXAxisLabels() {
    var xScale = this._getXScale();
    var width = xScale.rangeBand();
    var color = this.props.xAxisLabelColor;

    return this.props.data.map(function (dataSet, index) {
      var left = xScale(dataSet.label);

      return React.createElement(
        'div',
        { key: index, style: [styles.xAxisLabel, { color: color, width: width, left: left }] },
        dataSet.label
      );
    });
  },

  _renderYAxisLabels: function _renderYAxisLabels() {
    var _this3 = this;

    var yScale = this._getYScale();
    var ticks = this._getTicks();
    var color = this.props.yAxisLabelColor;

    return ticks.map(function (tick, index) {
      var top = _this3.props.xAxisPosition === 'top' ? yScale(tick) - _this3.props.fontSize + _this3.props.margin.yAxis : yScale(tick) - _this3.props.fontSize;
      var textAlign = _this3.props.yAxisPosition;

      return React.createElement(
        'div',
        { key: index, style: [styles.yAxislabel, { color: color, textAlign: textAlign, top: top }] },
        tick
      );
    });
  },

  render: function render() {
    var adjustedHeight = this.props.height - this.props.margin.xAxis;
    var xAxisPosition = this.props.xAxisPosition === 'top' ? { top: 0 } : { top: adjustedHeight + 5 };
    var chartMargin = this.props.xAxisPosition === 'top' ? { marginTop: this.props.margin.xAxis } : { marginBottom: this.props.margin.xAxis };

    return React.createElement(
      'div',
      { style: [styles.component, { height: this.props.height, width: this.props.width, fontSize: this.props.fontSize + 'px' }] },
      this._renderYAxisLabels(),
      React.createElement(
        'svg',
        { height: adjustedHeight, style: chartMargin, width: this.props.width },
        React.createElement(
          'g',
          null,
          this._renderGrid(),
          this._renderBars()
        )
      ),
      React.createElement(
        'div',
        { style: [styles.xAxis, xAxisPosition] },
        this._renderXAxisLabels()
      )
    );
  }
});

var styles = {
  component: {
    position: 'relative',
    fontFamily: StyleConstants.FontFamily
  },
  grid: {
    strokeWidth: '0.5px',
    strokeDasharray: '3px, 3px'
  },
  xAxis: {
    position: 'absolute'
  },
  xAxisLabel: {
    position: 'absolute',
    textAlign: 'center',
    display: 'inline-block'
  },
  yAxislabel: {
    lineHeight: '0.8em',
    position: 'absolute',
    width: '100%'
  }
};

module.exports = Radium(BarChart);