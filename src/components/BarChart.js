const React = require('react');
const Radium = require('radium');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const BarChart = React.createClass({
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

  getDefaultProps () {
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

  _getTicks () {
    const adjustedHeight = this.props.height - this.props.margin.xAxis;

    return d3.scale.identity()
      .range([adjustedHeight, 0])
      .domain([0, d3.max(this.props.data, d => {
        return d.value;
      })])
      .ticks(this.props.tickCount);
  },

  _getXScale () {
    return d3.scale.ordinal()
      .rangeRoundBands([0, this.props.width], this.props.barSpace)
      .domain(this.props.data.map(d => {
        return d.label;
      }));
  },

  _getYScale () {
    const adjustedHeight = this.props.height - this.props.margin.xAxis;

    return d3.scale.linear()
      .range([adjustedHeight, 0])
      .domain([0, d3.max(this.props.data, d => {
        return d.value;
      })]);
  },

  _renderBars () {
    const adjustedHeight = this.props.height - this.props.margin.xAxis;
    const xScale = this._getXScale();
    const yScale = this._getYScale();

    return this.props.data.map((dataSet, index) => {
      const y = yScale(dataSet.value);
      const translate = 'translate(' + xScale(dataSet.label) + ', 0)';

      return (
        <rect
          fill={this.props.colors[index]}
          height={adjustedHeight - y}
          key={index}
          transform={translate}
          width={xScale.rangeBand()}
          y={y}
        />
      );
    });
  },

  _renderGrid () {
    const yScale = this._getYScale();
    const ticks = this._getTicks();
    const stroke = this.props.gridColor;

    return ticks.map((tick, index) => {
      return (
        <g key={index} style={[styles.grid, { stroke }]} transform={'translate(0,' + yScale(tick) + ')'}>
          <line x2={this.props.width} />
        </g>
      );
    });
  },

  _renderXAxisLabels () {
    const xScale = this._getXScale();
    const width = xScale.rangeBand();
    const color = this.props.xAxisLabelColor;

    return this.props.data.map((dataSet, index) => {
      const left = xScale(dataSet.label);

      return (
        <div key={index} style={[styles.xAxisLabel, { color, width, left }]}>
          {dataSet.label}
        </div>
      );
    });
  },

  _renderYAxisLabels () {
    const yScale = this._getYScale();
    const ticks = this._getTicks();
    const color = this.props.yAxisLabelColor;

    return ticks.map((tick, index) => {
      const top = this.props.xAxisPosition === 'top' ? yScale(tick) - this.props.fontSize + this.props.margin.yAxis : yScale(tick) - this.props.fontSize;
      const textAlign = this.props.yAxisPosition;

      return (
        <div key={index} style={[styles.yAxislabel, { color, textAlign, top }]}>
          {tick}
        </div>
      );
    });
  },

  render () {
    const adjustedHeight = this.props.height - this.props.margin.xAxis;
    const xAxisPosition = this.props.xAxisPosition === 'top' ? { top: 0 } : { top: adjustedHeight + 5 };
    const chartMargin = this.props.xAxisPosition === 'top' ? { marginTop: this.props.margin.xAxis } : { marginBottom: this.props.margin.xAxis };

    return (
      <div style={[styles.component, { height: this.props.height, width: this.props.width, fontSize: this.props.fontSize + 'px' }]}>
        {this._renderYAxisLabels()}
        <svg height={adjustedHeight} style={chartMargin} width={this.props.width}>
          <g>
            {this._renderGrid()}
            {this._renderBars()}
          </g>
        </svg>
        <div style={[styles.xAxis, xAxisPosition]}>
          {this._renderXAxisLabels()}
        </div>
      </div>
    );
  }
});

const styles = {
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