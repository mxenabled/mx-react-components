const React = require('react');
const Radium = require('radium');

const d3 = require('d3');
const moment = require('moment');
const numeral = require('numeral');

const BreakPointGroup = require('./d3/BreakPointGroup');
const GridLinesGroup = require('./d3/GridLinesGroup');
const CirclesGroup = require('./d3/CirclesGroup');
const LineGroup = require('./d3/LineGroup');
const ShadedRectangleGroup = require('./d3/ShadedRectangleGroup');
const SlicesGroup = require('./d3/SlicesGroup');
const TimeXAxisGroup = require('./d3/TimeXAxisGroup');
const AxisGroup = require('./d3/AxisGroup');

const StyleConstants = require('../constants/Style');

const ChartUtils = require('../utils/Chart');

const styles = {
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

const HoveredDataPointGroup = React.createClass({
  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    hoveredDataPoint: React.PropTypes.object.isRequired,
    rangeType: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      translation: 'translate(0,0)'
    };
  },

  render () {
    return (
      <g className='hover-state' ref='hoverState'>
        <g className='hover-state-line' ref='hoverStateLine' transform={this.props.translation}>
          <line
            className='hovered-data-point-line'
            x1={this.props.xScaleValueFunction(this.props.hoveredDataPoint.x)}
            x2={this.props.xScaleValueFunction(this.props.hoveredDataPoint.x)}
            y1={this.props.adjustedHeight}
            y2={this.props.yScaleValueFunction(this.props.hoveredDataPoint.y)}
          />
        </g>
        <g className='hover-state-date-rect' ref='hoverStateDateRect' transform={this.props.translation}>
          <rect
            className='hovered-data-point-date'
            height={30}
            width={60}
            x={this.props.xScaleValueFunction(this.props.hoveredDataPoint.x) - 30}
            y={this.props.adjustedHeight}
          />
        </g>
        <g className='hover-state-circle' ref='hoverStateCircle' transform={this.props.translation}>
          <circle
            className='circle'
            cx={this.props.xScaleValueFunction(this.props.hoveredDataPoint.x)}
            cy={this.props.yScaleValueFunction(this.props.hoveredDataPoint.y)}
            r={5}
          />
        </g>
        <g className='hover-state-date-text' ref='hoverStateDateText' transform={this.props.translation}>
          <text
            className='hovered-data-point-date-text'
            x={this.props.xScaleValueFunction(this.props.hoveredDataPoint.x) - 20}
            y={this.props.adjustedHeight + 20}
          >
            {moment.unix(this.props.hoveredDataPoint.x).format(this.props.rangeType === 'day' ? 'MMM DD' : 'MMM')}
          </text>
        </g>
      </g>
    );
  }
});

