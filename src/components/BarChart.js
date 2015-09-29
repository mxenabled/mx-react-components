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
    height: React.PropTypes.number,
    margin: React.PropTypes.object,
    tickCount: React.PropTypes.number,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      barSpace: 0.1,
      colors: d3.scale.category20().range(),
      data: [],
      fontSize: 13,
      height: 360,
      margin: {
        bottom: 10,
        left: 10,
        right: 10,
        top: 10
      },
      tickCount: 10,
      width: 360
    };
  },

  _getTicks () {
    const adjustedHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    return d3.scale.identity()
      .range([adjustedHeight, 0])
      .domain([0, d3.max(this.props.data, d => {
        return d.value;
      })])
      .ticks(this.props.tickCount);
  },

  _getXScale () {
    const adjustedWidth = this.props.width - this.props.margin.left - this.props.margin.right;

    return d3.scale.ordinal()
      .rangeRoundBands([0, adjustedWidth], this.props.barSpace)
      .domain(this.props.data.map(d => {
        return d.label;
      }));
  },

  _getYScale () {
    const adjustedHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    return d3.scale.linear()
      .range([adjustedHeight, 0])
      .domain([0, d3.max(this.props.data, d => {
        return d.value;
      })]);
  },

  _renderBars () {
    const adjustedHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;
    const xScale = this._getXScale();
    const yScale = this._getYScale();

    return this.props.data.map((dataSet, index) => {
      const y = yScale(dataSet.value);
      const left = xScale(dataSet.label) + this.props.margin.left;
      const translate = 'translate(' + left + ', 0)';

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

    return ticks.map((tick, index) => {
      return (
        <g key={index} style={styles.grid} transform={'translate(0,' + yScale(tick) + ')'}>
          <line x2={this.props.width} y2={0} />
        </g>
      );
    });
  },

  _renderXAxisLabels () {
    const xScale = this._getXScale();;
    const width = xScale.rangeBand();

    return this.props.data.map((dataSet, index) => {
      const left = xScale(dataSet.label) + this.props.margin.left;

      return (
        <div key={index} style={[styles.xAxisLabel, { width, left }]}>
          {dataSet.label}
        </div>
      );
    });
  },

  _renderYAxisLabels () {
    console.log(StyleConstants.FontSize);

    const yScale = this._getYScale();
    const ticks = this._getTicks();

    return ticks.map((tick, index) => {
      const top = yScale(tick) - this.props.fontSize - 2;

      return (
        <div key={index} style={[styles.yAxislabel, { top }]}>
          {tick}
        </div>
      );
    });
  },

  render () {
    return (
      <div style={[styles.component, { height: this.props.height, width: this.props.width, fontSize: this.props.fontSize + 'px' }]}>
        <div style={styles.yAxis}>
          {this._renderYAxisLabels()}
        </div>
        <svg height={this.props.height} width={this.props.width}>
          <g>
            {this._renderGrid()}
            {this._renderBars()}
          </g>
        </svg>
        <div style={styles.xAxis}>
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
    stroke: '#333',
    strokeWidth: '0.5px',
    strokeDasharray: '3px, 5px'
  },
  xAxis: {
    paddingTop: '5px',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  xAxisLabel: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    display: 'inline-block'
  },
  yAxis: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  yAxislabel: {
    position: 'absolute',
    left: 0
  }
};

module.exports = Radium(BarChart);