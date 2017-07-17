'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
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

var HoveredDataPointGroup = function (_React$Component) {
  _inherits(HoveredDataPointGroup, _React$Component);

  function HoveredDataPointGroup() {
    _classCallCheck(this, HoveredDataPointGroup);

    return _possibleConstructorReturn(this, (HoveredDataPointGroup.__proto__ || Object.getPrototypeOf(HoveredDataPointGroup)).apply(this, arguments));
  }

  _createClass(HoveredDataPointGroup, [{
    key: 'render',
    value: function render() {
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
  }]);

  return HoveredDataPointGroup;
}(React.Component);

// Main Component


HoveredDataPointGroup.propTypes = {
  adjustedHeight: PropTypes.number.isRequired,
  hoveredDataPoint: PropTypes.object.isRequired,
  rangeType: PropTypes.string.isRequired,
  translation: PropTypes.string,
  xScaleValueFunction: PropTypes.func.isRequired,
  yScaleValueFunction: PropTypes.func.isRequired
};
HoveredDataPointGroup.defaultProps = {
  translation: 'translate(0,0)'
};

var TimeBasedLineChart = function (_React$Component2) {
  _inherits(TimeBasedLineChart, _React$Component2);

  function TimeBasedLineChart(props) {
    _classCallCheck(this, TimeBasedLineChart);

    var _this2 = _possibleConstructorReturn(this, (TimeBasedLineChart.__proto__ || Object.getPrototypeOf(TimeBasedLineChart)).call(this, props));

    _this2._yRangeContainsZero = function () {
      var max = d3.max(_this2.props.data, function (d) {
        return d.y;
      });
      var min = d3.min(_this2.props.data, function (d) {
        return d.y;
      });
      var tickSpec = ChartUtils.getAxisTickSpecification(min, max);

      return tickSpec.min <= 0 && tickSpec.max >= 0;
    };

    _this2._handleChartMouseLeave = function () {
      _this2.setState({
        hoveredDataPoint: null
      });
    };

    _this2._handleChartMouseOver = function (hoveredDataPoint) {
      _this2.setState({
        hoveredDataPoint: hoveredDataPoint
      });
    };

    _this2._getDataForLineCircles = function () {
      if (_this2.props.limitLineCircles) {
        return _this2.props.data.filter(function (dataPoint, index) {
          return index === 0 || index === _this2.props.data.length - 1 || dataPoint.x === _this2.props.breakPointDate;
        });
      }

      return _this2.props.data;
    };

    _this2._getFormattedValue = function (value, type, format) {
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
    };

    _this2._getLineTranslation = function () {
      return 'translate(' + _this2.props.margin.left + ', 10)';
    };

    _this2._getZeroLabelTranslation = function () {
      return 'translate(' + _this2.props.margin.left + ', 14)';
    };

    _this2._getTimeAxisTranslation = function () {
      var offSet = 10;
      var x = _this2.props.margin.left;
      var y = _this2.props.height - _this2.props.margin.bottom - offSet;

      return 'translate(' + x + ',' + y + ')';
    };

    _this2._getVerticalLineTranslation = function () {
      return 'translate(' + _this2.props.margin.left + ', -10)';
    };

    _this2._getYAxisTranslation = function () {
      var offSet = 10;
      var y = _this2.props.margin.top - offSet;

      return 'translate(' + _this2.props.margin.left + ',' + y + ')';
    };

    _this2._getSliceWidth = function () {
      return Math.floor(_this2.state.adjustedWidth / _this2.props.data.length);
    };

    _this2._getXScaleFunction = function () {
      var maxDate = _this2.props.data[_this2.props.data.length - 1].x;
      var minDate = _this2.props.data[0].x;

      return d3.time.scale().range([0, _this2.state.adjustedWidth]).domain([minDate, maxDate]);
    };

    _this2._getXScaleValue = function (value) {
      var xScale = _this2._getXScaleFunction();

      return xScale(value);
    };

    _this2._getYScaleFunction = function () {
      var max = d3.max(_this2.props.data, function (d) {
        return d.y;
      });
      var min = d3.min(_this2.props.data, function (d) {
        return d.y;
      });
      var tickSpec = ChartUtils.getAxisTickSpecification(min, max);

      return d3.scale.linear().range([_this2.state.adjustedHeight, 0]).domain([tickSpec.min, tickSpec.max]);
    };

    _this2._getYScaleValue = function (value) {
      var yScale = _this2._getYScaleFunction();

      return yScale(value);
    };

    _this2._getShadedRectangleHeight = function () {
      var calculatedHeight = _this2.state.adjustedHeight - _this2._getShadedRectangleYValue();

      return calculatedHeight < 0 ? 0 : calculatedHeight;
    };

    _this2._getShadedRectangleWidth = function () {
      var calculatedWidth = _this2.state.adjustedWidth - _this2._getShadedRectangleXValue();

      return calculatedWidth < 0 ? 0 : calculatedWidth;
    };

    _this2._getShadedRectangleXValue = function () {
      var breakPointXValue = _this2._getXScaleValue(_this2.props.breakPointDate);

      return breakPointXValue < 0 ? 0 : breakPointXValue;
    };

    _this2._getShadedRectangleYValue = function () {
      return _this2._getYScaleValue(0);
    };

    _this2._getZeroLabelXValue = function () {
      var data = _this2.props.data;
      var maxDate = data.length ? data[data.length - 1].x : 0;
      var offSet = 15;

      return _this2._getXScaleValue(maxDate + _this2.props.margin.right) + offSet;
    };

    _this2._getZeroLabelYValue = function () {
      return _this2._getYScaleValue(0);
    };

    _this2._getZeroLineData = function () {
      var data = _this2.props.data;
      var maxDate = data.length ? data[data.length - 1].x : 0;
      var minDate = data.length ? data[0].x : 0;

      return [{ x: minDate, y: 0 }, { x: maxDate, y: 0 }];
    };

    _this2._styleChart = function () {
      var chart = d3.select(_this2.chart);

      // Style x axis labels
      chart.select('g.time-axis').selectAll('text').attr('y', 12).style(styles.xAxisLabel).style('text-anchor', 'middle');

      // Style x axis ticks
      chart.select('g.time-axis').selectAll('line').style({ stroke: StyleConstants.Colors.FOG });

      // Style y axis labels
      chart.select('g.y-axis').selectAll('text').style(styles.yAxisLabel).style('fill', StyleConstants.Colors.ASH).attr('transform', 'translate(-10,0)');

      // Style y axis ticks
      chart.select('g.y-axis').selectAll('line').style('stroke', StyleConstants.Colors.FOG);

      // Style Circles
      chart.selectAll('.circle').style(styles.circle).style('stroke', _this2.props.lineColor);

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
    };

    _this2._renderHoveredDataPointDetails = function () {
      if (_this2.props.hoveredDataPointDetails && _this2.state.hoveredDataPoint) {
        return _this2.props.hoveredDataPointDetails.map(function (item, index) {
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
    };

    var adjustedWidth = props.width - props.margin.right - props.margin.left;
    var adjustedHeight = props.height - props.margin.top - props.margin.bottom;

    _this2.state = {
      adjustedHeight: adjustedHeight,
      adjustedWidth: adjustedWidth
    };
    return _this2;
  }

  _createClass(TimeBasedLineChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._styleChart();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
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
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._styleChart();
    }

    // Handle functions


    // Helper Functions


    // Translation Helpers


    // Position Helpers


    // Render functions

  }, {
    key: 'render',
    value: function render() {
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
                return index % Math.ceil(data.length / 10) === 0;
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
  }]);

  return TimeBasedLineChart;
}(React.Component);

TimeBasedLineChart.propTypes = {
  breakPointDate: PropTypes.number,
  breakPointLabel: PropTypes.string,
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  hoveredDataPointDetails: PropTypes.array,
  limitLineCircles: PropTypes.bool,
  lineColor: PropTypes.string,
  margin: PropTypes.object,
  rangeType: PropTypes.oneOf(['day', 'month']),
  shadeBelowZero: PropTypes.bool,
  shadeFutureOnGraph: PropTypes.bool,
  showBreakPoint: PropTypes.bool,
  showZeroLine: PropTypes.bool,
  width: PropTypes.number,
  yAxisFormatter: PropTypes.func,
  zeroState: PropTypes.node
};
TimeBasedLineChart.defaultProps = {
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


module.exports = Radium(TimeBasedLineChart);