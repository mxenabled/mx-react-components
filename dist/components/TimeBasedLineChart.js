'use strict';

var React = require('react');
var Radium = require('radium');

var d3 = require('d3');
var moment = require('moment');
var numeral = require('numeral');

var BreakPointGroup = require('./d3/BreakPointGroup');
var GridLinesGroup = require('./d3/GridLinesGroup');
var CirclesGroup = require('./d3/CirclesGroup');
var LineGroup = require('./d3/LineGroup');
var ShadedAreaRectangleGroup = require('./d3/ShadedAreaRectangleGroup');
var ShadedHatchPatternRectangleGroup = require('./d3/ShadedHatchPatternRectangleGroup');
var SlicesGroup = require('./d3/SlicesGroup');
var TimeXAxisGroup = require('./d3/TimeXAxisGroup');
var AxisGroup = require('./d3/AxisGroup');

var StyleConstants = require('../constants/Style');

var ChartUtils = require('../utils/Chart');

var styles = {
  // NOTE: D3 doesn't like camel cased key names for
  // styles.  Because of this styles in this file may
  // resemble the following.  'font-size'  DO NOT
  // change or chart styles will break.

  // Component
  component: {
    fontFamily: StyleConstants.FontFamily,
    position: 'relative',
    boxSizing: 'content-box',
    display: 'inline-block'
  },

  // Chart
  breakPointLabel: {
    fill: StyleConstants.Colors.ASH,
    'font-family': StyleConstants.Fonts.REGULAR,
    'font-size': StyleConstants.FontSizes.SMALL,
    stroke: 'none'
  },
  breakPointLine: {
    fill: 'none',
    stroke: StyleConstants.Colors.FOG,
    'stroke-width': 1
  },
  chartMargins: {
    top: 20,
    right: 30,
    bottom: 20,
    left: 75
  },
  circle: {
    fill: StyleConstants.Colors.WHITE,
    'stroke-width': 2
  },
  dateTooltip: {
    fill: StyleConstants.Colors.CHARCOAL,
    stroke: 'none'
  },
  dateTooltipText: {
    fill: StyleConstants.Colors.FOG,
    stroke: 'none',
    'font-family': StyleConstants.Fonts.REGULAR,
    'font-size': StyleConstants.FontSizes.MEDIUM
  },
  domain: {
    opacity: 0
  },
  text: {
    'font-family': StyleConstants.Fonts.REGULAR,
    'font-size': StyleConstants.FontSizes.MEDIUM,
    stroke: 'none'
  },
  verticalLine: {
    fill: 'none',
    stroke: StyleConstants.Colors.ASH,
    'stroke-width': 1
  },
  xAxisLabel: {
    fill: StyleConstants.Colors.ASH,
    stroke: 'none'
  },
  yAxisLabel: {
    stroke: 'none',
    'text-anchor': 'end'
  },
  zeroLineLabel: {
    stroke: StyleConstants.Colors.STRAWBERRY
  },

  // Hovered Data Point
  hoveredDataPointDetail: {
    boxSizing: 'border-box',
    display: 'inline-block',
    float: 'left'
  },
  hoveredDataPointDetails: {
    padding: 20,
    width: '100%'
  },
  hoveredDataPointLabel: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    display: 'inline-block',
    fontFamily: StyleConstants.Fonts.REGULAR,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    paddingRight: 5,
    textAlign: 'right'
  },
  hoveredDataPointValue: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    display: 'inline-block',
    fontFamily: StyleConstants.Fonts.SEMIBOLD,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    textAlign: 'left',
    width: 90
  },

  // Zero State
  zeroState: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

