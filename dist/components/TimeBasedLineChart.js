"use strict";

var _Theme = require("./Theme");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var d3 = require('d3');

var moment = require('moment');

var numeral = require('numeral');

var _isEqual = require('lodash/isEqual');

var BreakPointGroup = require('./d3/BreakPointGroup');

var GridLinesGroup = require('./d3/GridLinesGroup');

var CirclesGroup = require('./d3/CirclesGroup');

var LineGroup = require('./d3/LineGroup');

var ShadedAreaRectangleGroup = require('./d3/ShadedAreaRectangleGroup');

var ShadedHatchPatternRectangleGroup = require('./d3/ShadedHatchPatternRectangleGroup');

var SlicesGroup = require('./d3/SlicesGroup');

var TimeXAxisGroup = require('./d3/TimeXAxisGroup');

var AxisGroup = require('./d3/AxisGroup');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var ChartUtils = require('../utils/Chart');

var StyleUtils = require('../utils/Style');

var getStyles = function getStyles(theme) {
  return {
    // NOTE: D3 doesn't like camel cased key names for
    // styles.  Because of this styles in this file may
    // resemble the following.  'font-size'  DO NOT
    // change or chart styles will break.
    // Component
    component: {
      fontFamily: theme.FontFamily,
      position: 'relative',
      boxSizing: 'content-box',
      display: 'inline-block'
    },
    // Chart
    breakPointLabel: {
      fill: theme.Colors.GRAY_500,
      'font-family': theme.Fonts.REGULAR,
      'font-size': theme.FontSizes.SMALL,
      stroke: 'none'
    },
    breakPointLine: {
      fill: 'none',
      stroke: theme.Colors.GRAY_300,
      'stroke-width': 1
    },
    chartMargins: {
      top: 20,
      right: 30,
      bottom: 20,
      left: 75
    },
    circle: {
      fill: theme.Colors.WHITE,
      'stroke-width': 2
    },
    dateTooltip: {
      fill: theme.Colors.GRAY_700,
      stroke: 'none'
    },
    dateTooltipText: {
      fill: theme.Colors.GRAY_300,
      stroke: 'none',
      'font-family': theme.Fonts.REGULAR,
      'font-size': theme.FontSizes.MEDIUM
    },
    domain: {
      opacity: 0
    },
    text: {
      'font-family': theme.Fonts.REGULAR,
      'font-size': theme.FontSizes.MEDIUM,
      stroke: 'none'
    },
    verticalLine: {
      fill: 'none',
      stroke: theme.Colors.GRAY_500,
      'stroke-width': 1
    },
    xAxisLabel: {
      fill: theme.Colors.GRAY_500,
      stroke: 'none'
    },
    yAxisLabel: {
      stroke: 'none',
      'text-anchor': 'end'
    },
    zeroLineLabel: {
      stroke: theme.Colors.DANGER
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
      color: theme.Colors.GRAY_700,
      display: 'inline-block',
      fontFamily: theme.Fonts.REGULAR,
      fontSize: theme.FontSizes.MEDIUM,
      paddingRight: 5,
      textAlign: 'right'
    },
    hoveredDataPointValue: {
      boxSizing: 'border-box',
      color: theme.Colors.GRAY_700,
      display: 'inline-block',
      fontFamily: theme.Fonts.SEMIBOLD,
      fontSize: theme.FontSizes.MEDIUM,
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
};

var HoveredDataPointGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HoveredDataPointGroup, _React$Component);

  function HoveredDataPointGroup() {
    _classCallCheck(this, HoveredDataPointGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(HoveredDataPointGroup).apply(this, arguments));
  }

  _createClass(HoveredDataPointGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          adjustedHeight = _this$props.adjustedHeight,
          hoveredDataPoint = _this$props.hoveredDataPoint,
          rangeType = _this$props.rangeType,
          translation = _this$props.translation,
          xScaleValueFunction = _this$props.xScaleValueFunction,
          yScaleValueFunction = _this$props.yScaleValueFunction;
      var hoveredDataPointXScaleValue = xScaleValueFunction(hoveredDataPoint.x);
      var hoveredDataPointYScaleValue = yScaleValueFunction(hoveredDataPoint.y);
      var dateRectangleHeight = 30;
      var dateRectangleWidth = 60;
      var dateRectangleMiddle = dateRectangleWidth / 2;
      var dateTextOffset = 20;
      return React.createElement("g", {
        className: "hover-state"
      }, React.createElement("g", {
        className: "hover-state-line",
        transform: translation
      }, React.createElement("line", {
        className: "hovered-data-point-line",
        x1: hoveredDataPointXScaleValue,
        x2: hoveredDataPointXScaleValue,
        y1: adjustedHeight,
        y2: hoveredDataPointYScaleValue
      })), React.createElement("g", {
        className: "hover-state-date-rect",
        transform: translation
      }, React.createElement("rect", {
        className: "hovered-data-point-date",
        height: dateRectangleHeight,
        width: dateRectangleWidth,
        x: hoveredDataPointXScaleValue - dateRectangleMiddle,
        y: adjustedHeight
      })), React.createElement("g", {
        className: "hover-state-circle",
        transform: translation
      }, React.createElement("circle", {
        className: "circle",
        cx: xScaleValueFunction(hoveredDataPoint.x),
        cy: yScaleValueFunction(hoveredDataPoint.y),
        r: 5
      })), React.createElement("g", {
        className: "hover-state-date-text",
        transform: translation
      }, React.createElement("text", {
        className: "hovered-data-point-date-text",
        x: hoveredDataPointXScaleValue - dateTextOffset,
        y: adjustedHeight + dateTextOffset
      }, moment.unix(hoveredDataPoint.x).format(rangeType === 'day' ? 'MMM DD' : 'MMM'))));
    }
  }]);

  return HoveredDataPointGroup;
}(React.Component); // Main Component


