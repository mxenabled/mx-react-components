const React = require('react');
const ReactDom = require('react-dom');
const Radium = require('radium');

const d3 = require('d3');
const { isEqual } = require('lodash');
const moment = require('moment');
const numeral = require('numeral');

const StyleConstants = require('../constants/Style');

const styles = {
  // Component
  component: {
    fontFamily: StyleConstants.FontFamily,
    position: 'relative',
    boxSizing: 'content-box',
    display: 'inline-block'
  },

  // Chart
  breakPointLine: {
    fill: 'none',
    stroke: StyleConstants.Colors.FOG,
    strokeWidth: 1,
  },
  circle: {
    fill: StyleConstants.Colors.WHITE,
    strokeWidth: 2
  },
  dateTooltip: {
    borderRadius: 2,
    fill: StyleConstants.Colors.CHARCOAL,
    stroke: 'none'
  },
  dateTooltipText: {
    fill: StyleConstants.Colors.FOG,
    stroke: 'none',
    fontFamily: StyleConstants.Fonts.REGULAR,
    fontSize: StyleConstants.FontSizes.MEDIUM
  },
  domain: {
    opacity: 0
  },
  verticalLine: {
    fill: 'none',
    stroke: StyleConstants.Colors.ASH,
    strokeWidth: 1,
  },
  xAxisLabel: {
    fill: StyleConstants.Colors.ASH,
    stroke: 'none'
  },
  yAxisLabel: {
    stroke: 'none',
    textAnchor: 'start'
  },

  // Hovered Data Point
  hoveredDataPointDetail: {
    boxSizing: 'border-box',
    display: 'inline-block',
    float: 'left',
    paddingLeft: 10
  },
  hoveredDataPointDetails: {
    padding: 20,
    width: '100%'
  },
  hoveredDataPointLabel: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.ASH,
    display: 'inline-block',
    fontFamily: StyleConstants.Fonts.LIGHT,
    fontSize: StyleConstants.FontSizes.LARGE,
    textAlign: 'left',
    width: 60
  },
  hoveredDataPointValue: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    display: 'inline-block',
    fontFamily: StyleConstants.Fonts.SEMIBOLD,
    fontSize: StyleConstants.FontSizes.LARGE,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 130
  },

  // Zero State
  zeroState: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Line
const Line = React.createClass({
  componentWillMount () {
    const line = d3.svg.line()
      .x(d => {
        const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

        return this.props.getXScaleValue(currentDate);
      })
      .y(d => {
        return this.props.getYScaleValue(d.value);
      });

    this.setState({
      line
    });
  },

  render () {
    return (
      <g className='chart-line' ref='chartLine' transform={this.props.translation}>
        <path
          d={this.state.line(this.props.data)}
          fill='none'
          stroke={this.props.lineColor}
          strokeWidth={2}
        />
      </g>
    );
  }
});

// Axis
const TimeAxis = React.createClass({
  componentWillMount () {
    const timeAxis = d3.svg.axis()
      .scale(this.props.xScaleFunction())
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .ticks(10);

    this.setState({
      timeAxis
    });
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    d3.select(this.refs.timeAxis).call(this.state.timeAxis);
  },

  render () {
    return <g className='x-axis' ref='timeAxis' style={{ fill: 'none', stroke: StyleConstants.Colors.CHARCOAL, strokeWidth: 1 }} transform={this.props.translation} />;
  }
});

const YAxis = React.createClass({
  componentWillMount () {
    const yAxis = d3.svg.axis()
      .scale(this.props.yScaleFunction())
      .orient('left')
      .tickFormat(this.props.yAxisFormat)
      .ticks(this.props.tickValues.length)
      .tickValues(this.props.tickValues);

    this.setState({
      yAxis
    });
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    d3.select(this.refs.yAxis).call(this.state.yAxis);
  },

  render () {
    return <g className='y-axis' ref='yAxis' transform={this.props.translation} />;
  }
});

