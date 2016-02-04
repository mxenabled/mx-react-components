const React = require('react');
const ReactDom = require('react-dom');
const Radium = require('radium');

const d3 = require('d3');
const { isEqual } = require('lodash');
const moment = require('moment');
const numeral = require('numeral');

const StyleConstants = require('../constants/Style');

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
    stroke: 'none',
  },
  breakPointLine: {
    fill: 'none',
    stroke: StyleConstants.Colors.FOG,
    'stroke-width': 1,
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
    'stroke-width': 1,
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
    textAlign: 'right',
    width: 100
  },
  hoveredDataPointValue: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    display: 'inline-block',
    fontFamily: StyleConstants.Fonts.SEMIBOLD,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    textAlign: 'left',
    width: 100
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
const ChartLineGroup = React.createClass({
  componentWillMount () {
    const flatLine = d3.svg.line()
      .x(d => {
        const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

        return this.props.getXScaleValue(currentDate);
      })
      .y(d => {
        return this.props.adjustedHeight;
      });

    const line = d3.svg.line()
      .x(d => {
        const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

        return this.props.getXScaleValue(currentDate);
      })
      .y(d => {
        return this.props.getYScaleValue(d.value);
      });

    this.setState({
      flatLine,
      line
    });
  },

  componentDidMount () {
    this._animateLine();
  },

  componentDidUpdate () {
    this._animateLine();
  },

  _animateLine () {
    d3.select(this.refs.chartLine).transition().attr('d', this.state.line(this.props.data));
  },

  render () {
    return (
      <g className='chart-line-group' ref='chartLineGroup' transform={this.props.translation}>
        <path
          d={this.state.flatLine(this.props.data)}
          fill='none'
          ref='chartLine'
          stroke={this.props.lineColor}
          strokeWidth={2}
        />
      </g>
    );
  }
});

const CirclesGroup = React.createClass({
  componentDidMount () {
    this._animateCircles();
  },

  componentDidUpdate () {
    this._animateCircles();
  },

  _animateCircles () {
    d3.select(this.refs.circleGroup).selectAll('.circle').data(this.props.data).transition().attr('cy', d => {
      return this.props.yScaleValue(d.value);
    });
  },

  render () {
    return (
      <g className='circle-group' ref='circleGroup' transform={this.props.translation}>
        {this.props.data.length <= 45 ? (
          this.props.data.map((item, index) => {
            const cx = this.props.xScaleValue(moment.unix(item.timeStamp).startOf(this.props.rangeType).unix());
            const cy = this.props.adjustedHeight;

            return (
              <circle
                className='circle'
                cx={cx}
                cy={cy}
                key={index}
                r={3}
              />
            );
          })
        ) : null}
      </g>
    );
  }
});

const HoveredDataPointGroup = React.createClass({
  render () {
    return (
      <g className='hover-state' ref='hoverState'>
        <g className='hover-state-line' ref='hoverStateLine' transform={this.props.translation}>
          <line
            className='hovered-data-point-line'
            x1={this.props.xScaleValue(this.props.hoveredDataPoint.timeStamp)}
            x2={this.props.xScaleValue(this.props.hoveredDataPoint.timeStamp)}
            y1={this.props.adjustedHeight}
            y2={this.props.yScaleValue(this.props.hoveredDataPoint.value)}
          />
        </g>
        <g className='hover-state-date-rect' ref='hoverStateDateRect' transform={this.props.translation}>
          <rect
            className='hovered-data-point-date'
            height={30}
            width={60}
            x={this.props.xScaleValue(this.props.hoveredDataPoint.timeStamp) - 30}
            y={this.props.adjustedHeight}
          />
        </g>
        <g className='hover-state-circle' ref='hoverStateCircle' transform={this.props.translation}>
          <circle
            className='circle'
            cx={this.props.xScaleValue(this.props.hoveredDataPoint.timeStamp)}
            cy={this.props.yScaleValue(this.props.hoveredDataPoint.value)}
            r={5}
          />
        </g>
        <g className='hover-state-date-text' ref='hoverStateDateText' transform={this.props.translation}>
          <text
            className='hovered-data-point-date-text'
            x={this.props.xScaleValue(this.props.hoveredDataPoint.timeStamp) - 20}
            y={this.props.adjustedHeight + 20}
          >
            {moment.unix(this.props.hoveredDataPoint.timeStamp).format(this.props.rangeType === 'day' ? 'MMM DD' : 'MMM')}
          </text>
        </g>
      </g>
    );
  }
});

// Axis
const TimeAxisGroup = React.createClass({
  componentWillMount () {
    const timeAxis = d3.svg.axis()
      .scale(this.props.xScaleFunction())
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .tickSize(10, 10)
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
    return (
      <g
        className='x-axis'
        ref='timeAxis'
        transform={this.props.translation}
      />
    );
  }
});

