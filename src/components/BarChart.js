const React = require('react');
const numeral = require('numeral');
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
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
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

    this.setState({
      hovering: true,
      milliseconds: this.props.animateOnHover ? animateDuration : this.state.milliseconds
    });

    this.props.onMouseOver(label, value, x, y);
  },

  _handleMouseOut () {
    this.setState({
      hovering: false
    });

    this.props.onMouseOut();
  },

  render () {
    const animateHeight = d3.ease('back-out', 0.5);
    const height = this.props.height * animateHeight(Math.min(1, this.state.milliseconds / 1000));
    const y = this.props.height - height + this.props.y;
    const shift = this.props.value > 0 ? '3px' : '-3px';
    const style = {
      fill: this.state.hovering && this.props.primaryColor ? this.props.primaryColor : this.props.color,
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


class BarChart extends React.Component {
  static propTypes = {
    animateOnHover: React.PropTypes.bool,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    labelStyle: React.PropTypes.object,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
    tooltipFormat: React.PropTypes.string,
    tooltipStyle: React.PropTypes.object,
    width: React.PropTypes.number
  };

  static defaultProps = {
    animateOnHover: false,
    height: 300,
    onClick: () => {},
    onHover: () => {},
    primaryColor: StyleConstants.Colors.PRIMARY,
    tooltipFormat: '$0,0.00',
    width: 500
  };

  state = {
    hovering: false
  };

  shouldComponentUpdate (nextProps, nextState) {
    return !_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state);
  }

  _handleMouseOver = (label, value, x, y) => {
    this.setState({
      hovering: true,
      value,
      x,
      y
    });
  };

  _handleMouseOut = () => {
    this.setState({
      hovering: false
    });
  };

  _renderLabels = (barWidth, xScale) => {
    const styles = this.styles();

    return this.props.data.map((item, index) => {
      const xPos = xScale(index);
      const labelPos = {
        position: 'absolute',
        left: xPos,
        width: barWidth
      };

      return (
        <span
          key={index}
          style={Object.assign({}, styles.label, labelPos, this.props.labelStyle)}
        >
          {item.label}
        </span>
      );
    });
  };

  _renderBar = (yScale, xScale, barWidth, value, index, maxHeight) => {
    const height = Math.abs(yScale(value));
    const x = xScale(index);
    const y = value > 0 ? maxHeight - height : 0;

    return (
      <Rect
        animateOnHover={this.props.animateOnHover}
        color={this.props.data[index].color}
        height={height}
        key={index * value}
        label={this.props.data[index].label}
        onClick={this.props.onClick}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        primaryColor={this.props.primaryColor}
        value={value}
        width={barWidth}
        x={x}
        y={y}
      />
    );
  };

  render () {
    const styles = this.styles();
    const { height, width } = this.props;
    const data = this.props.data.map(d => {
      return d.value;
    });
    const gap = 0.3;
    const hasNegative = !!data.filter(value => value < 0).length;
    const hasPositive = !!data.filter(value => value > 0).length;
    let domain;
    let range;

    if (hasNegative && !hasPositive) {
      domain = [d3.min(data), 0];
      range = [-height, 0];
    } else if (!hasNegative && hasPositive) {
      domain = [0, d3.max(data)];
      range = [0, height];
    } else if (hasNegative && hasPositive) {
      const y0 = Math.max(Math.abs(d3.min(data)), Math.abs(d3.max(data)));

      domain = [-y0, y0];
      range = [-height / 2, height / 2];
    }
    const yScale = d3.scale.linear()
      .domain(domain)
      .range(range);

    const xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, width], gap);

    const barWidth = xScale.rangeBand();
    const maxHeight = Math.max.apply(null, range.map(Math.abs));
    const positiveBars = data.map((value, index) => {
      return value > 0 ? this._renderBar(yScale, xScale, barWidth, value, index, maxHeight) : null;
    });

    const negativeBars = data.map((value, index) => {
      return value < 0 ? this._renderBar(yScale, xScale, barWidth, value, index, maxHeight) : null;
    });

    const maxHeightForPositiveBars = hasPositive ? yScale(d3.max(data)) : 0;
    const maxHeightForNegativeBars = hasNegative ? yScale(Math.abs(d3.min(data))) : 0;
    const tooltipMargin = 20;
    const tooltipWidth = barWidth * 1.5;
    const tooltipXPos = (tooltipWidth - barWidth) / 2;
    const tooltipYPos = maxHeightForPositiveBars > 0 ? maxHeightForPositiveBars - tooltipMargin : -1 * tooltipMargin;
    const tooltipStyle = {
      left: this.state.x - tooltipXPos,
      top: this.state.value > 0 ? this.state.y - tooltipMargin : tooltipYPos,
      width: tooltipWidth
    };

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <svg height={maxHeightForPositiveBars} width={width}>
          {positiveBars}
        </svg>
        <svg height={maxHeightForNegativeBars} width={width}>
          <g>{negativeBars}</g>
        </svg>
        <div>
          {this._renderLabels(barWidth, xScale)}
        </div>
        {this.state.hovering ? (
          <span style={Object.assign({}, styles.tooltip, tooltipStyle, this.props.tooltipStyle)}>
            {this.props.tooltipFormat ? numeral(this.state.value).format(this.props.tooltipFormat) : this.state.value}
          </span>) : null}
      </div>
    );
  }

  styles = () => {
    return {
      component: {
        display: 'block',
        position: 'relative'
      },
      label: {
        color: StyleConstants.Colors.ASH,
        display: 'inline-block',
        fontSize: StyleConstants.FontSizes.SMALL,
        textAlign: 'center'
      },
      tooltip: {
        color: this.props.primaryColor,
        fontSize: StyleConstants.FontSizes.LARGE,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        position: 'absolute',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }
    };
  };
}

module.exports = BarChart;
