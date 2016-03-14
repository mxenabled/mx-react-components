const _isEqual = require('lodash');
const React = require('react');
const Radium = require('radium');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const DonutChart = React.createClass({
  propTypes: {
    activeOffset: React.PropTypes.number,
    animateOnHover: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    animationTypeOnLoad: React.PropTypes.oneOf(['roll', 'pop']),
    arcWidth: React.PropTypes.number,
    baseArcColor: React.PropTypes.string,
    chartTotal: React.PropTypes.number,
    children: React.PropTypes.node,
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    dataPointColors: React.PropTypes.array,
    dataPointRadius: React.PropTypes.number,
    dataPoints: React.PropTypes.array,
    defaultLabelText: React.PropTypes.string,
    defaultLabelValue: React.PropTypes.string,
    formatter: React.PropTypes.func,
    height: React.PropTypes.number,
    hoverExpandDistance: React.PropTypes.number,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    opacity: React.PropTypes.number,
    padAngle: React.PropTypes.number,
    showBaseArc: React.PropTypes.bool,
    showDataLabel: React.PropTypes.bool,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      activeOffset: 0,
      animateOnHover: false,
      animationDuration: 500,
      arcWidth: 10,
      baseArcColor: StyleConstants.Colors.BASE_ARC,
      colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
      data: [],
      dataPointColors: [StyleConstants.Colors.LIME].concat(d3.scale.category20b().range()),
      dataPointRadius: 5,
      dataPoints: [],
      formatter (value) {
        return value;
      },
      height: 150,
      hoverExpandDistance: 5,
      id: 'donut-chart',
      onClick () {},
      opacity: 1,
      padAngle: 0.02,
      showBaseArc: true,
      showDataLabel: true,
      width: 150
    };
  },

  componentWillMount () {
    this._setupD3Functions();
  },

  componentDidMount () {
    if (this.props.data.length) {
      this._animateChart();
    }
  },

  componentWillReceiveProps (newProps) {
    if (!_isEqual(this.props.data, newProps.data) && this.props.data.length) {
      this._setupD3Functions();
      this._animateChart();
    }
  },

  _setupD3Functions () {
    const dataSets = this.props.data.map(item => {
      return item.value;
    });
    const valueTotal = dataSets.reduce((a, b) => {
      return a + b;
    });
    const endAngle = this.props.chartTotal ? valueTotal / this.props.chartTotal : 1;
    const pie = d3.layout.pie().sort(null).padAngle(this.props.padAngle).endAngle(endAngle * 2 * Math.PI);
    const values = pie(dataSets);
    const radius = Math.min(this.props.width, this.props.height) / 2.2;
    const standardArc = d3.svg.arc().outerRadius(radius - this.props.activeOffset).innerRadius(radius - this.props.arcWidth);
    const hoveredArc = d3.svg.arc().outerRadius(radius + this.props.hoverExpandDistance).innerRadius(radius - this.props.arcWidth);
    const baseArc = d3.svg.arc().outerRadius(radius - this.props.activeOffset).innerRadius(radius - this.props.arcWidth).startAngle(0).endAngle(2 * Math.PI);
    const bounceArcAnimationStart = d3.svg.arc().outerRadius(10).innerRadius(5);
    const bounceArcAnimationStartPaths = values.map(point => {
      return bounceArcAnimationStart(point);
    });

    this.setState({
      baseArc,
      endAngle,
      hoveredArc,
      pie,
      radius,
      standardArc,
      values,
      bounceArcAnimationStartPaths
    });
  },

  _animateChart () {
    switch (this.props.animationTypeOnLoad) {
      case 'roll':
        this._rollAnimate();
        break;
      case 'pop':
        this._bounceAnimate();
        break;
      default:
        break;
    }
  },

  _bounceAnimate () {
    d3.selectAll('.arc-' + this.props.id)
      .transition()
      .ease('bounce')
      .duration(this.props.animationDuration)
      .attrTween('d', (d, i, a) => {
        return d3.interpolate(this.state.bounceArcAnimationStartPaths[i], a);
      });
  },

  _rollAnimate () {
    d3.selectAll('.arc-' + this.props.id)
      .transition()
      .ease('bounce')
      .duration(this.props.animationDuration)
      .attrTween('transform', function () {
        return d3.interpolateString('rotate(0)', 'rotate(360)');
      });
  },

  _handleClick () {

  },

  _handleMouseEnter (point) {
    if (this.props.animateOnHover) {
      d3.select(this.refs[point.ref]).transition().duration(500).attr('d', this.state.hoveredArc(point.arc));
    }
  },

  _handleMouseLeave (point) {
    if (this.props.animateOnHover) {
      d3.select(this.refs[point.ref]).transition().duration(500).attr('d', this.state.standardArc(point.arc));
    }
  },

  _renderArcs () {
    if (this.props.data.length) {
      return this.state.values.map((point, i) => {
        return (
          <g
            key={i}
            onClick={this._handleClick.bind(null, i)}
            onMouseEnter={this._handleMouseEnter.bind(null, { arc: point, ref: 'arc-' + this.props.id + i })}
            onMouseLeave={this._handleMouseLeave.bind(null, { arc: point, ref: 'arc-' + this.props.id + i })}
          >
            <path
              className={'arc-' + this.props.id}
              d={this.state.standardArc(point)}
              fill={this.props.colors[i]}
              opacity={this.props.opacity}
              ref={'arc-' + this.props.id + i}
            />
          </g>
        );
      });
    } else {
      return null;
    }
  },

  _renderBaseArc () {
    if (this.props.showBaseArc) {
      return (
        <g>
          <path d={this.state.baseArc()} fill={this.props.baseArcColor}></path>
        </g>
      );
    } else {
      return null;
    }
  },

  _renderDataPoints () {
    const dataPoints = this.props.dataPoints.map(dataPoint => {
      return dataPoint.value;
    });

    return dataPoints.map((dataPoint, index) => {
      const endAngle = dataPoint / this.props.chartTotal;

      const dataPointArc = d3.svg.arc()
        .outerRadius(this.state.radius - this.props.activeOffset)
        .innerRadius(this.state.radius - this.props.arcWidth)
        .startAngle(0)
        .endAngle(endAngle * 2 * 2 * Math.PI);

      return (
        <circle
          cx='0'
          cy='0'
          fill={this.props.dataPointColors[index]}
          key={index}
          r={this.props.dataPointRadius}
          transform={'translate(' + dataPointArc.centroid() + ')'}
        />
      );
    });
  },

  _renderDataLabel () {
    if (this.props.showDataLabel) {
      if (this.props.children) {
        return (
          <div
            className='mx-donutchart-data'
            onClick={this._handleClick}
            style={styles.center}
          >
            {this.props.children}
          </div>
        );
      } else {
        const activeDataSet = this.props.data[this.state.activeIndex] || {};
        const color = this.state.activeIndex === -1 ? this.props.colors[0] : this.props.colors[this.state.activeIndex];
        const text = this.state.activeIndex === -1 ? this.props.defaultLabelText : activeDataSet.name;
        const value = this.state.activeIndex === -1 ? this.props.formatter(this.props.defaultLabelValue) : this.props.formatter(activeDataSet.value);

        return (
          <div
            className='mx-donutchart-data'
            onClick={this._handleClick}
            style={styles.center}
          >
            <div className='mx-donutchart-data-value' style={[styles.value, { color }]}>
              {value}
            </div>
            <div className='mx-donutchart-data-label' style={styles.label}>
              {text}
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  },

  render () {
    const position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';
    const fontSize = Math.min(this.props.width, this.props.height) * 0.2 + 'px';

    return (
      <div
        className='mx-donutchart'
        style={[styles.component, this.props.style, { fontSize, height: this.props.height, width: this.props.width }]}
      >
        {this._renderDataLabel()}
        <svg
          className='mx-donutchart-svg'
          height={this.props.height}
          ref={this.props.id}
          width={this.props.width}
        >
          <g className='mx-donutchart-g' transform={position}>
            {this._renderBaseArc()}
            {this._renderArcs()}
            {this._renderDataPoints()}
          </g>
        </svg>
      </div>
    );
  }
});

const styles = {
  component: {
    position: 'relative',
    fontFamily: StyleConstants.FontFamily
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)'
  },
  label: {
    color: StyleConstants.Colors.FOG,
    fontSize: '0.4em',
    marginTop: '5px'
  },
  value: {
    fontWeight: 300
  }
};

module.exports = Radium(DonutChart);
