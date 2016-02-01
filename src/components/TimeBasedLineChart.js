const React = require('react');
const ReactDom = require('react-dom');
const Radium = require('radium');

const d3 = require('d3');
const { isEqual } = require('lodash');
const moment = require('moment');
const numeral = require('numeral');

const StyleConstants = require('../constants/Style');

const styles = {
  component: {
    fontFamily: StyleConstants.FontFamily,
    position: 'relative',
    boxSizing: 'content-box',
    display: 'inline-block'
  },
  domain: {
    opacity: 0
  },
  gridLineTick: {
    'stroke': StyleConstants.Colors.ASH,
    'strokeWidth': 0.5
  },
  svg: {
    'display': 'block',
    'height': '100%',
    'position': 'relative',
    'width': '100%'
  },
  text: {
    'color': StyleConstants.Colors.CHARCOAL,
    'font-size': StyleConstants.FontSizes.MEDIUM,
    'font-weight': 'normal'
  },
  tooltip: {
    color: StyleConstants.Colors.WHITE,
    display: 'inline-block',
    fontSize: StyleConstants.FontSizes.SMALL,
    marginBottom: 3,
    marginTop: 3,
    minWidth: 50,
    padding: 5
  },
  tooltipWrapper: {
    display: 'inline-block',
    position: 'absolute',
    zIndex: 1
  },
  zeroState: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

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
    return <g ref='yAxis' style={{ fill: 'none', stroke: StyleConstants.Colors.CHARCOAL }} transform={this.props.translation} />;
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
    return <g style={styles.gridLineTick} ref='yGridLines' transform={this.props.translation} />;
  }
});

const TimeAxis = React.createClass({
  componentWillMount () {
    const timeAxis = d3.svg.axis()
      .scale(this.props.xScaleFunction())
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .ticks(8);

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
    return <g ref='timeAxis' style={{ fill: 'none', stroke: StyleConstants.Colors.CHARCOAL, strokeWidth: 1 }} transform={this.props.translation} />;
  }
});

const LineChart = React.createClass({
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
      <g transform={this.props.translation}>
        <path
          d={this.state.line(this.props.data)}
          fill='none'
          stroke={this.props.lineColor}
          strokeDasharray={this.props.dashed ? '2, 2' : 'none'}
          strokeWidth={2}
        />
      </g>
    );
  }
});