const YAxisGroup = React.createClass({
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

const YGridLinesGroup = React.createClass({
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

// Misc chart components
const BreakPointGroup = React.createClass({
  render () {
    return (
      <g className='break-point-items' ref='breakPointItems' transform={this.props.translation}>
        <line
          className='break-point-line'
          x1={this.props.xScaleValue(this.props.breakPointDate)}
          x2={this.props.xScaleValue(this.props.breakPointDate)}
          y1={this.props.margin.top}
          y2={this.props.adjustedHeight + this.props.margin.bottom}
        />
        <text
          className='break-point-label'
          x={this.props.xScaleValue(this.props.breakPointDate) + 10}
          y={40}
        >
          {this.props.breakPointLabel}
        </text>
      </g>
    );
  }
});

const SlicesGroup = React.createClass({
  render () {
    return (
      <g className='slices' ref='slices'>
        {this.props.data.map((dataPoint, index) => {
          return (
            <rect
              height={this.props.adjustedHeight}
              key={'slice-' + index}
              onMouseOver={this.props.handleChartMouseOver.bind(null, dataPoint)}
              opacity={0}
              transform={this.props.translation}
              width={this.props.sliceWidth}
              x={this.props.xScaleValue(moment.unix(dataPoint.timeStamp).startOf(this.props.rangeType).unix()) - this.props.sliceMiddle}
              y={0}
            />
          );
        })}
      </g>
    );
  }
});

const ShadedRectangleGroup = React.createClass({
  render () {
    return (
      <g className='future-shade-pattern' ref='futureShadePattern'>
        <pattern
          height={4}
          id='diagonalHatch'
          patternUnits='userSpaceOnUse'
          width={4}
        >
          <path
            d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2'
            stroke={StyleConstants.Colors.FOG}
            strokeWidth={1}
          />
        </pattern>
        <rect
          fill={'url(#diagonalHatch)'}
          height={this.props.adjustedHeight}
          transform={this.props.translation}
          width={this.props.adjustedWidth - this.props.xScaleValue(this.props.breakPointDate)}
          x={this.props.xScaleValue(this.props.breakPointDate)}
          y={0}
        />
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
  _getVerticalLineTranslation () {
    return 'translate(' + this.props.margin.left + ', -10)';
  },

  _getLineTranslation () {
    const x = this.props.margin.left;

    return 'translate(' + x + ', 10)';
  },

  _getTimeAxisTranslation () {
    const x = this.props.margin.left - 10;
    const y = this.props.height - this.props.margin.bottom - 10;

    return 'translate(' + x + ',' + y + ')';
  },

  _getYAxisTranslation () {
    const x = this.props.margin.left;
    const y = this.props.margin.top - 10;

    return 'translate(' + x + ',' + y + ')';
  },

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
      .range([0, this.state.adjustedWidth - 10])
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

  _styleChart () {
    const chart = d3.select(this.refs.chart);

    // Style x axis labels
    chart.select('g.x-axis').selectAll('text')
      .attr('y', 20)
      .style(styles.xAxisLabel)
      .style('text-anchor', () => {
        return this.props.rangeType === 'day' ? 'middle' : 'start';
      });

    // Style x axis ticks
    chart.select('g.x-axis').selectAll('line')
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
    chart.selectAll('.grid-line .tick').style('stroke', d => {
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
                  adjustedHeight={this.state.adjustedHeight}
                  adjustedWidth={this.state.adjustedWidth}
                  breakPointDate={this.props.breakPointDate}
                  translation={this._getLineTranslation()}
                  xScaleValue={this._getXScaleValue}
                />
              ) : null}
              <YAxisGroup
                yAxisFormat={this.props.yAxisFormatter}
                data={this.props.data}
                tickValues={this._getYAxisTickValues()}
                translation={this._getYAxisTranslation()}
                yScaleFunction={this._getYScaleFunction}
              />
              <YGridLinesGroup
                tickSize={this.state.adjustedWidth * -1}
                tickValues={this._getYAxisTickValues()}
                translation={this._getYAxisTranslation()}
                yScaleFunction={this._getYScaleFunction}
              />
              <TimeAxisGroup
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
                  xScaleValue={this._getXScaleValue}
                />
              ) : null}
              <ChartLineGroup
                adjustedHeight={this.state.adjustedHeight}
                data={this.props.data}
                getXScaleValue={this._getXScaleValue}
                getYScaleValue={this._getYScaleValue}
                lineColor={this.props.lineColor}
                rangeType={this.props.rangeType}
                translation={this._getLineTranslation()}
              />
              <CirclesGroup
                adjustedHeight={this.state.adjustedHeight}
                data={this.props.data}
                rangeType={this.props.rangeType}
                translation={this._getLineTranslation()}
                xScaleValue={this._getXScaleValue}
                yScaleValue={this._getYScaleValue}
              />
              {this.state.hoveredDataPoint ? (
                <HoveredDataPointGroup
                  adjustedHeight={this.state.adjustedHeight}
                  hoveredDataPoint={this.state.hoveredDataPoint}
                  rangeType={this.props.rangeType}
                  translation={this._getLineTranslation()}
                  xScaleValue={this._getXScaleValue}
                  yScaleValue={this._getYScaleValue}
                />
              ) : null}
              <SlicesGroup
                adjustedHeight={this.state.adjustedHeight}
                data={this.props.data}
                handleChartMouseOver={this._handleChartMouseOver}
                rangeType={this.props.rangeType}
                sliceMiddle={this._getSliceMiddle()}
                sliceWidth={this._getSliceWidth()}
                translation={this._getLineTranslation()}
                xScaleValue={this._getXScaleValue}
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