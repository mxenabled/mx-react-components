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

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        milliseconds: 0
      });
    }
  },

  tick () {
    this.setState({
      milliseconds: this.state.milliseconds + 10
    });
  },

  _handleMouseOver (label, value, x, y) {
    const animateDuration = 500;

    this.props.onHover(label, value, x, y);

    this.setState({
      hovering: true,
      milliseconds: this.props.animateOnHover ? animateDuration : this.state.milliseconds
    });
  },

  _handleMouseOut () {
    this.setState({
      hovering: false
    });
  },

  render () {
    const animateHeight = d3.ease('back-out', 0.5);
    const height = this.props.height * animateHeight(Math.min(1, this.state.milliseconds / 1000));
    const y = this.props.height - height + this.props.y;
    const shift = this.props.value > 0 ? '3px' : '-3px';
    const style = {
      fill: this.state.hovering && this.props.hoverColor ? this.props.hoverColor : this.props.color,
      cursor: 'pointer',
      transform: 'translateY(' + shift + ')'
    };

    return (
      <rect
        height={height}
        onClick={this.props.onClick.bind(null, this.props.value, this.props.label)}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver.bind(null, this.props.label, this.props.value, this.props.x, y)}
        rx={3}
        ry={3}
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
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    hoverColor: React.PropTypes.string,
    labelStyle: React.PropTypes.object,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      animateOnHover: false,
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

  _renderLabels (barWidth, gap) {
    const styles = this.styles();
    const labels = this.props.data.map(d => {
      return d.label;
    });
    const spaceBetweenBars = this.props.width * gap;
    const totalWidth = barWidth * this.props.data.length + spaceBetweenBars;

    return labels.map((label, index) => {
      return (
        <span
          key={index}
          style={Object.assign({}, styles.label, { width: totalWidth / this.props.data.length }, this.props.labelStyle)}
        >
          {label}
        </span>
      );
    });
  },

  _renderBar (yScale, xScale, barWidth, value, index) {
    const height = value < 0 ? Math.abs(yScale(value) - yScale(0)) : yScale(value);
    const x = xScale(index);
    const y = value > 0 ? this.props.height - height : 0;

    return (
      <Rect
        animateOnHover={this.props.animateOnHover}
        color={this.props.data[index].color}
        height={height}
        hoverColor={this.props.hoverColor}
        key={index * value}
        label={this.props.data[index].label}
        onClick={this.props.onClick}
        onHover={this.props.onHover}
        value={value}
        width={barWidth}
        x={x}
        y={y}
      />
    );
  },

  render () {
    const styles = this.styles();
    const { height, width } = this.props;
    const data = this.props.data.map(d => {
      return d.value;
    });
    const gap = 0.3;
    const y0 = Math.max(Math.abs(d3.min(data)), Math.abs(d3.max(data)));

    const yScale = d3.scale.linear()
      .domain([-y0, y0])
      .range([0, height]);

    const xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, width], gap);
    const barWidth = xScale.rangeBand();

    const positiveBars = data.map((value, index) => {
      if (value > 0) {
        return this._renderBar(yScale, xScale, barWidth, value, index);
      } else {
        return null;
      }
    });

    const negativeBars = data.map((value, index) => {
      if (value < 0) {
        return this._renderBar(yScale, xScale, barWidth, value, index);
      } else {
        return null;
      }
    });

    const pHeight = d3.max(data) > 0 ? yScale(d3.max(data)) : 0;
    const nHeight = d3.min(data) < 0 ? yScale(Math.abs(d3.min(data))) - yScale(0) : 0;

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <div>
          <svg height={pHeight} width={width}>
            <g>{positiveBars}</g>
          </svg>
        </div>
        <div>
          <svg height={nHeight} width={width}>
            <g>{negativeBars}</g>
          </svg>
        </div>
        <div style={styles.labelWrapper}>{this._renderLabels(barWidth, gap)}</div>

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
      },
      labelWrapper: {
        margin: this.props.width * 0.014
      }
    };
  }
});

module.exports = BarChart;