const YGridLines = React.createClass({
  componentWillMount () {
    const yGridLines = d3.svg.axis()
      .scale(this.props.yScaleFunction())
      .orient('left')
      .tickSize(this.props.tickSize, 0, 0)
      .tickFormat('')
      .ticks(this.props.tickValues.length)
      .tickValues(this.props.tickValues);

    this.setState({
      yGridLines
    });
  },

  componentDidMount () {
    this._renderYGridLines();
  },

  componentDidUpdate () {
    this._renderYGridLines();
  },

  _renderYGridLines () {
    d3.select(this.refs.yGridLines).call(this.state.yGridLines);
  },

  render () {
    return <g className='grid-line' ref='yGridLines' transform={this.props.translation} />;
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
    hoveredDataPointDetails: React.PropTypes.array.isRequired,
    lineColor: React.PropTypes.string,
    margin: React.PropTypes.object,
    rangeType: React.PropTypes.oneOf(['day', 'month']),
    shadeAreaBelowZero: React.PropTypes.bool,
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
      shadeAreaBelowZero: false,
      showBreakPoint: true,
      width: 550,
      yAxisFormatter (d) {
        return numeral(d).format('0.00a');
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

  componentDidUpdate () {
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

  // Call backs
  _handleChartMouseOver (hoveredDataPoint) {
    this.setState({
      hoveredDataPoint
    });
  },

  // Translate positions via use of margins
  _getVerticalLineTranslation () {
    return 'translate(' + this.props.margin.left + ', -10)';
  },

  _getLineTranslation () {
    const x = this.props.margin.left;

    return 'translate(' + x + ', 10)';
  },

  _getTimeAxisTranslation () {
    const x = this.props.margin.left;
    const y = this.props.height - this.props.margin.bottom - 10;

    return 'translate(' + x + ',' + y + ')';
  },

  _getYAxisTranslation () {
    const x = this.props.margin.left;
    const y = this.props.margin.top - 10;

    return 'translate(' + x + ',' + y + ')';
  },

  //Parse Data
  _getDataMinMaxValues () {
    const max = d3.max(this.props.data, d => {
      return Math.ceil(d.value / 1000) * 1000;
    });

    let min = d3.min(this.props.data, d => {
      return Math.floor(d.value / 1000) * 1000;
    });

    return { min, max };
  },

  _getFormatedValue (value, type, format) {
    switch (type) {
      case 'date':
        return moment.unix(value).format(format);
        break;
      case 'number':
        return numeral(value).format(format);
        break;
      default:
        return value;
        break;
    }
  },

  // Alignment/Spacing Helpers
  _getSliceMiddle () {
    return this._getSliceWidth() / 2;
  },

  _getSliceWidth () {
    return Math.floor(this.state.adjustedWidth / this.props.data.length);
  },

  _getXScaleFunction () {
    let maxDate = this.props.data[this.props.data.length - 1].timeStamp;
    let minDate = this.props.data[0].timeStamp;

    maxDate = moment.unix(maxDate).endOf(this.props.rangeType).unix();
    minDate = moment.unix(minDate).startOf(this.props.rangeType).unix();

    return d3.time.scale()
      .range([0, this.state.adjustedWidth])
      .domain([minDate, maxDate]);
  },

  _getXScaleValue (value) {
    const xScale = this._getXScaleFunction();

    return xScale(value);
  },

  _getYScaleFunction () {
    const minMaxValues = this._getDataMinMaxValues();

    return d3.scale.linear()
      .range([this.state.adjustedHeight, 0])
      .domain([minMaxValues.min, minMaxValues.max]);
  },

  _getYScaleValue (value) {
    const yScale = this._getYScaleFunction();

    return yScale(value);
  },

  // Axis Ticks
  _getYAxisTickValues () {
    // Magic Voodoo from the interwebs. See link for more details
    // http://stackoverflow.com/questions/326679/choosing-an-attractive-linear-scale-for-a-graphs-y-axis
    // This ensures that the tick values are logical increments or steps.
    const minMaxValues = this._getDataMinMaxValues();
    const range = minMaxValues.max - minMaxValues.min;
    const tempStep = range / 6;
    const magnitude = Math.floor(Math.log10(tempStep));
    const magnitudePower = Math.pow(10, magnitude);
    const magnitudeMultiplier = parseInt(tempStep / magnitudePower + 0.5);
    const stepSize = magnitudeMultiplier * magnitudePower;

    const values = [];

    for (let min = minMaxValues.min; min <= minMaxValues.max; min += stepSize) {
      values.push(min);
    }

    return values;
  },

  // Style Helpers
  _styleChart () {
    const chart = d3.select(this.refs.chart);

    // Style x axis labels
    chart.select('g.x-axis').selectAll('text')
      .style(styles.xAxisLabel)
      .style('text-anchor', () => {
        return 'middle';
      });

    // Style x axis ticks
    chart.select('g.x-axis').selectAll('line')
      .style({ stroke: StyleConstants.Colors.FOG });

    // Style y axis labels
    chart.select('g.y-axis').selectAll('text')
      .style(styles.yAxisLabel)
      .style('fill', d => {
        if (d === 0) {
          return StyleConstants.Colors.CHARCOAL;
        }

        return StyleConstants.Colors.ASH;
      })
      .attr('transform', 'translate(-10,0)');

    // Style y axis ticks
    chart.select('g.y-axis').selectAll('line')
      .style('stroke', d => {
        if (d === 0) {
          return StyleConstants.Colors.CHARCOAL;
        }

        return StyleConstants.Colors.FOG
      });

    // Style Circles
    chart.selectAll('.circle')
      .style(styles.circle)
      .style('stroke', this.props.lineColor);

    // Style rest of chart elements
    chart.selectAll('text')
         .style('font-family', StyleConstants.Fonts.REGULAR)
         .style('font-size', StyleConstants.FontSizes.MEDIUM);
    chart.selectAll('.domain').style(styles.domain);
    chart.selectAll('.grid-line .tick').style('stroke', d => {
      if (d === 0) {
        return StyleConstants.Colors.CHARCOAL;
      }

      return StyleConstants.Colors.FOG;
    });
  },

  // Render functions
  _renderHoveredDataPointDetails () {
    if (this.state.hoveredDataPoint) {
      return this.props.hoveredDataPointDetails.map((item, index) => {
        const value = this.state.hoveredDataPoint[item.key];

        return (
          <div style={styles.hoveredDataPointDetail} key={'details-' + index}>
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
    //Items left
    // - Break Point Label
    // - Color past half of graph
    // - Fix X Axis Ticks
    // - Y Axis Formatting needs tweaked
    // - Animations

    return (
      <div className='mx-time-based-line-chart' style={[styles.component, { height: this.props.height + 'px', width: this.props.width + 'px' }]}>
        {this.props.data.length ? (
          <div>
            <svg
              height={this.props.height}
              width={this.props.width}
              ref='chart'
            >
              <YAxis
                yAxisFormat={this.props.yAxisFormatter}
                data={this.props.data}
                tickValues={this._getYAxisTickValues()}
                translation={this._getYAxisTranslation()}
                yScaleFunction={this._getYScaleFunction}
              />
              <YGridLines
                tickSize={this.state.adjustedWidth * -1}
                tickValues={this._getYAxisTickValues()}
                translation={this._getYAxisTranslation()}
                yScaleFunction={this._getYScaleFunction}
              />
              <TimeAxis
                data={this.props.data}
                timeAxisFormat={this.props.rangeType === 'day' ? 'MMM D' : 'MMM'}
                translation={this._getTimeAxisTranslation()}
                xScaleFunction={this._getXScaleFunction}
              />
              {this.props.showBreakPoint ? (
                <g className='break-point' ref='breakPoint' transform={this._getVerticalLineTranslation()}>
                  <line
                    x1={this._getXScaleValue(this.props.breakPointDate)}
                    x2={this._getXScaleValue(this.props.breakPointDate)}
                    y1={this.props.margin.top}
                    y2={this.state.adjustedHeight}
                    style={styles.breakPointLine}
                  />
                </g>
              ) : null}
              <Line
                data={this.props.data}
                getXScaleValue={this._getXScaleValue}
                getYScaleValue={this._getYScaleValue}
                lineColor={this.props.lineColor}
                translation={this._getLineTranslation()}
              />
              <g className='circles' ref='svgCircles' transform={this._getLineTranslation()}>
                {this.props.data.length <= 45 ? (
                  this.props.data.map((item, index) => {
                    const cx = this._getXScaleValue(moment.unix(item.timeStamp).startOf(this.props.rangeType).unix());
                    const cy = this._getYScaleValue(item.value);

                    return <circle className='circle' cx={cx} cy={cy} key={index} r={3} style={styles.circle} />;
                  })
                ) : null}
              </g>
              {this.state.hoveredDataPoint ? (
                <g className='hover-state' ref='hoverState'>
                  <g className='hover-state-line' ref='hoverStateLine' transform={this._getVerticalLineTranslation()}>
                    <line
                      x1={this._getXScaleValue(this.state.hoveredDataPoint.timeStamp)}
                      x2={this._getXScaleValue(this.state.hoveredDataPoint.timeStamp)}
                      y1={this.state.adjustedHeight + this.props.margin.top}
                      y2={this._getYScaleValue(this.state.hoveredDataPoint.value) + this.props.margin.top}
                      style={styles.verticalLine}
                    />
                  </g>
                  <g className='hover-state-date-rect' ref='hoverStateDateRect' transform={this._getLineTranslation()}>
                    <rect
                      height={30}
                      style={styles.dateTooltip}
                      width={60}
                      x={this._getXScaleValue(this.state.hoveredDataPoint.timeStamp) - 30}
                      y={this.state.adjustedHeight}
                    />
                  </g>
                  <g className='hover-state-circle' ref='hoverStateCircle' transform={this._getLineTranslation()}>
                    <circle
                      className='circle'
                      cx={this._getXScaleValue(this.state.hoveredDataPoint.timeStamp)}
                      cy={this._getYScaleValue(this.state.hoveredDataPoint.value)}
                      r={5}
                      style={styles.circle}
                    />
                  </g>
                  <g className='hover-state-date-text' ref='hoverStateDateText' transform={this._getLineTranslation()}>
                    <text
                      style={styles.dateTooltipText}
                      x={this._getXScaleValue(this.state.hoveredDataPoint.timeStamp) - 20}
                      y={this.state.adjustedHeight + 20}
                    >
                      {moment.unix(this.state.hoveredDataPoint.timeStamp).format(this.props.rangeType === 'day' ? 'MMM DD' : 'MMM')}
                    </text>
                  </g>
                </g>
              ) : null}
              <g className='slices' ref='svgSlices'>
                {this.props.data.map((dataPoint, index) => {
                  return (
                    <rect
                      height={this.state.adjustedHeight}
                      key={'slice-' + index}
                      onMouseOver={this._handleChartMouseOver.bind(null, dataPoint)}
                      style={styles.domain}
                      transform={this._getLineTranslation()}
                      width={this._getSliceWidth()}
                      x={this._getXScaleValue(moment.unix(dataPoint.timeStamp).startOf(this.props.rangeType).unix()) - this._getSliceMiddle()}
                      y={0}
                    />
                  );
                })}
              </g>
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