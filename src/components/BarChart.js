const React = require('react');
const Radium = require('radium');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

class BarChart extends React.Component {
  constructor (props) {
    super(props);
  }

  _getXScale () {
    return d3.scale.ordinal()
      .rangeRoundBands([0, (this.props.width - this.props.xAxisMargin * 2)], this.props.barSpace)
      .domain(this.props.data.map(d => {
        return d.label;
      }));
  }

  _getYScale () {
    const adjustedHeight = this.props.height - this.props.xAxisMargin;

    return d3.scale.linear()
      .range([adjustedHeight, 0])
      .domain([0, d3.max(this.props.data, d => {
        return d.value;
      })]);
  }

  _renderBars () {
    const adjustedHeight = this.props.height - this.props.xAxisMargin;
    const xScale = this._getXScale();
    const yScale = this._getYScale();

    return this.props.data.map((dataSet, index) => {
      const y = yScale(dataSet.value);
      const translate = 'translate(' + (xScale(dataSet.label) + this.props.xAxisMargin) + ', 0)';
      const color = this.props.multiColor ? this.props.colors[index] : this.props.colors[0];

      return (
        <rect
          fill={color}
          height={adjustedHeight - y}
          key={index}
          opacity={this.props.opacity}
          transform={translate}
          width={xScale.rangeBand()}
          y={y}
        />
      );
    });
  }

  _renderGrid () {
    const yScale = this._getYScale();
    const ticks = this._getYScale().ticks(this.props.tickCount);
    const stroke = this.props.gridColor;

    return ticks.map((tick, index) => {
      return (
        <g key={index} style={[styles.grid, { stroke }]} transform={'translate(0,' + yScale(tick) + ')'}>
          <line x2={this.props.width} />
        </g>
      );
    });
  }

  _renderXAxisLabels () {
    const xScale = this._getXScale();
    const width = xScale.rangeBand();
    const color = this.props.xAxisLabelColor;

    return this.props.data.map((dataSet, index) => {
      const left = xScale(dataSet.label) + this.props.xAxisMargin;

      return (
        <div key={index} style={[styles.xAxisLabel, { color, width, left }]}>
          {dataSet.label}
        </div>
      );
    });
  }

  _renderYAxisLabels () {
    const yScale = this._getYScale();
    const ticks = yScale.ticks(this.props.tickCount);
    const color = this.props.yAxisLabelColor;
    const labelInset = this.props.yAxisPosition === 'left' ? { left: this.props.yAxisLabelInset } : { right: this.props.yAxisLabelInset };

    return ticks.map((tick, index) => {
      const top = this.props.xAxisPosition === 'top' ? yScale(tick) - this.props.fontSize + this.props.yAxisMargin : yScale(tick) - this.props.fontSize;
      const textAlign = this.props.yAxisPosition;

      return (
        <div key={index} style={[styles.yAxislabel, labelInset, { color, textAlign, top }]}>
          {tick}
        </div>
      );
    });
  }

  render () {
    const adjustedHeight = this.props.height - this.props.xAxisMargin;
    const xAxisPosition = this.props.xAxisPosition === 'top' ? { top: 0 } : { top: adjustedHeight + 5 };
    const chartMargin = this.props.xAxisPosition === 'top' ? { marginTop: this.props.xAxisMargin } : { marginBottom: this.props.xAxisMargin };

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
}

const styles = {
  component: {
    position: 'relative',
    fontFamily: StyleConstants.FontFamily
  },
  grid: {
    strokeWidth: '0.5px',
    strokeDasharray: '3px, 5px'
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

BarChart.propTypes = {
  barSpace: React.PropTypes.number,
  colors: React.PropTypes.array,
  data: React.PropTypes.array.isRequired,
  fontSize: React.PropTypes.number,
  gridColor: React.PropTypes.string,
  height: React.PropTypes.number,
  multiColor: React.PropTypes.bool,
  opacity: React.PropTypes.number,
  tickCount: React.PropTypes.number,
  width: React.PropTypes.number,
  xAxisLabelColor: React.PropTypes.string,
  xAxisMargin: React.PropTypes.number,
  xAxisPosition: React.PropTypes.string,
  yAxisLabelColor: React.PropTypes.string,
  yAxisLabelInset: React.PropTypes.number,
  yAxisMargin: React.PropTypes.number,
  yAxisPosition: React.PropTypes.string
};

BarChart.defaultProps = {
  barSpace: 0.1,
  colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
  data: [],
  fontSize: 13,
  gridColor: StyleConstants.Colors.GRID_COLOR,
  height: 400,
  multiColor: false,
  opacity: 0.8,
  tickCount: 4,
  width: 1200,
  xAxisLabelColor: StyleConstants.Colors.LIGHT_FONT,
  xAxisMargin: 80,
  xAxisPosition: 'bottom',
  yAxisLabelColor: StyleConstants.Colors.LIGHT_FONT,
  yAxisLabelInset: 35,
  yAxisMargin: 20,
  yAxisPosition: 'left'
};

module.exports = Radium(BarChart);