const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

const d3 = require('d3');
const moment = require('moment');
const numeral = require('numeral');
const _isEqual = require('lodash/isEqual');

const BreakPointGroup = require('./d3/BreakPointGroup');
const GridLinesGroup = require('./d3/GridLinesGroup');
const CirclesGroup = require('./d3/CirclesGroup');
const LineGroup = require('./d3/LineGroup');
const ShadedAreaRectangleGroup = require('./d3/ShadedAreaRectangleGroup');
const ShadedHatchPatternRectangleGroup = require('./d3/ShadedHatchPatternRectangleGroup');
const SlicesGroup = require('./d3/SlicesGroup');
const TimeXAxisGroup = require('./d3/TimeXAxisGroup');
const AxisGroup = require('./d3/AxisGroup');

const { themeShape } = require('../constants/App');

const ChartUtils = require('../utils/Chart');
const StyleUtils = require('../utils/Style');

const getStyles = (theme) => {
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

class HoveredDataPointGroup extends React.Component {
  static propTypes = {
    adjustedHeight: PropTypes.number.isRequired,
    hoveredDataPoint: PropTypes.object.isRequired,
    rangeType: PropTypes.string.isRequired,
    translation: PropTypes.string,
    xScaleValueFunction: PropTypes.func.isRequired,
    yScaleValueFunction: PropTypes.func.isRequired
  };

  static defaultProps = {
    translation: 'translate(0,0)'
  };

  render () {
    const { adjustedHeight, hoveredDataPoint, rangeType, translation, xScaleValueFunction, yScaleValueFunction } = this.props;
    const hoveredDataPointXScaleValue = xScaleValueFunction(hoveredDataPoint.x);
    const hoveredDataPointYScaleValue = yScaleValueFunction(hoveredDataPoint.y);
    const dateRectangleHeight = 30;
    const dateRectangleWidth = 60;
    const dateRectangleMiddle = dateRectangleWidth / 2;
    const dateTextOffset = 20;

    return (
      <g className='hover-state'>
        <g className='hover-state-line' transform={translation}>
          <line
            className='hovered-data-point-line'
            x1={hoveredDataPointXScaleValue}
            x2={hoveredDataPointXScaleValue}
            y1={adjustedHeight}
            y2={hoveredDataPointYScaleValue}
          />
        </g>
        <g className='hover-state-date-rect' transform={translation}>
          <rect
            className='hovered-data-point-date'
            height={dateRectangleHeight}
            width={dateRectangleWidth}
            x={hoveredDataPointXScaleValue - dateRectangleMiddle}
            y={adjustedHeight}
          />
        </g>
        <g className='hover-state-circle' transform={translation}>
          <circle
            className='circle'
            cx={xScaleValueFunction(hoveredDataPoint.x)}
            cy={yScaleValueFunction(hoveredDataPoint.y)}
            r={5}
          />
        </g>
        <g className='hover-state-date-text' transform={translation}>
          <text
            className='hovered-data-point-date-text'
            x={hoveredDataPointXScaleValue - dateTextOffset}
            y={adjustedHeight + dateTextOffset}
          >
            {moment.unix(hoveredDataPoint.x).format(rangeType === 'day' ? 'MMM DD' : 'MMM')}
          </text>
        </g>
      </g>
    );
  }
}

// Main Component
class TimeBasedLineChart extends React.Component {
  static propTypes = {
    breakPointDate: PropTypes.number,
    breakPointLabel: PropTypes.string,
    data: PropTypes.array.isRequired,
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
  };

  static defaultProps = {
    breakPointDate: moment().startOf('day').unix(),
    breakPointLabel: 'Today',
    height: 400,
    limitLineCircles: false,
    rangeType: 'day',
    shadeBelowZero: false,
    shadeFutureOnGraph: true,
    showBreakPoint: true,
    showZeroLine: false,
    width: 550,
    yAxisFormatter (d) {
      return numeral(d).format('0.0a');
    }
  };

  constructor (props) {
    super(props);

    const theme = StyleUtils.mergeTheme(props.theme);
    const styles = getStyles(theme);
    const margin = styles.chartMargins;
    const lineColor = theme.Colors.PRIMARY;
    const { height, width } = this.props;
    const adjustedWidth = width - margin.right - margin.left;
    const adjustedHeight = height - margin.top - margin.bottom;

    this.state = {
      adjustedHeight,
      adjustedWidth,
      lineColor,
      margin,
      styles,
      theme
    };
  }

  componentDidMount () {
    this._styleChart();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.height !== null || newProps.width !== null || newProps.margin !== null) {
      const height = newProps.height || this.props.height;
      const width = newProps.width || this.props.width;
      const margin = newProps.margin || this.state.margin;

      const adjustedWidth = width - margin.right - margin.left;
      const adjustedHeight = height - margin.top - margin.bottom;

      this.setState({ adjustedHeight, adjustedWidth });
    }

    if (!_isEqual(newProps.theme, this.props.theme)) {
      const theme = StyleUtils.mergeTheme(props.theme);
      const styles = styles(theme);

      this.setState({ styles, theme });
    }
  }

  componentDidUpdate () {
    this._styleChart();
  }

  _yRangeContainsZero = () => {
    const max = d3.max(this.props.data, d => d.y);
    const min = d3.min(this.props.data, d => d.y);
    const tickSpec = ChartUtils.getAxisTickSpecification(min, max);

    return tickSpec.min <= 0 && tickSpec.max >= 0;
  };

  // Handle functions
  _handleChartMouseLeave = () => {
    this.setState({
      hoveredDataPoint: null
    });
  };

  _handleChartMouseOver = (hoveredDataPoint) => {
    this.setState({
      hoveredDataPoint
    });
  };

  // Helper Functions
  _getDataForLineCircles = () => {
    if (this.props.limitLineCircles) {
      return this.props.data.filter((dataPoint, index) => {
        return index === 0 || index === this.props.data.length - 1 || dataPoint.x === this.props.breakPointDate;
      });
    }

    return this.props.data;
  };

  _getFormattedValue = (value, type, format) => {
    let formattedValue = '';

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

  // Translation Helpers
  _getLineTranslation = () => {
    return 'translate(' + this.state.margin.left + ', 10)';
  };

  _getZeroLabelTranslation = () => {
    return 'translate(' + this.state.margin.left + ', 14)';
  };

  _getTimeAxisTranslation = () => {
    const offSet = 10;
    const x = this.state.margin.left;
    const y = this.props.height - this.state.margin.bottom - offSet;

    return 'translate(' + x + ',' + y + ')';
  };

  _getVerticalLineTranslation = () => {
    return 'translate(' + this.state.margin.left + ', -10)';
  };

  _getYAxisTranslation = () => {
    const offSet = 10;
    const y = this.state.margin.top - offSet;

    return 'translate(' + this.state.margin.left + ',' + y + ')';
  };

  // Position Helpers
  _getSliceWidth = () => {
    return Math.floor(this.state.adjustedWidth / this.props.data.length);
  };

  _getXScaleFunction = () => {
    const maxDate = this.props.data[this.props.data.length - 1].x;
    const minDate = this.props.data[0].x;

    return d3.time.scale()
      .range([0, this.state.adjustedWidth])
      .domain([minDate, maxDate]);
  };

  _getXScaleValue = (value) => {
    const xScale = this._getXScaleFunction();

    return xScale(value);
  };

  _getYScaleFunction = () => {
    const max = d3.max(this.props.data, d => d.y);
    const min = d3.min(this.props.data, d => d.y);
    const tickSpec = ChartUtils.getAxisTickSpecification(min, max);

    return d3.scale.linear()
      .range([this.state.adjustedHeight, 0])
      .domain([tickSpec.min, tickSpec.max]);
  };

  _getYScaleValue = (value) => {
    const yScale = this._getYScaleFunction();

    return yScale(value);
  };

  _getShadedRectangleHeight = () => {
    const calculatedHeight = this.state.adjustedHeight - this._getShadedRectangleYValue();

    return calculatedHeight < 0 ? 0 : calculatedHeight;
  };

  _getShadedRectangleWidth = () => {
    const calculatedWidth = this.state.adjustedWidth - this._getShadedRectangleXValue();

    return calculatedWidth < 0 ? 0 : calculatedWidth;
  };

  _getShadedRectangleXValue = () => {
    const breakPointXValue = this._getXScaleValue(this.props.breakPointDate);

    return breakPointXValue < 0 ? 0 : breakPointXValue;
  };

  _getShadedRectangleYValue = () => {
    return this._getYScaleValue(0);
  };

  _getZeroLabelXValue = () => {
    const data = this.props.data;
    const maxDate = data.length ? data[data.length - 1].x : 0;
    const offSet = 15;

    return this._getXScaleValue(maxDate + this.state.margin.right) + offSet;
  };

  _getZeroLabelYValue = () => {
    return this._getYScaleValue(0);
  };

  _getZeroLineData = () => {
    const data = this.props.data;
    const maxDate = data.length ? data[data.length - 1].x : 0;
    const minDate = data.length ? data[0].x : 0;

    return [{ x: minDate, y: 0 }, { x: maxDate, y: 0 }];
  };

  _styleChart = () => {
    const chart = d3.select(this.chart);

    // Style x axis labels
    chart.select('g.time-axis').selectAll('text')
      .attr('y', 12)
      .style(this.state.styles.xAxisLabel)
      .style('text-anchor', 'middle');

    // Style x axis ticks
    chart.select('g.time-axis').selectAll('line')
      .style({ stroke: this.state.theme.Colors.GRAY_300 });

    // Style y axis labels
    chart.select('g.y-axis').selectAll('text')
      .style(this.state.styles.yAxisLabel)
      .style('fill', this.state.theme.Colors.GRAY_500)
      .attr('transform', 'translate(-10,0)');

    // Style y axis ticks
    chart.select('g.y-axis').selectAll('line')
      .style('stroke', this.state.theme.Colors.GRAY_300);

    // Style Circles
    chart.selectAll('.circle')
      .style(this.state.styles.circle)
      .style('stroke', this.state.lineColor);

    // Style Break Point Items
    chart.selectAll('.break-point-label')
      .style(this.state.styles.breakPointLabel);

    chart.selectAll('.break-point-line')
      .style(this.state.styles.breakPointLine);

    // Style Hovered Data Point Items
    chart.selectAll('.hovered-data-point-line')
      .style(this.state.styles.verticalLine);

    chart.selectAll('.hovered-data-point-date')
      .style(this.state.styles.dateTooltip);

    chart.selectAll('.hovered-data-point-date-text')
      .style(this.state.styles.dateTooltipText);

    // Style rest of chart elements
    chart.selectAll('text')
      .style(this.state.styles.text);

    chart.selectAll('.domain')
      .style(this.state.styles.domain);

    chart.selectAll('.y-grid-line .tick')
      .style('stroke', this.state.theme.Colors.GRAY_300);

    chart.select('text.zero-line-label')
      .style(this.state.styles.zeroLineLabel);
  };

  // Render functions
  _renderHoveredDataPointDetails = () => {
    if (this.props.hoveredDataPointDetails && this.state.hoveredDataPoint) {
      return this.props.hoveredDataPointDetails.map((item, index) => {
        const value = this.state.hoveredDataPoint[item.key];

        return (
          <div key={'details-' + index} style={this.state.styles.hoveredDataPointDetail}>
            <div style={this.state.styles.hoveredDataPointLabel}>
              {item.label}
            </div>
            <div style={this.state.styles.hoveredDataPointValue}>
              {value || value === 0 ? this._getFormattedValue(value, item.type, item.format) : 'N/A'}
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  render () {
    const { breakPointDate, breakPointLabel, data, height, rangeType, shadeBelowZero, shadeFutureOnGraph, showBreakPoint, showZeroLine, width, zeroState, yAxisFormatter } = this.props;
    const { adjustedHeight, adjustedWidth, hoveredDataPoint, lineColor, margin } = this.state;

    return (
      <div className='mx-time-based-line-chart' style={Object.assign({}, this.state.styles.component, { height, width })}>
        {data.length ? (
          <div>
            <svg
              height={height}
              onMouseLeave={this._handleChartMouseLeave}
              ref={(ref) => this.chart = ref}
              width={width}
            >
              {shadeFutureOnGraph ? (
                <ShadedHatchPatternRectangleGroup
                  height={adjustedHeight}
                  translation={this._getLineTranslation()}
                  width={this._getShadedRectangleWidth()}
                  x={this._getShadedRectangleXValue()}
                  y={0}
                />
              ) : null}
              {shadeBelowZero ? (
                <ShadedAreaRectangleGroup
                  fillColor={this.state.theme.Colors.DANGER}
                  height={this._getShadedRectangleHeight()}
                  translation={this._getLineTranslation()}
                  width={adjustedWidth}
                  x={0}
                  y={this._getShadedRectangleYValue()}
                />
              ) : null}
              <AxisGroup
                axis='y'
                axisFormatFunction={yAxisFormatter}
                data={data}
                orientation='left'
                scaleFunction={this._getYScaleFunction}
                translation={this._getYAxisTranslation()}
              />
              <GridLinesGroup
                axis='y'
                data={data}
                orientation='left'
                scaleFunction={this._getYScaleFunction}
                tickSize={adjustedWidth * -1}
                translation={this._getYAxisTranslation()}
              />
              <TimeXAxisGroup
                ticks={
                  data.filter((datum, index) => {
                    const isMonthRangeType = this.props.rangeType === 'month';

                    return isMonthRangeType || index % 3 === 0;
                  })
                  .map(datum => {
                    return moment.unix(datum.x).utc().unix();
                  })
                }
                timeAxisFormat={rangeType === 'day' ? 'MMM D' : 'MMM'}
                translation={this._getTimeAxisTranslation()}
                xScaleFunction={this._getXScaleFunction}
              />
              {showBreakPoint ? (
                <BreakPointGroup
                  adjustedHeight={adjustedHeight}
                  adjustedWidth={adjustedWidth}
                  breakPointDate={breakPointDate}
                  breakPointLabel={breakPointLabel}
                  margin={margin}
                  translation={this._getVerticalLineTranslation()}
                  xScaleValueFunction={this._getXScaleValue}
                />
              ) : null}
              {showZeroLine && this._yRangeContainsZero() ? (
                <g className='zero-line'>
                  <LineGroup
                    adjustedHeight={adjustedHeight}
                    dashLine={true}
                    data={this._getZeroLineData()}
                    lineColor={this.state.theme.Colors.DANGER}
                    shouldAnimate={false}
                    translation={this._getLineTranslation()}
                    xScaleValueFunction={this._getXScaleValue}
                    yScaleValueFunction={this._getYScaleValue}
                  />
                  <text
                    className='zero-line-label'
                    transform={this._getZeroLabelTranslation()}
                    x={this._getZeroLabelXValue()}
                    y={this._getZeroLabelYValue()}
                  >
                    0
                  </text>
                </g>
              ) : null}
              <LineGroup
                adjustedHeight={adjustedHeight}
                data={data}
                lineColor={lineColor}
                translation={this._getLineTranslation()}
                xScaleValueFunction={this._getXScaleValue}
                yScaleValueFunction={this._getYScaleValue}
              />
              <CirclesGroup
                adjustedHeight={adjustedHeight}
                data={this._getDataForLineCircles()}
                translation={this._getLineTranslation()}
                xScaleValueFunction={this._getXScaleValue}
                yScaleValueFunction={this._getYScaleValue}
              />
              {hoveredDataPoint ? (
                <HoveredDataPointGroup
                  adjustedHeight={adjustedHeight}
                  hoveredDataPoint={hoveredDataPoint}
                  rangeType={rangeType}
                  translation={this._getLineTranslation()}
                  xScaleValueFunction={this._getXScaleValue}
                  yScaleValueFunction={this._getYScaleValue}
                />
              ) : null}
              <SlicesGroup
                adjustedHeight={adjustedHeight}
                data={data}
                handleChartMouseOver={this._handleChartMouseOver}
                sliceWidth={this._getSliceWidth()}
                translation={this._getLineTranslation()}
                xScaleValueFunction={this._getXScaleValue}
              />
            </svg>
            <div style={this.state.styles.hoveredDataPointDetails}>
              {this._renderHoveredDataPointDetails()}
            </div>
          </div>
         ) : (
           zeroState && zeroState ||
             <div style={this.state.styles.zeroState}>No Data Found</div>
         )}
      </div>
    );
  }
}

module.exports = Radium(TimeBasedLineChart);