var HoveredDataPointGroup = React.createClass({
  displayName: 'HoveredDataPointGroup',

  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    hoveredDataPoint: React.PropTypes.object.isRequired,
    rangeType: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      translation: 'translate(0,0)'
    };
  },
  render: function render() {
    var _props = this.props,
        adjustedHeight = _props.adjustedHeight,
        hoveredDataPoint = _props.hoveredDataPoint,
        rangeType = _props.rangeType,
        translation = _props.translation,
        xScaleValueFunction = _props.xScaleValueFunction,
        yScaleValueFunction = _props.yScaleValueFunction;

    var hoveredDataPointXScaleValue = xScaleValueFunction(hoveredDataPoint.x);
    var hoveredDataPointYScaleValue = yScaleValueFunction(hoveredDataPoint.y);
    var dateRectangleHeight = 30;
    var dateRectangleWidth = 60;
    var dateRectangleMiddle = dateRectangleWidth / 2;
    var dateTextOffset = 20;

    return React.createElement(
      'g',
      { className: 'hover-state' },
      React.createElement(
        'g',
        { className: 'hover-state-line', transform: translation },
        React.createElement('line', {
          className: 'hovered-data-point-line',
          x1: hoveredDataPointXScaleValue,
          x2: hoveredDataPointXScaleValue,
          y1: adjustedHeight,
          y2: hoveredDataPointYScaleValue
        })
      ),
      React.createElement(
        'g',
        { className: 'hover-state-date-rect', transform: translation },
        React.createElement('rect', {
          className: 'hovered-data-point-date',
          height: dateRectangleHeight,
          width: dateRectangleWidth,
          x: hoveredDataPointXScaleValue - dateRectangleMiddle,
          y: adjustedHeight
        })
      ),
      React.createElement(
        'g',
        { className: 'hover-state-circle', transform: translation },
        React.createElement('circle', {
          className: 'circle',
          cx: xScaleValueFunction(hoveredDataPoint.x),
          cy: yScaleValueFunction(hoveredDataPoint.y),
          r: 5
        })
      ),
      React.createElement(
        'g',
        { className: 'hover-state-date-text', transform: translation },
        React.createElement(
          'text',
          {
            className: 'hovered-data-point-date-text',
            x: hoveredDataPointXScaleValue - dateTextOffset,
            y: adjustedHeight + dateTextOffset
          },
          moment.unix(hoveredDataPoint.x).format(rangeType === 'day' ? 'MMM DD' : 'MMM')
        )
      )
    );
  }
});

