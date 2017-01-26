const React = require('react');
const _isEqual = require('lodash/isEqual');

const StyleConstants = require('../constants/Style');

const Bar = React.createClass({
  propTypes: {
    animateOnHover: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    height: React.PropTypes.number,
    hovering: React.PropTypes.bool,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    radius: React.PropTypes.number,
    value: React.PropTypes.number,
    width: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  getInitialState () {
    return {
      hovering: false
    };
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

  componentDidUpdate () {
    if (this.state.hovering && this.props.animateOnHover) {
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
    if (value > 0) {
      return 'M' + x + ',' + y +
         'h' + (width - radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius +
         'v' + (height - radius) +
         'h' + (-width) +
         'v' + (-height + radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
         'Z';
    } else {
      return 'M' + x + ',' + y +
         'h' + width +
         'v' + (height - radius) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius +
         'h' + (radius * 2 - width) +
         'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius +
         'v' + (radius - height) +
         'Z';
    }
  },

  _handleMouseOver () {
    this.setState({
      hovering: true
    });

    this.props.onMouseOver();
  },

  _handleMouseOut () {
    this.setState({
      hovering: false
    });

    this.props.onMouseOut();
  },

  render () {
    return (
      <path
        d={this._drawPath({
          x: this.props.x,
          y: this.props.y,
          width: this.props.width,
          height: this.props.height,
          value: this.props.value,
          radius: this.props.radius
        })}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
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
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    labelStyle: React.PropTypes.object,
    margin: React.PropTypes.shape({
      top: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      left: React.PropTypes.number
    }),
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    showTooltips: React.PropTypes.bool,
    style: React.PropTypes.object,
    tooltipFormat: React.PropTypes.func,
    width: React.PropTypes.number,
    xAxis: React.PropTypes.element,
    yAxis: React.PropTypes.element
  },

  getDefaultProps () {
    return {
      animateOnHover: false,
      height: 300,
      onClick: () => {},
      onHover: () => {},
      style: {},
      tooltipFormat: (val) => val,
      width: 500,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 20
      },
      showTooltips: true
    };
  },

  getInitialState () {
    return {
      hoveringObj: {}
    };
  },

  shouldComponentUpdate (nextProps, nextState) {
    return !_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state);
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
  },

  _handleMouseOut () {
    this.setState({
      hoveringObj: {}
    });
  },

  _getTooltipX () {
    if (Object.keys(this.state.hoveringObj).length) {
      const margin = this.props.margin;

      return this.state.hoveringObj.x + margin.left;
    }
    return -100;
  },

  _getTooltipY () {
    if (Object.keys(this.state.hoveringObj).length) {
      const margin = this.props.margin;

      if (this.state.hoveringObj.value < 0) {
        const y = this.state.hoveringObj.y + margin.top + this.state.hoveringObj.height + this.tooltip.getBBox().height;

        return y;
      }
      return this.state.hoveringObj.y + margin.top - this.tooltip.getBBox().height / 2;
    }
    return -100;
  },

  render () {
    const styles = this.styles();
    const { height, margin, width } = this.props;
    const widthMargin = width - margin.left - margin.right;
    const heightMargin = height - margin.top - margin.bottom;

    const data = this.props.data.map(d => {
      return d.value;
    });

    const domain = [Math.min.apply(null, data), Math.max.apply(null, data)];
    const xDomain = this.props.data.map(d => {
      return d.label;
    });

    const yFunc = d3.scale.linear()
      .domain(domain)
      .range([heightMargin, 0]);

    const xFunc = d3.scale.ordinal()
      .domain(xDomain)
      .rangeRoundBands([0, widthMargin], 0.2);

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <svg
          height={height}
          preserveAspectRatio='xMinYMin meet'
          width={width}
          xmlns={'http://www.w3.org/2000/svg'}
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            {this.props.data.map(d => {
              const x = xFunc(d.label);
              const y = (d.value > 0) ? yFunc(d.value) : yFunc(0);
              const w = xFunc.rangeBand();
              const h = Math.abs(yFunc(d.value) - yFunc(0));
              const baseStyle = Object.assign({}, this.props.style.bar, { fill: d.color });
              const style = (this.state.hoveringObj.value === d.value) ?
                Object.assign({}, baseStyle, this.props.style.barHover) :
                baseStyle;

              return (
                <Bar
                  animateOnHover={this.props.animateOnHover}
                  animationDuration={700}
                  height={h}
                  key={d.label + d.value}
                  onMouseOut={this._handleMouseOut}
                  onMouseOver={this._handleMouseOver.bind(null, x, y, w, h, d)}
                  radius={3}
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
          <g
            ref={(ref) => {
              this.tooltip = ref;
            }}
            transform={`translate(${this._getTooltipX()}, ${this._getTooltipY()})`}
          >
            {this.props.showTooltips ? (
              <text style={styles.tooltip}>
                {this.state.hoveringObj.value || 'placeholder'}
              </text>
            ) : null}
          </g>
        </svg>
      </div>
    );
  },

  styles () {
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
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        color: StyleConstants.Colors.CHARCOAL,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }
    };
  }
});

module.exports = BarChart;
