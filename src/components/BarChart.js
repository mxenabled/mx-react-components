const React = require('react');
const _isEqual = require('lodash/isEqual');
const _merge = require('lodash/merge');
const _omit = require('lodash/omit');
const _functions = require('lodash/functions');

const StyleConstants = require('../constants/Style');

const Bar = React.createClass({
  propTypes: {
    animateOnHover: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    hasNegative: React.PropTypes.bool,
    hasPositive: React.PropTypes.bool,
    height: React.PropTypes.number,
    hovering: React.PropTypes.bool,
    minBarHeight: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    radius: React.PropTypes.number,
    value: React.PropTypes.number,
    width: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  componentDidMount () {
    if (this.props.animationDuration) {
      const transform = this._getTransformWithScale(0);

      d3.select(this.bar)
        .attr('transform', transform)
      .transition()
        .duration(this.props.animationDuration)
        .attr('transform', 'scale(1)');
    }
  },

  shouldComponentUpdate (nextProps) {
    return !_isEqual(_omit(nextProps, _functions(nextProps)), _omit(this.props, _functions(this.props)));
  },

  componentDidUpdate () {
    if (this.props.hovering && this.props.animateOnHover) {
      const transform = this._getTransformWithScale(0.9);

      d3.select(this.bar)
        .transition()
          .duration(100)
          .attr('transform', transform)
        .transition()
          .duration(100)
          .attr('transform', 'scale(1)');
    }
  },

  _getTransformWithScale (factor) {
    const centerX = 0;
    const centerY = (this.props.value > 0) ? this.props.y + this.props.height : this.props.y;
    const sx = -centerX * (factor - 1);
    const sy = -centerY * (factor - 1);

    return `translate(${sx},${sy}) scale(1, ${factor})`;
  },

  _drawPath ({ x, y, width, height, value, radius }) {
    if (value > 0 || (value === 0 && !this.props.hasNegative)) {
      return 'M' + x + ',' + y +
         'h' + (width - radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius +
         'v' + (height - radius) +
         'h' + (-width) +
         'v' + (-height + radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
         'Z';
    } else if (value < 0 || (value === 0 && !this.props.hasPositive)) {
      return 'M' + x + ',' + y +
         'h' + width +
         'v' + (height - radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius +
         'h' + (radius * 2 - width) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius +
         'v' + (radius - height) +
         'Z';
    } else {
      return 'M' + x + ',' + y +
         'h' + (width - radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius +
         'v' + (height - radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius +
         'h' + (radius * 2 - width) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius +
         'v' + (radius - height) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
         'Z';
    }
  },

  render () {
    const hasMinBarHeight = this.props.height === 0 && this.props.minBarHeight;
    const divisor = this.props.hasNegative && this.props.hasPositive ? 2 : 1;

    let y = this.props.y;

    if (hasMinBarHeight) {
      if (this.props.hasNegative && !this.props.hasPositive) {
        y = 0;
      } else {
        y = this.props.y - (this.props.minBarHeight / divisor);
      }
    }

    return (
      <path
        d={this._drawPath({
          x: this.props.x,
          y,
          width: this.props.width,
          height: this.props.height,
          value: this.props.value,
          radius: this.props.radius
        })}
        onClick={this.props.onClick}
        onMouseOut={this.props.onMouseOut}
        onMouseOver={this.props.onMouseOver}
        ref={ref => {
          this.bar = ref;
        }}
        style={this.props.style}
      />
    );
  }
});

const BarChart = React.createClass({
  propTypes: {
    animateOnHover: React.PropTypes.bool,
    barRadius: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    initialSelectedData: React.PropTypes.object,
    margin: React.PropTypes.shape({
      top: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      left: React.PropTypes.number
    }),
    minBarHeight: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    showTooltips: React.PropTypes.bool,
    style: React.PropTypes.object,
    threshold: React.PropTypes.number,
    tooltipFormat: React.PropTypes.func,
    width: React.PropTypes.number,
    xAxis: React.PropTypes.element,
    yAxis: React.PropTypes.element
  },

  getDefaultProps () {
    return {
      animateOnHover: false,
      barRadius: 3,
      height: 300,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 20
      },
      minBarHeight: 0,
      onClick: () => {},
      onHover: () => {},
      style: {},
      tooltipFormat: (val) => val,
      width: 500,
      showTooltips: true
    };
  },

  getInitialState () {
    return {
      hoveringObj: {},
      clickedData: this.props.initialSelectedData || {},
      hasNegative: false,
      hasPositive: false
    };
  },

  componentWillMount () {
    this._hasPositiveOrNegativeValues();
  },

  shouldComponentUpdate (nextProps, nextState) {
    return !_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state);
  },

  componentDidUpdate () {
    let transform;

    if (Object.keys(this.state.hoveringObj).length) {
      const x = this._getTooltipX();
      const y = this._getTooltipY();

      transform = `translate(${x}, ${y})`;
    } else {
      transform = 'translate(-1000, -1000)';
    }

    d3.select(this.tooltip)
      .attr('transform', transform);
  },

  _hasPositiveOrNegativeValues () {
    let hasNegative = false;
    let hasPositive = false;

    this.props.data.forEach(d => {
      if (!hasNegative && d.value < 0) {
        hasNegative = true;
      } else if (!hasPositive && d.value > 0) {
        hasPositive = true;
      }
      return d.value;
    });

    this.setState({
      hasNegative,
      hasPositive
    });
  },

  _handleMouseOver (x, y, width, height, data) {
    this.setState({
      hoveringObj: {
        x,
        y,
        width,
        height,
        value: data.value,
        label: data.label
      }
    });

    this.props.onHover(data);
  },

  _handleMouseOut () {
    this.setState({
      hoveringObj: {}
    });
  },

  _handleOnClick (data) {
    this.setState({
      clickedData: data
    });

    this.props.onClick(data);
  },

  _getTooltipX () {
    if (Object.keys(this.state.hoveringObj).length) {
      const margin = this.props.margin;
      const bb = this.tooltip.getBBox();
      const hoveringObj = this.state.hoveringObj;

      // Center the tooltip on the X Axis of the bar width
      const hoverCX = hoveringObj.width / 2 + hoveringObj.x + margin.left;
      const tooltipCX = bb.width / 2;

      return hoverCX - tooltipCX;
    }
    return -1000;
  },

  _getTooltipY () {
    if (Object.keys(this.state.hoveringObj).length) {
      const margin = this.props.margin;
      const negativeValue = this.state.hoveringObj.value < 0;
      const positiveValue = this.state.hoveringObj.value > 0;
      const tooltipHeight = this.state.hoveringObj.y + margin.top;
      const bboxHeight = this.tooltip.getBBox().height;
      const negativeHeightAdjustment = this.state.hoveringObj.height + bboxHeight;
      const positiveHeightAdjustment = tooltipHeight - bboxHeight / 2;
      const { hasNegative, hasPositive } = this.state;
      const divisor = hasNegative && hasPositive ? 2 : 1;

      if (negativeValue) {
        return tooltipHeight + negativeHeightAdjustment;
      } else if (positiveValue) {
        return positiveHeightAdjustment;
      } else {
        if (hasNegative && !hasPositive) {
          return negativeHeightAdjustment + this.props.minBarHeight + tooltipHeight;
        }
        return positiveHeightAdjustment - this.props.minBarHeight / divisor;
      }
    }
    return -1000;
  },

  _getHeight (baseHeight) {
    if (this.props.minBarHeight) {
      const adjuster = this.props.barRadius > this.props.minBarHeight ? this.props.barRadius : this.props.minBarHeight;

      return baseHeight + adjuster;
    } else {
      return baseHeight;
    }
  },

  render () {
    const styles = _merge({}, this.styles(), this.props.style);
    const { height, margin, width } = this.props;
    const widthMargin = width - margin.left - margin.right;
    const heightMargin = height - margin.top - margin.bottom;
    const { hasNegative, hasPositive } = this.state;
    const data = this.props.data.reduce((acc, d) => {
      return acc.concat(d.value);
    }, []);
    let yDomain;

    if (hasNegative && hasPositive) {
      yDomain = [Math.min.apply(null, data), Math.max.apply(null, data)];
    } else if (hasNegative && !hasPositive) {
      yDomain = [Math.min.apply(null, data), 0];
    } else {
      yDomain = [0, Math.max.apply(null, data)];
    }

    const xDomain = this.props.data.map(d => {
      return d.label;
    });

    const yFunc = d3.scale.linear()
      .domain(yDomain)
      .range([heightMargin, 0]);

    const xFunc = d3.scale.ordinal()
      .domain(xDomain)
      .rangeRoundBands([0, widthMargin], 0.2);

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <svg
          height={height + margin.top + margin.bottom}
          preserveAspectRatio='xMinYMin meet'
          width={width + margin.left + margin.right}
          xmlns={'http://www.w3.org/2000/svg'}
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            {this.props.data.map(d => {
              if (d.value === 0 && !this.props.minBarHeight) {
                return null;
              }

              const positive = (d.value > 0);
              const x = xFunc(d.label);
              const y = positive ? yFunc(d.value) : yFunc(0);
              const w = xFunc.rangeBand();
              const baseHeight = hasNegative ? Math.abs(yFunc(d.value) - yFunc(0)) : heightMargin - yFunc(d.value);
              const h = this._getHeight(baseHeight);
              const key = d.label + d.value;
              const clicked = this.state.clickedData.value === d.value && this.state.clickedData.label === d.label;
              const hovering = this.state.hoveringObj.value === d.value && this.state.hoveringObj.label === d.label;
              const baseStyle = d.color ? Object.assign({}, styles.bar, { fill: d.color }) : styles.bar;
              let style;

              if (clicked) {
                style = Object.assign({}, baseStyle, positive ? styles.positiveBarClicked : styles.negativeBarClicked);
              } else if (hovering) {
                style = Object.assign({}, baseStyle, positive ? styles.positiveBarHover : styles.negativeBarHover);
              } else {
                style = baseStyle;
              }

              return (
                <Bar
                  animateOnHover={this.props.animateOnHover}
                  animationDuration={700}
                  clicked={clicked}
                  hasNegative={hasNegative}
                  hasPositive={hasPositive}
                  height={h}
                  hovering={hovering}
                  key={key}
                  minBarHeight={this.props.minBarHeight}
                  onClick={this._handleOnClick.bind(null, d)}
                  onMouseOut={this._handleMouseOut}
                  onMouseOver={this._handleMouseOver.bind(null, x, y, w, h, d)}
                  radius={this.props.barRadius}
                  style={style}
                  value={d.value}
                  width={w}
                  x={x}
                  y={y}
                />
              );
            })}
          </g>
          {this.props.yAxis ? this.props.yAxis : null}
          {this.props.xAxis ? this.props.xAxis : null}
          {this.props.threshold ? (
            <g transform={`translate(${margin.left},${margin.top})`}>
              <line
                style={styles.threshold}
                x1={0}
                x2={width - margin.left - margin.right}
                y1={yFunc(this.props.threshold)}
                y2={yFunc(this.props.threshold)}
              />
            </g>
          ) : null }
          <g
            ref={(ref) => {
              this.tooltip = ref;
            }}
            style={styles.tooltipContainer}
          >
            <text style={styles.tooltipText}>
              {this.props.tooltipFormat(this.state.hoveringObj.value)}
            </text>
          </g>
        </svg>
      </div>
    );
  },

  styles () {
    return {
      bar: {
        fill: StyleConstants.Colors.FOG
      },
      positiveBarHover: {
        fill: StyleConstants.Colors.PRIMARY
      },
      negativeBarHover: {
        fill: StyleConstants.Colors.PRIMARY
      },
      positiveBarClicked: {
        fill: StyleConstants.Colors.PRIMARY
      },
      negativeBarClicked: {
        fill: StyleConstants.Colors.PRIMARY
      },
      tooltipContainer: {

      },
      tooltipText: {
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        color: StyleConstants.Colors.CHARCOAL,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      },
      threshold: {
        stroke: StyleConstants.Colors.ASH,
        strokeDasharray: '4,4',
        strokeWidth: 1
      }
    };
  }
});

module.exports = BarChart;