// Main Component
var TimeBasedLineChart = React.createClass({
  displayName: 'TimeBasedLineChart',

  propTypes: {
    breakPointDate: React.PropTypes.number,
    breakPointLabel: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    hoveredDataPointDetails: React.PropTypes.array,
    limitLineCircles: React.PropTypes.bool,
    lineColor: React.PropTypes.string,
    margin: React.PropTypes.object,
    rangeType: React.PropTypes.oneOf(['day', 'month']),
    shadeBelowZero: React.PropTypes.bool,
    shadeFutureOnGraph: React.PropTypes.bool,
    showBreakPoint: React.PropTypes.bool,
    showZeroLine: React.PropTypes.bool,
    width: React.PropTypes.number,
    yAxisFormatter: React.PropTypes.func,
    zeroState: React.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      breakPointDate: moment().startOf('day').unix(),
      breakPointLabel: 'Today',
      height: 400,
      limitLineCircles: false,
      lineColor: StyleConstants.Colors.PRIMARY,
      margin: styles.chartMargins,
      rangeType: 'day',
      shadeBelowZero: false,
      shadeFutureOnGraph: true,
      showBreakPoint: true,
      showZeroLine: false,
      width: 550,
      yAxisFormatter: function yAxisFormatter(d) {
        return numeral(d).format('0.0a');
      },

      zeroState: React.createElement(
        'div',
        { style: styles.zeroState },
        'No Data Found'
      )
    };
  },
  getInitialState: function getInitialState() {
    var adjustedWidth = this.props.width - this.props.margin.right - this.props.margin.left;
    var adjustedHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    return {
      adjustedHeight: adjustedHeight,
      adjustedWidth: adjustedWidth
    };
  },
  componentDidMount: function componentDidMount() {
    this._styleChart();
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.height !== null || newProps.width !== null || newProps.margin !== null) {
      var height = newProps.height || this.props.height;
      var width = newProps.width || this.props.width;
      var margin = newProps.margin || this.props.margin;

      var adjustedWidth = width - margin.right - margin.left;
      var adjustedHeight = height - margin.top - margin.bottom;

      this.setState({
        adjustedHeight: adjustedHeight,
        adjustedWidth: adjustedWidth
      });
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    this._styleChart();
  },
  _yRangeContainsZero: function _yRangeContainsZero() {
    var max = d3.max(this.props.data, function (d) {
      return d.y;
    });
    var min = d3.min(this.props.data, function (d) {
      return d.y;
    });
    var tickSpec = ChartUtils.getAxisTickSpecification(min, max);

    return tickSpec.min <= 0 && tickSpec.max >= 0;
  },


  // Handle functions
  _handleChartMouseLeave: function _handleChartMouseLeave() {
    this.setState({
      hoveredDataPoint: null
    });
  },
  _handleChartMouseOver: function _handleChartMouseOver(hoveredDataPoint) {
    this.setState({
      hoveredDataPoint: hoveredDataPoint
    });
  },


  // Helper Functions
  _getDataForLineCircles: function _getDataForLineCircles() {
    var _this = this;

    if (this.props.limitLineCircles) {
      return this.props.data.filter(function (dataPoint, index) {
        return index === 0 || index === _this.props.data.length - 1 || dataPoint.x === _this.props.breakPointDate;
      });
    }

    return this.props.data;
  },
  _getFormattedValue: function _getFormattedValue(value, type, format) {
    var formattedValue = '';

    switch (type) {
      case 'date':
        formattedValue = moment.unix(value).format(format);
        break;
      case 'number':
        formattedValue = numeral(value).format(format);
        break;
      default:
        formattedValue = value;
        break;
    }

    return formattedValue;
  },


  // Translation Helpers
  _getLineTranslation: function _getLineTranslation() {
    return 'translate(' + this.props.margin.left + ', 10)';
  },
  _getZeroLabelTranslation: function _getZeroLabelTranslation() {
    return 'translate(' + this.props.margin.left + ', 14)';
  },
  _getTimeAxisTranslation: function _getTimeAxisTranslation() {
    var offSet = 10;
    var x = this.props.margin.left;
    var y = this.props.height - this.props.margin.bottom - offSet;

    return 'translate(' + x + ',' + y + ')';
  },
  _getVerticalLineTranslation: function _getVerticalLineTranslation() {
    return 'translate(' + this.props.margin.left + ', -10)';
  },
  _getYAxisTranslation: function _getYAxisTranslation() {
    var offSet = 10;
    var y = this.props.margin.top - offSet;

    return 'translate(' + this.props.margin.left + ',' + y + ')';
  },


  // Position Helpers
  _getSliceWidth: function _getSliceWidth() {
    return Math.floor(this.state.adjustedWidth / this.props.data.length);
  },
  _getXScaleFunction: function _getXScaleFunction() {
    var maxDate = this.props.data[this.props.data.length - 1].x;
    var minDate = this.props.data[0].x;

    return d3.time.scale().range([0, this.state.adjustedWidth]).domain([minDate, maxDate]);
  },
  _getXScaleValue: function _getXScaleValue(value) {
    var xScale = this._getXScaleFunction();

    return xScale(value);
  },
  _getYScaleFunction: function _getYScaleFunction() {
    var max = d3.max(this.props.data, function (d) {
      return d.y;
    });
    var min = d3.min(this.props.data, function (d) {
      return d.y;
    });
    var tickSpec = ChartUtils.getAxisTickSpecification(min, max);

    return d3.scale.linear().range([this.state.adjustedHeight, 0]).domain([tickSpec.min, tickSpec.max]);
  },
  _getYScaleValue: function _getYScaleValue(value) {
    var yScale = this._getYScaleFunction();

    return yScale(value);
  },
  _getShadedRectangleHeight: function _getShadedRectangleHeight() {
    var calculatedHeight = this.state.adjustedHeight - this._getShadedRectangleYValue();

    return calculatedHeight < 0 ? 0 : calculatedHeight;
  },
  _getShadedRectangleWidth: function _getShadedRectangleWidth() {
    var calculatedWidth = this.state.adjustedWidth - this._getShadedRectangleXValue();

    return calculatedWidth < 0 ? 0 : calculatedWidth;
  },
  _getShadedRectangleXValue: function _getShadedRectangleXValue() {
    var breakPointXValue = this._getXScaleValue(this.props.breakPointDate);

    return breakPointXValue < 0 ? 0 : breakPointXValue;
  },
  _getShadedRectangleYValue: function _getShadedRectangleYValue() {
    return this._getYScaleValue(0);
  },
  _getZeroLabelXValue: function _getZeroLabelXValue() {
    var data = this.props.data;
    var maxDate = data.length ? data[data.length - 1].x : 0;
    var offSet = 15;

    return this._getXScaleValue(maxDate + this.props.margin.right) + offSet;
  },
  _getZeroLabelYValue: function _getZeroLabelYValue() {
    return this._getYScaleValue(0);
  },
  _getZeroLineData: function _getZeroLineData() {
    var data = this.props.data;
    var maxDate = data.length ? data[data.length - 1].x : 0;
    var minDate = data.length ? data[0].x : 0;

    return [{ x: minDate, y: 0 }, { x: maxDate, y: 0 }];
  },
  _styleChart: function _styleChart() {
    var chart = d3.select(this.chart);

    // Style x axis labels
    chart.select('g.time-axis').selectAll('text').attr('y', 12).style(styles.xAxisLabel).style('text-anchor', 'middle');

    // Style x axis ticks
    chart.select('g.time-axis').selectAll('line').style({ stroke: StyleConstants.Colors.FOG });

    // Style y axis labels
    chart.select('g.y-axis').selectAll('text').style(styles.yAxisLabel).style('fill', StyleConstants.Colors.ASH).attr('transform', 'translate(-10,0)');

    // Style y axis ticks
    chart.select('g.y-axis').selectAll('line').style('stroke', StyleConstants.Colors.FOG);

    // Style Circles
    chart.selectAll('.circle').style(styles.circle).style('stroke', this.props.lineColor);

    // Style Break Point Items
    chart.selectAll('.break-point-label').style(styles.breakPointLabel);

    chart.selectAll('.break-point-line').style(styles.breakPointLine);

    // Style Hovered Data Point Items
    chart.selectAll('.hovered-data-point-line').style(styles.verticalLine);

    chart.selectAll('.hovered-data-point-date').style(styles.dateTooltip);

    chart.selectAll('.hovered-data-point-date-text').style(styles.dateTooltipText);

    // Style rest of chart elements
    chart.selectAll('text').style(styles.text);

    chart.selectAll('.domain').style(styles.domain);

    chart.selectAll('.y-grid-line .tick').style('stroke', StyleConstants.Colors.FOG);

    chart.select('text.zero-line-label').style(styles.zeroLineLabel);
  },


  // Render functions
  _renderHoveredDataPointDetails: function _renderHoveredDataPointDetails() {
    var _this2 = this;

    if (this.props.hoveredDataPointDetails && this.state.hoveredDataPoint) {
      return this.props.hoveredDataPointDetails.map(function (item, index) {
        var value = _this2.state.hoveredDataPoint[item.key];

        return React.createElement(
          'div',
          { key: 'details-' + index, style: styles.hoveredDataPointDetail },
          React.createElement(
            'div',
            { style: styles.hoveredDataPointLabel },
            item.label
          ),
          React.createElement(
            'div',
            { style: styles.hoveredDataPointValue },
            value || value === 0 ? _this2._getFormattedValue(value, item.type, item.format) : 'N/A'
          )
        );
      });
    } else {
      return null;
    }
  },
  render: function render() {
    var _this3 = this;

    var _props2 = this.props,
        breakPointDate = _props2.breakPointDate,
        breakPointLabel = _props2.breakPointLabel,
        data = _props2.data,
        height = _props2.height,
        lineColor = _props2.lineColor,
        margin = _props2.margin,
        rangeType = _props2.rangeType,
        shadeBelowZero = _props2.shadeBelowZero,
        shadeFutureOnGraph = _props2.shadeFutureOnGraph,
        showBreakPoint = _props2.showBreakPoint,
        showZeroLine = _props2.showZeroLine,
        width = _props2.width,
        zeroState = _props2.zeroState,
        yAxisFormatter = _props2.yAxisFormatter;
    var _state = this.state,
        adjustedHeight = _state.adjustedHeight,
        adjustedWidth = _state.adjustedWidth,
        hoveredDataPoint = _state.hoveredDataPoint;


    return React.createElement(
      'div',
      { className: 'mx-time-based-line-chart', style: [styles.component, { height: height, width: width }] },
      data.length ? React.createElement(
        'div',
        null,
        React.createElement(
          'svg',
          {
            height: height,
            onMouseLeave: this._handleChartMouseLeave,
            ref: function ref(_ref) {
              return _this3.chart = _ref;
            },
            width: width
          },
          shadeFutureOnGraph ? React.createElement(ShadedHatchPatternRectangleGroup, {
            height: adjustedHeight,
            translation: this._getLineTranslation(),
            width: this._getShadedRectangleWidth(),
            x: this._getShadedRectangleXValue(),
            y: 0
          }) : null,
          shadeBelowZero ? React.createElement(ShadedAreaRectangleGroup, {
            fillColor: StyleConstants.Colors.STRAWBERRY,
            height: this._getShadedRectangleHeight(),
            translation: this._getLineTranslation(),
            width: adjustedWidth,
            x: 0,
            y: this._getShadedRectangleYValue()
          }) : null,
          React.createElement(AxisGroup, {
            axis: 'y',
            axisFormatFunction: yAxisFormatter,
            data: data,
            orientation: 'left',
            scaleFunction: this._getYScaleFunction,
            translation: this._getYAxisTranslation()
          }),
          React.createElement(GridLinesGroup, {
            axis: 'y',
            data: data,
            orientation: 'left',
            scaleFunction: this._getYScaleFunction,
            tickSize: adjustedWidth * -1,
            translation: this._getYAxisTranslation()
          }),
          React.createElement(TimeXAxisGroup, {
            ticks: data.filter(function (datum, index) {
              var isMonthRangeType = _this3.props.rangeType === 'month';

              return isMonthRangeType || index % 3 === 0;
            }).map(function (datum) {
              return moment.unix(datum.x).utc().unix();
            }),
            timeAxisFormat: rangeType === 'day' ? 'MMM D' : 'MMM',
            translation: this._getTimeAxisTranslation(),
            xScaleFunction: this._getXScaleFunction
          }),
          showBreakPoint ? React.createElement(BreakPointGroup, {
            adjustedHeight: adjustedHeight,
            adjustedWidth: adjustedWidth,
            breakPointDate: breakPointDate,
            breakPointLabel: breakPointLabel,
            margin: margin,
            translation: this._getVerticalLineTranslation(),
            xScaleValueFunction: this._getXScaleValue
          }) : null,
          showZeroLine && this._yRangeContainsZero() ? React.createElement(
            'g',
            { className: 'zero-line' },
            React.createElement(LineGroup, {
              adjustedHeight: adjustedHeight,
              dashLine: true,
              data: this._getZeroLineData(),
              lineColor: StyleConstants.Colors.STRAWBERRY,
              shouldAnimate: false,
              translation: this._getLineTranslation(),
              xScaleValueFunction: this._getXScaleValue,
              yScaleValueFunction: this._getYScaleValue
            }),
            React.createElement(
              'text',
              {
                className: 'zero-line-label',
                transform: this._getZeroLabelTranslation(),
                x: this._getZeroLabelXValue(),
                y: this._getZeroLabelYValue()
              },
              '0'
            )
          ) : null,
          React.createElement(LineGroup, {
            adjustedHeight: adjustedHeight,
            data: data,
            lineColor: lineColor,
            translation: this._getLineTranslation(),
            xScaleValueFunction: this._getXScaleValue,
            yScaleValueFunction: this._getYScaleValue
          }),
          React.createElement(CirclesGroup, {
            adjustedHeight: adjustedHeight,
            data: this._getDataForLineCircles(),
            translation: this._getLineTranslation(),
            xScaleValueFunction: this._getXScaleValue,
            yScaleValueFunction: this._getYScaleValue
          }),
          hoveredDataPoint ? React.createElement(HoveredDataPointGroup, {
            adjustedHeight: adjustedHeight,
            hoveredDataPoint: hoveredDataPoint,
            rangeType: rangeType,
            translation: this._getLineTranslation(),
            xScaleValueFunction: this._getXScaleValue,
            yScaleValueFunction: this._getYScaleValue
          }) : null,
          React.createElement(SlicesGroup, {
            adjustedHeight: adjustedHeight,
            data: data,
            handleChartMouseOver: this._handleChartMouseOver,
            sliceWidth: this._getSliceWidth(),
            translation: this._getLineTranslation(),
            xScaleValueFunction: this._getXScaleValue
          })
        ),
        React.createElement(
          'div',
          { style: styles.hoveredDataPointDetails },
          this._renderHoveredDataPointDetails()
        )
      ) : zeroState
    );
  }
});

module.exports = Radium(TimeBasedLineChart);