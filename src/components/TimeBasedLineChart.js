const React = require('react');
const ReactDom = require('react-dom');
const Radium = require('radium');

const d3 = require('d3');
const { isEqual } = require('lodash');
const moment = require('moment');
const numeral = require('numeral');

const StyleConstants = require('../constants/Style');

const styles = {
  breakPointLine: {
    fill: 'none',
    opacity: 0.3,
    stroke: StyleConstants.Colors.ASH,
    strokeWidth: 1,
  },
  component: {
    fontFamily: StyleConstants.FontFamily,
    position: 'relative',
    boxSizing: 'content-box',
    display: 'inline-block'
  },
  domain: {
    opacity: 0
  },
  text: {
    'color': StyleConstants.Colors.CHARCOAL,
    'font-size': StyleConstants.FontSizes.MEDIUM,
    'font-weight': 'normal'
  },
  xAxisLabel: {
    fill: StyleConstants.Colors.ASH,
    stroke: 'none'
  },
  yAxisLabel: {
    stroke: 'none',
    textAnchor: 'start'
  },
  zeroState: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Line
const BreakPointLine = React.createClass({
  render () {
    return (
      <g className='break-point-line' ref='breakPointLine' transform={this.props.translation}>
        <line
          x1={this.props.xValue}
          x2={this.props.xValue}
          y1={20}
          y2={this.props.height + 20}
          style={styles.breakPointLine}
        />
      </g>
    );
  }
});

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

// Circles
const Circles = React.createClass({
  componentWillMount () {

  },

  componentDidMount () {

  },

  componentDidUpdate () {

  },

  _renderCircles () {

  },

  render () {
    return null;
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
      .tickValues([moment().startOf('day').unix()])
      .ticks(1);

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
      .ticks(5)
      .tickFormat(this.props.yAxisFormat);

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
      .ticks(5)
      .tickSize(this.props.tickSize, 0, 0)
      .tickFormat('');

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
    alwaysShowZeroYTick: React.PropTypes.bool,
    areaBelowZeroColor: React.PropTypes.string,
    breakPointDate: React.PropTypes.number,
    breakPointLabel: React.PropTypes.string,
    children: React.PropTypes.node,
    dashedFutureLine: React.PropTypes.bool,
    data: React.PropTypes.array,
    height: React.PropTypes.number,
    lineColor: React.PropTypes.string,
    margin: React.PropTypes.object,
    onDataPointHover: React.PropTypes.func,
    rangeType: React.PropTypes.oneOf(['day', 'month']),
    shadeAreaBelowZero: React.PropTypes.bool,
    showBreakPoint: React.PropTypes.bool,
    showTooltips: React.PropTypes.bool,
    staticXAxis: React.PropTypes.bool,
    width: React.PropTypes.number,
    yAxisFormatter: React.PropTypes.func,
    zeroState: React.PropTypes.node
  },

  getDefaultProps () {
    return {
      alwaysShowZeroYTick: false,
      areaBelowZeroColor: StyleConstants.Colors.STRAWBERRY,
      breakPointDate: moment().startOf('day').unix(),
      breakPointLabel: 'Today',
      dashedFutureLine: true,
      data: [],
      height: 400,
      lineColor: StyleConstants.Colors.PRIMARY,
      margin: { top: 30, right: 0, bottom: 20, left: 50 },
      onDataPointHover: () => {},
      rangeType: 'day',
      shadeAreaBelowZero: false,
      showBreakPoint: true,
      showTooltips: true,
      staticXAxis: true,
      width: 550,
      yAxisFormatter (d) {
        return numeral(d).format('0a');
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

  shouldComponentUpdate (newProps, newState) {
    return !isEqual(newProps.data, this.props.data) || !isEqual(newState.hoveredData, this.state.hoveredData);
  },

  // Translate axis position via use of margins
  _getLineTranslation () {
    const x = this.props.margin.left - 10;

    return 'translate(' + x + ', 0)';
  },

  _getTimeAxisTranslation () {
    const x = this.props.margin.left - 10;
    const y = this.props.height - this.props.margin.bottom - 10;

    return 'translate(' + x + ',' + y + ')';
  },

  _getYAxisTranslation () {
    const x = this.props.margin.left - 10;
    const y = this.props.margin.top - 10;

    return 'translate(' + x + ',' + y + ')';
  },

  // Style Helpers
  _getYAxisColor (d) {
    if (d === 0) {
      return '#000';
    }

    return StyleConstants.Colors.ASH;
  },

  _styleChart () {
    const chart = d3.select(this.refs.chart);

    // X Axis
    // Style x axis labels
    chart.select('g.x-axis').selectAll('text')
      .style(styles.xAxisLabel)
      .style('text-anchor', () => {
        return 'middle';
      });

    // Style x axis ticks
    chart.select('g.x-axis').selectAll('line')
      .style({ stroke: StyleConstants.Colors.ASH });

    // Y Axis
    // Style y axis labels
    chart.select('g.y-axis').selectAll('text')
      .style(styles.yAxisLabel)
      .style('fill', this._getYAxisColor)
      .attr('transform', 'translate(-10,0)');

    // Style y axis ticks
    chart.select('g.y-axis').selectAll('line')
      .style('stroke', this._getYAxisColor);

    // Style rest of chart elements
    chart.selectAll('text').style(styles.text);
    chart.selectAll('.domain').style(styles.domain);
    chart.selectAll('.grid-line .tick').style('stroke', this._getYAxisColor);
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
    const maxValue = d3.max(this.props.data, d => {
      const value = d.above ? d.value + d.above : d.value + 1000;
      const multiplier = value < 0 ? -1000 : 1000;

      return Math.ceil(value / multiplier) * multiplier;
    });

    let minValue = d3.min(this.props.data, d => {
      const value = d.below ? d.value + d.below : d.value - 1000;
      const multiplier = value < 0 ? -1000 : 1000;

      return Math.ceil(value / multiplier) * multiplier;
    });

    minValue = minValue > 0 ? 0 : minValue;

    return d3.scale.linear()
      .range([this.state.adjustedHeight, 0])
      .domain([minValue, maxValue]);
  },

  _getYScaleValue (value) {
    const yScale = this._getYScaleFunction();

    return yScale(value) - 10;
  },

  render () {
    return (
      <div className='mx-time-based-line-chart' style={[styles.component, { height: this.props.height + 'px', width: this.props.width + 'px' }]}>
        {this.props.data.length ? (
          <svg
            height={this.props.height}
            width={this.props.width}
            ref='chart'
          >
            <YAxis
              yAxisFormat={this.props.yAxisFormatter}
              data={this.props.data}
              translation={this._getYAxisTranslation()}
              yScaleFunction={this._getYScaleFunction}
            />
            <YGridLines
              tickSize={this.state.adjustedWidth * -1}
              translation={this._getYAxisTranslation()}
              yScaleFunction={this._getYScaleFunction}
            />
            <Line
              data={this.props.data}
              getXScaleValue={this._getXScaleValue}
              getYScaleValue={this._getYScaleValue}
              lineColor={this.props.lineColor}
              translation={this._getLineTranslation()}
            />
            <TimeAxis
              data={this.props.data}
              timeAxisFormat={this.props.rangeType === 'day' ? 'MMM D' : 'MMM'}
              translation={this._getTimeAxisTranslation()}
              xScaleFunction={this._getXScaleFunction}
            />
            {this.props.showBreakPoint ? (
              <BreakPointLine
                height={this.state.adjustedHeight}
                translation={this._getLineTranslation()}
                xValue={this._getXScaleValue(moment().startOf('day').unix())}
              />
            ) : null}
          </svg>
        ) : this.props.zeroState }
      </div>
    );
  }
});

module.exports = Radium(TimeBasedLineChart);