const SvgRectangle = React.createClass({
  render () {
    return (
      <rect {...this.props} />
    );
  }
});

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
    this.setState({
      chartEl: ReactDom.findDOMNode(this.refs.chart)
    });
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

  //Translate axis position via use of margins
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

  _getAreaBelowZero (data) {
    const area = d3.svg.area()
      .x(d => {
        const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

        return this._getXScaleValue(currentDate);
      })
      .y0(this.state.adjustedHeight - 10)
      .y1(this._getYScaleValue(0));

    return area(data);
  },

  _getFlatLine (data) {
    const flatLine = d3.svg.line()
      .x(d => {
        const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

        return this._getXScaleValue(currentDate);
      })
      .y(this.state.adjustedHeight);

    return flatLine(data);
  },

  _getLine (data) {
    const line = d3.svg.line()
      .x(d => {
        const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

        return this._getXScaleValue(currentDate);
      })
      .y(d => {
        return this._getYScaleValue(d.value);
      });

    return line(data);
  },

  _getSliceMiddle () {
    return this._getSliceWidth() / 2;
  },

  _getSliceWidth () {
    return Math.floor(this.state.adjustedWidth / this.props.data.length);
  },

  _getSplitData () {
    const future = [];
    const past = [];

    this.props.data.forEach(item => {
      const currentDate = moment.unix(item.timeStamp).startOf(this.props.rangeType);

      if (currentDate.isBefore(moment.unix(this.props.breakPointDate), this.props.rangeType)) {
        past.push(item);
      }

      if (currentDate.isAfter(moment.unix(this.props.breakPointDate), this.props.rangeType)) {
        future.push(item);
      }

      if (currentDate.isSame(moment.unix(this.props.breakPointDate), this.props.rangeType)) {
        past.push(item);
        future.push(item);
      }
    });

    return [past, future];
  },

  // _getYAxisTicks (data, numTicks = 4) {
  //   const maxValue = d3.max(this.props.data, d => {
  //     return d.value;
  //   });

  //   let minValue = d3.min(this.props.data, d => {
  //     return d.value;
  //   });

  //   console.log('Max Value: ', maxValue);
  //   console.log('Min Value: ', minValue);

  //   const ticks = [maxValue, minValue];
  //   const interval = (maxValue - minValue) / numTicks;

  //   for (let current = minValue; current < maxValue; current += interval) {
  //     ticks.push(current);
  //   }

  //   return ticks;
  // },

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

  // _renderChart () {
  //   // this._renderChartBase();
  //   // this._renderLineChart();
  // },

  _renderXAxis () {
    const chart = d3.select(this.state.chartEl);
    const xAxisFormat = this.props.rangeType === 'day' ? 'MMM D' : 'MMM';

    const xAxis = d3.svg.axis()
      .scale(this._getXScaleFunction())
      .orient('bottom')
      .tickFormat(d => {
        return moment.unix(d).format(xAxisFormat);
      })
      .ticks(8);

    chart.select('g.x-axis').call(xAxis);
  },

  _renderLineChart () {
    const chart = d3.select(this.state.chartEl);
    const data = this._getSplitData();
    const xAxisFormat = this.props.rangeType === 'day' ? 'MMM D' : 'MMM';
    // const yTicks = this._getYAxisTicks(this.props.data);

    //Draw the xAxis labels
    // const xAxis = d3.svg.axis()
    //   .scale(this._getXScaleFunction())
    //   .orient('bottom')
    //   .tickFormat(d => {
    //     return moment.unix(d).format(xAxisFormat);
    //   })
    //   .ticks(8);

    // //Draw the yAxis labels
    // const yAxis = d3.svg.axis()
    //   .scale(this._getYScaleFunction())
    //   .orient('left')
    //   .tickValues(yTicks)
    //   .tickFormat(this.props.yAxisFormatter);

    // //Draw the horizontal grid lines
    // const yGrid = d3.svg.axis()
    //   .scale(this._getYScaleFunction())
    //   .orient('left')
    //   .tickValues(yTicks)
    //   .tickSize(-this.state.adjustedWidth, 0, 0)
    //   .tickFormat('');

    //Add the groups
    data.forEach((dataSet, i) => {
      const color = this.props.lineColor;
      const breakPointDate = moment.unix(this.props.breakPointDate);
      const isDayRangeType = this.props.rangeType === 'day';
      const isPast = i === 0;

      const group = chart.append('g')
        .attr('class', 'group')
        .attr('transform', 'translate(' + this.props.margin.left + ',' + this.props.margin.top + ')');

      //Lines ================================
      const dash = !isPast && this.props.dashedFutureLine ? '2, 2' : 'none';

      const lineGroup = group.append('g')
        .attr('class', 'line-group');

      // lineGroup.append('svg:path')
      //   .attr('class', 'mx-time-based-line-chart-line')
      //   .attr('stroke', color)
      //   .attr('stroke-width', '2px')
      //   .attr('stroke-dasharray', dash)
      //   .attr('fill', 'none')
      //   .attr('d', this._getLine(dataSet));

      //Area Below 0 ================
      if (this.props.shadeAreaBelowZero) {
        const belowZeroGroup = lineGroup.append('g')
          .attr('class', 'above-area-group');

        belowZeroGroup.append('svg:path')
          .attr('class', 'mx-time-based-line-chart-below-zero-area')
          .attr('stroke-width', '0')
          .attr('fill', this.props.areaBelowZeroColor)
          .attr('opacity', '0.1')
          .attr('d', this._getAreaBelowZero(dataSet));
      }

      //Break Point date, line, and label ===========
      if (this.props.showBreakPoint) {
        const breakPointGroup = lineGroup.append('g')
          .attr('class', 'break-point-group');

        const breakPoint = breakPointGroup.selectAll('.break-point-group')
          .data(dataSet);

        const newBreakPoint = breakPoint.enter();

        //Break point label
        newBreakPoint.append('text')
          .attr('class', 'mx-time-based-line-chart-break-point-label')
          .attr('x', d => {
            const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();
            const offSet = isDayRangeType ? 18 : 25;

            return this._getXScaleValue(currentDate) - offSet;
          })
          .attr('y', -18)
          .attr('opacity', d => {
            const currentDate = moment.unix(d.timeStamp).format('YYYY MM DD');
            const isSameDateAsBreakPoint = currentDate === breakPointDate.format('YYYY MM DD');

            return isSameDateAsBreakPoint && i === 1 ? '1' : '0';
          })
          .text(this.props.breakPointLabel);

        if (!this.props.staticXAxis) {
          //Break point date
          newBreakPoint.append('text')
            .attr('class', 'mx-time-based-line-chart-break-point-date')
            .attr('x', d => {
              const offSet = isDayRangeType ? 18 : 22;
              const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

              return this._getXScaleValue(currentDate) - offSet;
            })
            .attr('y', this.state.adjustedHeight + 20)
            .attr('opacity', d => {
              const currentDate = moment.unix(d.timeStamp).format('YYYY MM DD');
              const isSameDateAsBreakPoint = currentDate === breakPointDate.format('YYYY MM DD');

              return isSameDateAsBreakPoint && i === 1 ? '1' : '0';
            })
            .text(d => {
              const dateFormat = isDayRangeType ? 'MMM D' : 'MMMM';
              const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

              return moment.unix(currentDate).format(dateFormat);
            });
        }

        //Break point line
        newBreakPoint.append('line')
          .attr('class', 'mx-time-based-line-chart-break-point-line')
          .attr('x1', d => {
            const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

            return this._getXScaleValue(currentDate);
          })
          .attr('y1', -10)
          .attr('x2', d => {
            const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

            return this._getXScaleValue(currentDate);
          })
          .attr('y2', this.state.adjustedHeight - 10)
          .style('stroke-width', 1)
          .style('stroke', '#555')
          .style('fill', 'none')
          .style('opacity', d => {
            const currentDate = moment.unix(d.timeStamp).format('YYYY MM DD');
            const isSameDateAsBreakPoint = currentDate === breakPointDate.format('YYYY MM DD');

            return isSameDateAsBreakPoint && !isPast ? '0.2' : '0';
          });
      }

      //Dots =================================
      const dotGroup = lineGroup.append('g')
        .attr('class', 'dot-group');

      const dots = dotGroup.selectAll('.dot')
        .data(dataSet);

      const newDots = dots.enter();

      newDots.append('circle')
        .attr('class', 'mx-time-based-line-chart-dot')
        .attr('cx', d => {
          const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

          return this._getXScaleValue(currentDate);
        })
        .attr('cy', d => {
          return this._getYScaleValue(d.value);
        })
        .attr('r', 3)
        .attr('opacity', (d, j) => {
          const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType);
          const isBreakPointDate = currentDate.format('YYYY MM DD') === breakPointDate.format('YYYY MM DD');
          const isStartOfSet = j === 0;
          const isEndOfSet = j === (dataSet.length - 1);

          if ((isStartOfSet && isPast) || (isBreakPointDate && this.props.showBreakPoint && !isPast) || (isEndOfSet && !isPast)) {
            return '1';
          }

          return '0';
        })
        .style('fill', '#fff')
        .style('stroke', color)
        .style('stroke-width', '2px');

      //Slice ================================
      const sliceGroup = lineGroup.append('g')
        .attr('class', 'slice-group');

      const slices = sliceGroup.selectAll('.slice-group')
        .data(dataSet);

      const newSlices = slices.enter();

      newSlices.append('rect')
        .attr('class', 'slice')
        .attr('x', d => {
          const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType).unix();

          return this._getXScaleValue(currentDate) - this._getSliceMiddle();
        })
        .attr('y', -10)
        .attr('height', this.state.adjustedHeight)
        .attr('width', this._getSliceWidth())
        .style('opacity', '0')
        .style('display', d => {
          const currentDate = moment.unix(d.timeStamp);
          const isBreakPointDate = currentDate.format('YYYY MM DD') === breakPointDate.format('YYYY MM D');

          return isPast && isBreakPointDate ? 'none' : 'block';
        })
        .on('mouseover', this._handleDataPointMouseOver);
    });

    //Update the axes
    chart.selectAll('g.grid-line').call(yGrid);
    chart.select('g.y-axis').call(yAxis);

    if (this.props.staticXAxis) {
      chart.select('g.x-axis').call(xAxis);
    }

    //Style xAxis labels
    chart.select('g.x-axis').selectAll('text')
      .style('text-anchor', () => {
        return 'middle';
      });

    chart.select('g.y-axis').selectAll('text')
      .style('text-anchor', 'start')
      .attr('transform', 'translate(-60, 0)');

    //Style rest of chart elements
    chart.selectAll('text').style(styles.text);
    chart.selectAll('.domain').style(styles.domain);
    chart.selectAll('.grid-line .tick').style(styles.gridLineTick);
  },

  _handleDataPointMouseOver (d) {
    const graphMiddleTimeStamp = this.props.data[Math.floor(this.props.data.length / 2)].timeStamp;
    const graphMiddleDate = moment.unix(graphMiddleTimeStamp).startOf(this.props.rangeType);
    const currentDate = moment.unix(d.timeStamp).startOf(this.props.rangeType);
    const isAfterMidPoint = currentDate.isAfter(graphMiddleDate);
    const sliceWidth = this._getSliceMiddle();
    const xScale = this._getXScaleValue(currentDate.unix());

    const left = isAfterMidPoint ? 'auto' : xScale + this.props.margin.left + sliceWidth;
    const right = isAfterMidPoint ? this.state.adjustedWidth + this.props.margin.right + sliceWidth - xScale : 'auto';
    const textAlign = isAfterMidPoint ? 'right' : 'left';
    const top = this.props.children ? this._getYScaleValue(d.value) - 5 + this.props.margin.top : this._getYScaleValue(d.value) - 5;

    const position = {
      left,
      right,
      textAlign,
      top
    };

    this.setState({
      hoveredData: d,
      tooltipPosition: position
    });

    // this._renderSvgTooltipComponents();
    this.props.onDataPointHover(d);
  },

  _handleChartMouseLeave () {
    this.setState({
      hoveredData: false,
      tooltipPosition: false
    });

    this._removeSvgTooltipComponents();
  },

  _removeSvgTooltipComponents () {
    const dots = d3.select(this.state.chartEl).selectAll('.dot-group');
    const slices = d3.select(this.state.chartEl).selectAll('.slice-group');

    slices.selectAll('.mx-time-based-line-chart-hover-rectangle').remove();
    dots.selectAll('.mx-time-based-line-chart-hover-above').remove();
    dots.selectAll('.mx-time-based-line-chart-hover-below').remove();
    dots.selectAll('.mx-time-based-line-chart-hover-dot').remove();
  },

  _renderSvgTooltipComponents () {
    const hoveredData = this.state.hoveredData;

    const breakPointDate = moment.unix(this.props.breakPointDate);
    const currentDate = moment.unix(hoveredData.timeStamp).startOf(this.props.rangeType);

    const dash = currentDate.isAfter(breakPointDate) && this.props.dashedFutureLine ? '2, 2' : 'none';
    const isBreakPointDate = currentDate.format('MM DD YYYY') === breakPointDate.format('MM DD YYYY');
    const isDayRangeType = this.props.rangeType === 'day';
    const dateFormat = isDayRangeType ? 'MMM D' : 'MMM';

    const dots = d3.select(this.state.chartEl).selectAll('.dot-group');
    const slices = d3.select(this.state.chartEl).selectAll('.slice-group');

    //Gray rectangle highlighting hovered section
    slices.append('rect')
      .attr('class', 'mx-time-based-line-chart-hover-rectangle')
      .attr('x', () => {
        return this._getXScaleValue(currentDate.unix()) - this._getSliceMiddle();
      })
      .attr('y', -10)
      .attr('height', this.state.adjustedHeight)
      .attr('width', this._getSliceWidth())
      .style('opacity', '0.025');

    if (!this.props.staticXAxis) {
      //Date Text
      slices.append('text')
        .attr('x', () => {
          const offSet = this.props.rangeType === 'day' ? 17 : 10;

          return this._getXScaleValue(currentDate.unix()) - offSet;
        })
        .attr('y', this.state.adjustedHeight + 5)
        .style('font-size', '12')
        .style('opacity', '0.3')
        .text(() => {
          return isBreakPointDate ? null : currentDate.format(dateFormat);
        });
    }

    //Credit balance line
    if (hoveredData.above) {
      dots.append('line')
        .attr('class', 'mx-time-based-line-chart-hover-above')
        .attr('x1', this._getXScaleValue(currentDate.unix()))
        .attr('y1', this._getYScaleValue(hoveredData.value + hoveredData.above))
        .attr('x2', this._getXScaleValue(currentDate.unix()))
        .attr('y2', this._getYScaleValue(hoveredData.value))
        .style('stroke-dasharray', dash)
        .style('stroke-width', 3)
        .style('stroke', '#30B53C')
        .style('fill', 'none');
    }

    //Debit balance line
    if (hoveredData.below) {
      const below = hoveredData.value + hoveredData.below;
      const belowValue = below < -4000 ? below + 500 : below;

      dots.append('line')
        .attr('class', 'mx-time-based-line-chart-hover-below')
        .attr('x1', this._getXScaleValue(currentDate.unix()))
        .attr('y1', this._getYScaleValue(hoveredData.value))
        .attr('x2', this._getXScaleValue(currentDate.unix()))
        .attr('y2', this._getYScaleValue(belowValue))
        .style('stroke-dasharray', dash)
        .style('stroke-width', 3)
        .style('stroke', '#C93030')
        .style('fill', 'none');
    }

    //Circle on line
    dots.append('circle')
      .attr('class', 'mx-time-based-line-chart-hover-dot')
      .attr('cx', this._getXScaleValue(currentDate.unix()))
      .attr('cy', this._getYScaleValue(hoveredData.value))
      .attr('r', 3)
      .style('fill', '#fff')
      .style('stroke', this.props.lineColor)
      .style('stroke-width', '2px');
  },

  _renderTooltip () {
    if (this.props.showTooltips && this.state.tooltipPosition) {
      const hoveredData = this.state.hoveredData;
      const position = this.state.tooltipPosition;

      if (this.props.children) {
        return (
          <div className='mx-time-based-line-chart-tool-tip-wrapper' style={[styles.tooltipWrapper, position]}>
            {this.props.children}
          </div>
        );
      }

      return (
        <div style={[styles.tooltipWrapper, position]}>
          <div style={styles.defaultToolTip}>
            {hoveredData.value}
          </div>
        </div>
      );
    }
  },

  // _renderChartBase () {
  //   const margin = this.props.margin;
  //   const width = this.props.width;
  //   const height = this.props.height;
  //   const chart = d3.select(this.state.chartEl);
  //   const data = this.props.data;

  //   chart.style(styles.svg);

  //   chart.selectAll('g').remove();

  //   chart.attr('width', width)
  //     .attr('height', height);

  //   if (data.length > 0) {
  //     chart.append('g')
  //       .attr('class', 'x-axis')
  //       .attr('transform', 'translate(' + (margin.left - this._getSliceMiddle()) + ',' + (height - margin.bottom) + ')');

  //     chart.append('g')
  //       .attr('class', 'y-axis')
  //       .attr('transform', 'translate(' + (margin.left + 20) + ',' + (margin.top - 10) + ')');

  //     chart.append('g')
  //       .attr('class', 'grid-line')
  //       .attr('transform', 'translate(' + (margin.left - this._getSliceMiddle()) + ',' + (margin.top - 10) + ')');
  //   }
  // },

    // //Draw the horizontal grid lines
    // const yGrid = d3.svg.axis()
    //   .scale(this._getYScaleFunction())
    //   .orient('left')
    //   .tickValues(yTicks)
    //   .tickSize(-this.state.adjustedWidth, 0, 0)
    //   .tickFormat('');

  render () {
    return (
      <div className='mx-time-based-line-chart' style={[styles.component, { height: this.props.height + 'px', width: this.props.width + 'px' }]}>
        {this.props.data.length ? (
          <svg
            height={this.props.height}
            width={this.props.width}
            style={{ backgroundColor: StyleConstants.Colors.PORCELAIN }}
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
            <LineChart
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
          </svg>
        ) : this.props.zeroState }
      </div>
    );
  }
});

module.exports = Radium(TimeBasedLineChart);