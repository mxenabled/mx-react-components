const React = require('react');
const _isEqual = require('lodash/isEqual');

const StyleConstants = require('../constants/Style');

const SetIntervalMixin = {
  componentWillMount () {
    this.intervals = [];
  },
  setInterval () {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount () {
    this.intervals.map(clearInterval);
  }
};

const Rect = React.createClass({
  propTypes: {
    animateOnHover: React.PropTypes.bool,
    color: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    hoverColor: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    value: React.PropTypes.number.isRequired,
    width: React.PropTypes.number,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  mixins: [SetIntervalMixin],

  getInitialState () {
    return {
      hovering: false,
      milliseconds: 0
    };
  },

  componentDidMount () {
    this.setInterval(this.tick, 10);
  },

  componentWillReceiveProps () {
    this.setState({
      milliseconds: 0
    });
  },

  tick () {
    this.setState({
      milliseconds: this.state.milliseconds + 10
    });
  },

  _handleMouseOver (label, value, x, y) {
    this.props.onHover(label, value, x, y);

    this.setState({
      hovering: true,
      milliseconds: this.props.animateOnHover ? 500 : this.state.milliseconds
    });
  },

  _handleMouseOut () {
    this.setState({
      hovering: false
    });
  },

  _handleOnClick () {
    this.props.onClick(this.props.value);
  },

  render () {
    const animateHeight = d3.ease('back-out', .5);
    const height = this.props.height * animateHeight(Math.min(1, this.state.milliseconds / 1000));
    const y = this.props.height - height + this.props.y;
    const style = {
      fill: this.state.hovering && this.props.hoverColor ? this.props.hoverColor : this.props.color,
      cursor: 'pointer'
    };

    return (
      <rect
        height={height}
        onClick={this._handleOnClick}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver.bind(null, this.props.label, this.props.value, this.props.x, y)}
        style={style}
        width={this.props.width}
        x={this.props.x}
        y={y}
      />
    );
  }
});


const BarChart = React.createClass({
  propTypes: {
    animateOnHover: React.PropTypes.bool,
    color: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    hoverColor: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      animateOnHover: false,
      color: StyleConstants.Colors.ASH,
      height: 300,
      hoverColor: StyleConstants.Colors.PRIMARY,
      onClick: () => {},
      onHover: () => {},
      width: 500
    };
  },

  shouldComponentUpdate (nextProps) {
    return !_isEqual(nextProps, this.props);
  },

  _renderLabels (barWidth) {
    const styles = this.styles();
    const labels = this.props.data.map(d => {
      return d.label;
    });
    const gap = 0.03;
    const spaceBetweenBars = this.props.width * gap;
    const totalWidth = barWidth * this.props.data.length + spaceBetweenBars;

    return labels.map((label, index) => {
      return (
        <span
          key={index}
          style={Object.assign({}, styles.label, { width: totalWidth / this.props.data.length })}
        >
          {label}
        </span>
      );
    });
  },

  render () {
    const styles = this.styles();
    const data = this.props.data.map(d => {
      return d.value;
    });

    const yScale = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, this.props.height]);

    const xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.03);

    let barWidth;
    const bars = data.map((point, index) => {
      const height = yScale(point);
      const y = this.props.height - height;
      const x = xScale(index);

      barWidth = xScale.rangeBand();

      return (
        <Rect
          animateOnHover={this.props.animateOnHover}
          color={this.props.color}
          height={height}
          hoverColor={this.props.hoverColor}
          key={index}
          label={this.props.data[index].label}
          onClick={this.props.onClick}
          onHover={this.props.onHover}
          value={point}
          width={barWidth}
          x={x}
          y={y}
        />
      );
    });

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <svg
          height={this.props.height}
          width={this.props.width}
        >
          <g>{bars}</g>
        </svg>
        <div>{this._renderLabels(barWidth)}</div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        display: 'block'
      },
      label: {
        display: 'inline-block',
        textAlign: 'center'
      }
    };
  }
});

module.exports = BarChart;