// Main Component
const TimeBasedLineChart = React.createClass({
  propTypes: {
    areaBelowZeroColor: React.PropTypes.string,
    breakPointDate: React.PropTypes.number,
    breakPointLabel: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    hoveredDataPointDetails: React.PropTypes.array,
    lineColor: React.PropTypes.string,
    margin: React.PropTypes.object,
    rangeType: React.PropTypes.oneOf(['day', 'month']),
    shadeFutureOnGraph: React.PropTypes.bool,
    showBreakPoint: React.PropTypes.bool,
    width: React.PropTypes.number,
    yAxisFormatter: React.PropTypes.func,
    zeroState: React.PropTypes.node
  },

  getDefaultProps () {
    return {
      areaBelowZeroColor: StyleConstants.Colors.STRAWBERRY,
      breakPointDate: moment().startOf('day').unix(),
      breakPointLabel: 'Today',
      height: 400,
      lineColor: StyleConstants.Colors.PRIMARY,
      margin: { top: 20, right: 20, bottom: 20, left: 75 },
      rangeType: 'day',
      shadeFutureOnGraph: true,
      showBreakPoint: true,
      width: 550,
      yAxisFormatter (d) {
        return numeral(d).format('0.0a');
      },
      zeroState: <div style={styles.zeroState}>No Data Found</div>
    };
  },

  getInitialState () {
    const adjustedWidth = this.props.width - this.props.margin.right - this.props.margin.left;
    const adjustedHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    return {
      adjustedHeight,
      adjustedWidth
    };
  },

  componentDidMount () {
    this._styleChart();
  },

  componentWillReceiveProps (newProps) {
    if (newProps.height !== null || newProps.width !== null || newProps.margin !== null) {
      const height = newProps.height || this.props.height;
      const width = newProps.width || this.props.width;
      const margin = newProps.margin || this.props.margin;

      const adjustedWidth = width - margin.right - margin.left;
      const adjustedHeight = height - margin.top - margin.bottom;

      this.setState({
        adjustedHeight,
        adjustedWidth
      });
    }
  },

  componentDidUpdate () {
    this._styleChart();
  },

  // Handle functions
  _handleChartMouseLeave () {
    this.setState({
      hoveredDataPoint: null
    });
  },

  _handleChartMouseOver (hoveredDataPoint) {
    this.setState({
      hoveredDataPoint
    });
  },

  // Helper Functions
  _getFormatedValue (value, type, format) {
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
  },

  // Translation Helpers
  _getLineTranslation () {
    return 'translate(' + this.props.margin.left + ', 10)';
  },

  _getTimeAxisTranslation () {
    const offSet = 10;
    const x = this.props.margin.left - offSet;
    const y = this.props.height - this.props.margin.bottom - offSet;

    return 'translate(' + x + ',' + y + ')';
  },

  _getVerticalLineTranslation () {
    return 'translate(' + this.props.margin.left + ', -10)';
  },

  _getYAxisTranslation () {
    const offSet = 10;
    const y = this.props.margin.top - offSet;

    return 'translate(' + this.props.margin.left + ',' + y + ')';
  },

  // Position Helpers
  _getSliceWidth () {
    return Math.floor(this.state.adjustedWidth / this.props.data.length);
  },

  _getXScaleFunction () {
    const maxDate = this.props.data[this.props.data.length - 1].x;
    const minDate = this.props.data[0].x;
    const offSet = 10;

    return d3.time.scale()
      .range([0, this.state.adjustedWidth - offSet])
      .domain([minDate, maxDate]);
  },

  _getXScaleValue (value) {
    const xScale = this._getXScaleFunction();

    return xScale(value);
  },

  _getYScaleFunction () {
    const minMaxValues = ChartUtils.getDataMinMaxValues(this.props.data, 'y');

    return d3.scale.linear()
      .range([this.state.adjustedHeight, 0])
      .domain([minMaxValues.min, minMaxValues.max]);
  },

  _getYScaleValue (value) {
    const yScale = this._getYScaleFunction();

    return yScale(value);
  },

  _getShadedRectangleWidth () {
    const calculatedWidth = this.state.adjustedWidth - this._getShadedRectangleXValue();

    return calculatedWidth < 0 ? 0 : calculatedWidth;
  },

  _getShadedRectangleXValue () {
    const breakPointXValue = this._getXScaleValue(this.props.breakPointDate);

    return breakPointXValue < 0 ? 0 : breakPointXValue;
  },

  _styleChart () {
    const chart = d3.select(this.refs.chart);

    // Style x axis labels
    chart.select('g.time-axis').selectAll('text')
      .attr('y', 12)
      .style(styles.xAxisLabel)
      .style('text-anchor', () => {
        return this.props.rangeType === 'day' ? 'middle' : 'start';
      });

    // Style x axis ticks
    chart.select('g.time-axis').selectAll('line')
      .style({ stroke: StyleConstants.Colors.FOG });

    // Style y axis labels
    chart.select('g.y-axis').selectAll('text')
      .style(styles.yAxisLabel)
      .style('fill', d => {
        return d === 0 ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH;
      })
      .attr('transform', 'translate(-10,0)');

    // Style y axis ticks
    chart.select('g.y-axis').selectAll('line')
      .style('stroke', d => {
        return d === 0 ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.FOG;
      });

    // Style Circles
    chart.selectAll('.circle')
      .style(styles.circle)
      .style('stroke', this.props.lineColor);

    // Style Break Point Items
    chart.selectAll('.break-point-label')
      .style(styles.breakPointLabel);

    chart.selectAll('.break-point-line')
      .style(styles.breakPointLine);

    // Style Hovered Data Point Items
    chart.selectAll('.hovered-data-point-line')
      .style(styles.verticalLine);

    chart.selectAll('.hovered-data-point-date')
      .style(styles.dateTooltip);

    chart.selectAll('.hovered-data-point-date-text')
      .style(styles.dateTooltipText);

    // Style rest of chart elements
    chart.selectAll('text').style(styles.text);
    chart.selectAll('.domain').style(styles.domain);
    chart.selectAll('.y-grid-line .tick').style('stroke', d => {
      return d === 0 ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.FOG;
    })
    .style('stroke-dasharray', d => {
      return d === 0 ? 'none' : '4,4';
    });
  },

  // Render functions
  _renderHoveredDataPointDetails () {
    if (this.props.hoveredDataPointDetails && this.state.hoveredDataPoint) {
      return this.props.hoveredDataPointDetails.map((item, index) => {
        const value = this.state.hoveredDataPoint[item.key];

        return (
          <div key={'details-' + index} style={styles.hoveredDataPointDetail}>
            <div style={styles.hoveredDataPointLabel}>
              {item.label}
            </div>
            <div style={styles.hoveredDataPointValue}>
              {value || value === 0 ? this._getFormatedValue(value, item.type, item.format) : 'N/A'}
            </div>
          </div>
        );
      });
    }
  },

  render () {
    return (
      <div className='mx-time-based-line-chart' style={[styles.component, { height: this.props.height + 'px', width: this.props.width + 'px' }]}>
        {this.props.data.length ? (
          <div>
            <svg
              height={this.props.height}
              onMouseLeave={this._handleChartMouseLeave}
              ref='chart'
              width={this.props.width}
            >
              {this.props.shadeFutureOnGraph ? (
                <ShadedRectangleGroup
                  height={this.state.adjustedHeight}
                  translation={this._getLineTranslation()}
                  width={this._getShadedRectangleWidth()}
                  x={this._getShadedRectangleXValue()}
                  y={0}
                />
              ) : null}
              <AxisGroup
                axis='y'
                axisFormatFunction={this.props.yAxisFormatter}
                data={this.props.data}
                orientation='left'
                scaleFunction={this._getYScaleFunction}
                translation={this._getYAxisTranslation()}
              />
              <GridLinesGroup
                axis='y'
                data={this.props.data}
                orientation='left'
                scaleFunction={this._getYScaleFunction}
                tickSize={this.state.adjustedWidth * -1}
                translation={this._getYAxisTranslation()}
              />
              <TimeXAxisGroup
                data={this.props.data}
                timeAxisFormat={this.props.rangeType === 'day' ? 'MMM D' : 'MMM'}
                translation={this._getTimeAxisTranslation()}
                xScaleFunction={this._getXScaleFunction}
              />
              {this.props.showBreakPoint ? (
                <BreakPointGroup
                  adjustedHeight={this.state.adjustedHeight}
                  breakPointDate={this.props.breakPointDate}
                  breakPointLabel={this.props.breakPointLabel}
                  margin={this.props.margin}
                  translation={this._getVerticalLineTranslation()}
                  xScaleValueFunction={this._getXScaleValue}
                />
              ) : null}
              <LineGroup
                adjustedHeight={this.state.adjustedHeight}
                data={this.props.data}
                lineColor={this.props.lineColor}
                translation={this._getLineTranslation()}
                xScaleValueFunction={this._getXScaleValue}
                yScaleValueFunction={this._getYScaleValue}
              />
              <CirclesGroup
                adjustedHeight={this.state.adjustedHeight}
                data={this.props.data}
                translation={this._getLineTranslation()}
                xScaleValueFunction={this._getXScaleValue}
                yScaleValueFunction={this._getYScaleValue}
              />
              {this.state.hoveredDataPoint ? (
                <HoveredDataPointGroup
                  adjustedHeight={this.state.adjustedHeight}
                  hoveredDataPoint={this.state.hoveredDataPoint}
                  rangeType={this.props.rangeType}
                  translation={this._getLineTranslation()}
                  xScaleValueFunction={this._getXScaleValue}
                  yScaleValueFunction={this._getYScaleValue}
                />
              ) : null}
              <SlicesGroup
                adjustedHeight={this.state.adjustedHeight}
                data={this.props.data}
                handleChartMouseOver={this._handleChartMouseOver}
                sliceWidth={this._getSliceWidth()}
                translation={this._getLineTranslation()}
                xScaleValueFunction={this._getXScaleValue}
              />
            </svg>
            <div style={styles.hoveredDataPointDetails}>
              {this._renderHoveredDataPointDetails()}
            </div>
          </div>
        ) : this.props.zeroState }
      </div>
    );
  }
});

module.exports = Radium(TimeBasedLineChart);