_defineProperty(HoveredDataPointGroup, "propTypes", {
  adjustedHeight: PropTypes.number.isRequired,
  hoveredDataPoint: PropTypes.object.isRequired,
  rangeType: PropTypes.string.isRequired,
  translation: PropTypes.string,
  xScaleValueFunction: PropTypes.func.isRequired,
  yScaleValueFunction: PropTypes.func.isRequired
});

_defineProperty(HoveredDataPointGroup, "defaultProps", {
  translation: 'translate(0,0)'
});

var TimeBasedLineChart =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(TimeBasedLineChart, _React$Component2);

  function TimeBasedLineChart(props) {
    var _this;

    _classCallCheck(this, TimeBasedLineChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeBasedLineChart).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_yRangeContainsZero", function () {
      var max = d3.max(_this.props.data, function (d) {
        return d.y;
      });
      var min = d3.min(_this.props.data, function (d) {
        return d.y;
      });
      var tickSpec = ChartUtils.getAxisTickSpecification(min, max);
      return tickSpec.min <= 0 && tickSpec.max >= 0;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleChartMouseLeave", function () {
      _this.setState({
        hoveredDataPoint: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleChartMouseOver", function (hoveredDataPoint) {
      _this.setState({
        hoveredDataPoint: hoveredDataPoint
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getDataForLineCircles", function () {
      if (_this.props.limitLineCircles) {
        return _this.props.data.filter(function (dataPoint, index) {
          return index === 0 || index === _this.props.data.length - 1 || dataPoint.x === _this.props.getBreakPointDate();
        });
      }

      return _this.props.data;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getFormattedValue", function (value, type, format) {
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
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getLineTranslation", function () {
      return 'translate(' + _this.state.margin.left + ', 10)';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getZeroLabelTranslation", function () {
      return 'translate(' + _this.state.margin.left + ', 14)';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getTimeAxisTranslation", function () {
      var offSet = 10;
      var x = _this.state.margin.left;
      var y = _this.props.height - _this.state.margin.bottom - offSet;
      return 'translate(' + x + ',' + y + ')';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getVerticalLineTranslation", function () {
      return 'translate(' + _this.state.margin.left + ', -10)';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getYAxisTranslation", function () {
      var offSet = 10;
      var y = _this.state.margin.top - offSet;
      return 'translate(' + _this.state.margin.left + ',' + y + ')';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getSliceWidth", function () {
      return Math.floor(_this.state.adjustedWidth / _this.props.data.length);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getXScaleFunction", function () {
      var maxDate = _this.props.data[_this.props.data.length - 1].x;
      var minDate = _this.props.data[0].x;
      return d3.time.scale().range([0, _this.state.adjustedWidth]).domain([minDate, maxDate]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getXScaleValue", function (value) {
      var xScale = _this._getXScaleFunction();

      return xScale(value);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getYScaleFunction", function () {
      var max = d3.max(_this.props.data, function (d) {
        return d.y;
      });
      var min = d3.min(_this.props.data, function (d) {
        return d.y;
      });
      var tickSpec = ChartUtils.getAxisTickSpecification(min, max);
      return d3.scale.linear().range([_this.state.adjustedHeight, 0]).domain([tickSpec.min, tickSpec.max]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getYScaleValue", function (value) {
      var yScale = _this._getYScaleFunction();

      return yScale(value);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getShadedRectangleHeight", function () {
      var calculatedHeight = _this.state.adjustedHeight - _this._getShadedRectangleYValue();

      return calculatedHeight < 0 ? 0 : calculatedHeight;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getShadedRectangleWidth", function () {
      var calculatedWidth = _this.state.adjustedWidth - _this._getShadedRectangleXValue();

      return calculatedWidth < 0 ? 0 : calculatedWidth;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getShadedRectangleXValue", function () {
      var breakPointXValue = _this._getXScaleValue(_this.props.getBreakPointDate());

      return breakPointXValue < 0 ? 0 : breakPointXValue;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getShadedRectangleYValue", function () {
      return _this._getYScaleValue(0);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getZeroLabelXValue", function () {
      var data = _this.props.data;
      var maxDate = data.length ? data[data.length - 1].x : 0;
      var offSet = 15;
      return _this._getXScaleValue(maxDate + _this.state.margin.right) + offSet;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getZeroLabelYValue", function () {
      return _this._getYScaleValue(0);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getZeroLineData", function () {
      var data = _this.props.data;
      var maxDate = data.length ? data[data.length - 1].x : 0;
      var minDate = data.length ? data[0].x : 0;
      return [{
        x: minDate,
        y: 0
      }, {
        x: maxDate,
        y: 0
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_styleChart", function () {
      var chart = d3.select(_this.chart); // Style x axis labels

      chart.select('g.time-axis').selectAll('text').attr('y', 12).style(_this.state.styles.xAxisLabel).style('text-anchor', 'middle'); // Style x axis ticks

      chart.select('g.time-axis').selectAll('line').style({
        stroke: _this.state.theme.Colors.GRAY_300
      }); // Style y axis labels

      chart.select('g.y-axis').selectAll('text').style(_this.state.styles.yAxisLabel).style('fill', _this.state.theme.Colors.GRAY_500).attr('transform', 'translate(-10,0)'); // Style y axis ticks

      chart.select('g.y-axis').selectAll('line').style('stroke', _this.state.theme.Colors.GRAY_300); // Style Circles

      chart.selectAll('.circle').style(_this.state.styles.circle).style('stroke', _this.state.lineColor); // Style Break Point Items

      chart.selectAll('.break-point-label').style(_this.state.styles.breakPointLabel);
      chart.selectAll('.break-point-line').style(_this.state.styles.breakPointLine); // Style Hovered Data Point Items

      chart.selectAll('.hovered-data-point-line').style(_this.state.styles.verticalLine);
      chart.selectAll('.hovered-data-point-date').style(_this.state.styles.dateTooltip);
      chart.selectAll('.hovered-data-point-date-text').style(_this.state.styles.dateTooltipText); // Style rest of chart elements

      chart.selectAll('text').style(_this.state.styles.text);
      chart.selectAll('.domain').style(_this.state.styles.domain);
      chart.selectAll('.y-grid-line .tick').style('stroke', _this.state.theme.Colors.GRAY_300);
      chart.select('text.zero-line-label').style(_this.state.styles.zeroLineLabel);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderHoveredDataPointDetails", function () {
      if (_this.props.hoveredDataPointDetails && _this.state.hoveredDataPoint) {
        return _this.props.hoveredDataPointDetails.map(function (item, index) {
          var value = _this.state.hoveredDataPoint[item.key];
          return React.createElement("div", {
            key: 'details-' + index,
            style: _this.state.styles.hoveredDataPointDetail
          }, React.createElement("div", {
            style: _this.state.styles.hoveredDataPointLabel
          }, item.label), React.createElement("div", {
            style: _this.state.styles.hoveredDataPointValue
          }, value || value === 0 ? _this._getFormattedValue(value, item.type, item.format) : 'N/A'));
        });
      } else {
        return null;
      }
    });

    var theme = StyleUtils.mergeTheme(props.theme);
    var styles = getStyles(theme);
    var margin = styles.chartMargins;
    var lineColor = theme.Colors.PRIMARY;
    var _this$props2 = _this.props,
        height = _this$props2.height,
        width = _this$props2.width;
    var adjustedWidth = width - margin.right - margin.left;
    var adjustedHeight = height - margin.top - margin.bottom;
    _this.state = {
      adjustedHeight: adjustedHeight,
      adjustedWidth: adjustedWidth,
      lineColor: lineColor,
      margin: margin,
      styles: styles,
      theme: theme
    };
    return _this;
  }

  _createClass(TimeBasedLineChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._styleChart();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.height !== null || newProps.width !== null || newProps.margin !== null) {
        var height = newProps.height || this.props.height;
        var width = newProps.width || this.props.width;
        var margin = newProps.margin || this.state.margin;
        var adjustedWidth = width - margin.right - margin.left;
        var adjustedHeight = height - margin.top - margin.bottom;
        this.setState({
          adjustedHeight: adjustedHeight,
          adjustedWidth: adjustedWidth,
          margin: margin
        });
      }

      if (!_isEqual(newProps.theme, this.props.theme)) {
        var theme = StyleUtils.mergeTheme(this.props.theme);
        var styles = styles(theme);
        this.setState({
          styles: styles,
          theme: theme
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._styleChart();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          getBreakPointDate = _this$props3.getBreakPointDate,
          breakPointLabel = _this$props3.breakPointLabel,
          data = _this$props3.data,
          height = _this$props3.height,
          rangeType = _this$props3.rangeType,
          shadeBelowZero = _this$props3.shadeBelowZero,
          shadeFutureOnGraph = _this$props3.shadeFutureOnGraph,
          showBreakPoint = _this$props3.showBreakPoint,
          showZeroLine = _this$props3.showZeroLine,
          width = _this$props3.width,
          zeroState = _this$props3.zeroState,
          yAxisFormatter = _this$props3.yAxisFormatter;
      var _this$state = this.state,
          adjustedHeight = _this$state.adjustedHeight,
          adjustedWidth = _this$state.adjustedWidth,
          hoveredDataPoint = _this$state.hoveredDataPoint,
          lineColor = _this$state.lineColor,
          margin = _this$state.margin;
      return React.createElement("div", {
        className: "mx-time-based-line-chart",
        style: _extends({}, this.state.styles.component, {
          height: height,
          width: width
        })
      }, data.length ? React.createElement("div", null, React.createElement("svg", {
        height: height,
        onMouseLeave: this._handleChartMouseLeave,
        ref: function ref(_ref) {
          return _this2.chart = _ref;
        },
        width: width
      }, shadeFutureOnGraph ? React.createElement(ShadedHatchPatternRectangleGroup, {
        height: adjustedHeight,
        theme: this.state.theme,
        translation: this._getLineTranslation(),
        width: this._getShadedRectangleWidth(),
        x: this._getShadedRectangleXValue(),
        y: 0
      }) : null, shadeBelowZero ? React.createElement(ShadedAreaRectangleGroup, {
        fillColor: this.state.theme.Colors.DANGER,
        height: this._getShadedRectangleHeight(),
        theme: this.state.theme,
        translation: this._getLineTranslation(),
        width: adjustedWidth,
        x: 0,
        y: this._getShadedRectangleYValue()
      }) : null, React.createElement(AxisGroup, {
        axis: "y",
        axisFormatFunction: yAxisFormatter,
        data: data,
        orientation: "left",
        scaleFunction: this._getYScaleFunction,
        translation: this._getYAxisTranslation()
      }), React.createElement(GridLinesGroup, {
        axis: "y",
        data: data,
        orientation: "left",
        scaleFunction: this._getYScaleFunction,
        tickSize: adjustedWidth * -1,
        translation: this._getYAxisTranslation()
      }), React.createElement(TimeXAxisGroup, {
        ticks: data.filter(function (datum, index) {
          return index % Math.ceil(data.length / 10) === 0;
        }).map(function (datum) {
          return moment.unix(datum.x).utc().unix();
        }),
        timeAxisFormat: rangeType === 'day' ? 'MMM D' : 'MMM',
        translation: this._getTimeAxisTranslation(),
        xScaleFunction: this._getXScaleFunction
      }), showBreakPoint ? React.createElement(BreakPointGroup, {
        adjustedHeight: adjustedHeight,
        adjustedWidth: adjustedWidth,
        breakPointDate: getBreakPointDate(),
        breakPointLabel: breakPointLabel,
        margin: margin,
        translation: this._getVerticalLineTranslation(),
        xScaleValueFunction: this._getXScaleValue
      }) : null, showZeroLine && this._yRangeContainsZero() ? React.createElement("g", {
        className: "zero-line"
      }, React.createElement(LineGroup, {
        adjustedHeight: adjustedHeight,
        dashLine: true,
        data: this._getZeroLineData(),
        lineColor: this.state.theme.Colors.DANGER,
        shouldAnimate: false,
        theme: this.state.theme,
        translation: this._getLineTranslation(),
        xScaleValueFunction: this._getXScaleValue,
        yScaleValueFunction: this._getYScaleValue
      }), React.createElement("text", {
        className: "zero-line-label",
        transform: this._getZeroLabelTranslation(),
        x: this._getZeroLabelXValue(),
        y: this._getZeroLabelYValue()
      }, "0")) : null, React.createElement(LineGroup, {
        adjustedHeight: adjustedHeight,
        data: data,
        lineColor: lineColor,
        theme: this.state.theme,
        translation: this._getLineTranslation(),
        xScaleValueFunction: this._getXScaleValue,
        yScaleValueFunction: this._getYScaleValue
      }), React.createElement(CirclesGroup, {
        adjustedHeight: adjustedHeight,
        data: this._getDataForLineCircles(),
        theme: this.state.theme,
        translation: this._getLineTranslation(),
        xScaleValueFunction: this._getXScaleValue,
        yScaleValueFunction: this._getYScaleValue
      }), hoveredDataPoint ? React.createElement(HoveredDataPointGroup, {
        adjustedHeight: adjustedHeight,
        hoveredDataPoint: hoveredDataPoint,
        rangeType: rangeType,
        translation: this._getLineTranslation(),
        xScaleValueFunction: this._getXScaleValue,
        yScaleValueFunction: this._getYScaleValue
      }) : null, React.createElement(SlicesGroup, {
        adjustedHeight: adjustedHeight,
        data: data,
        handleChartMouseOver: this._handleChartMouseOver,
        sliceWidth: this._getSliceWidth(),
        translation: this._getLineTranslation(),
        xScaleValueFunction: this._getXScaleValue
      })), React.createElement("div", {
        style: this.state.styles.hoveredDataPointDetails
      }, this._renderHoveredDataPointDetails())) : zeroState && zeroState || React.createElement("div", {
        style: this.state.styles.zeroState
      }, "No Data Found"));
    }
  }]);

  return TimeBasedLineChart;
}(React.Component);

_defineProperty(TimeBasedLineChart, "propTypes", {
  breakPointLabel: PropTypes.string,
  data: PropTypes.array.isRequired,
  getBreakPointDate: PropTypes.func,
  height: PropTypes.number,
  hoveredDataPointDetails: PropTypes.array,
  limitLineCircles: PropTypes.bool,
  lineColor: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: 75
  }),
  rangeType: PropTypes.oneOf(['day', 'month']),
  shadeBelowZero: PropTypes.bool,
  shadeFutureOnGraph: PropTypes.bool,
  showBreakPoint: PropTypes.bool,
  showZeroLine: PropTypes.bool,
  theme: themeShape,
  width: PropTypes.number,
  yAxisFormatter: PropTypes.func,
  zeroState: PropTypes.node
});

_defineProperty(TimeBasedLineChart, "defaultProps", {
  getBreakPointDate: function getBreakPointDate() {
    return moment().startOf('day').unix();
  },
  breakPointLabel: 'Today',
  height: 400,
  limitLineCircles: false,
  rangeType: 'day',
  shadeBelowZero: false,
  shadeFutureOnGraph: true,
  showBreakPoint: true,
  showZeroLine: false,
  width: 550,
  yAxisFormatter: function yAxisFormatter(d) {
    return numeral(d).format('0.0a');
  }
});

module.exports = (0, _Theme.withTheme)(Radium(TimeBasedLineChart));