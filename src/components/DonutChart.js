const _isEqual = require('lodash/isEqual');
const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const d3 = require('d3');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class DonutChart extends React.Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    activeOffset: PropTypes.number,
    animateOnHover: PropTypes.bool,
    animationDuration: PropTypes.number,
    animationTypeOnLoad: PropTypes.oneOf(['roll', 'pop']),
    arcWidth: PropTypes.number,
    baseArcColor: PropTypes.string,
    chartTotal: PropTypes.number,
    children: PropTypes.node,
    colors: PropTypes.array,
    data: PropTypes.array.isRequired,
    dataPointColors: PropTypes.array,
    dataPointRadius: PropTypes.number,
    dataPoints: PropTypes.array,
    defaultLabelText: PropTypes.string,
    defaultLabelValue: PropTypes.string,
    formatter: PropTypes.func,
    height: PropTypes.number,
    id: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    opacity: PropTypes.number,
    padAngle: PropTypes.number,
    showBaseArc: PropTypes.bool,
    showDataLabel: PropTypes.bool,
    theme: themeShape,
    width: PropTypes.number
  };

  static defaultProps = {
    activeIndex: -1,
    activeOffset: 0,
    animateOnHover: false,
    animationDuration: 500,
    arcWidth: 10,
    data: [],
    dataPointRadius: 5,
    dataPoints: [],
    formatter (value) {
      return value;
    },
    height: 150,
    id: 'donut-chart',
    onClick () {},
    onMouseEnter () {},
    onMouseLeave () {},
    opacity: 1,
    padAngle: 0.02,
    showBaseArc: true,
    showDataLabel: true,
    width: 150
  };

  state = {
    activeIndex: this.props.activeIndex || -1
  };

  componentWillMount () {
    this._setupD3Functions(this.props);
  }

  componentDidMount () {
    this._animateChart();
  }

  componentWillReceiveProps (newProps) {
    this._setupD3Functions(newProps);

    if (newProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: newProps.activeIndex
      });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  componentDidUpdate (prevProps) {
    if (!_isEqual(prevProps.data, this.props.data)) {
      this._animateChart();
    }

    if (!_isEqual(prevProps.activeIndex, this.props.activeIndex)) {
      this._animateActiveArc(prevProps.activeIndex, this.props.activeIndex);
    }
  }

  _setupD3Functions = (props) => {
    const dataSets = props.data.map(item => {
      return item.value;
    });
    const valueTotal = dataSets.length ? dataSets.reduce((a, b) => {
      return a + b;
    }) : 0;
    const endAngle = props.chartTotal ? valueTotal / props.chartTotal : 1;
    const pie = d3.layout.pie().sort(null).padAngle(props.padAngle).endAngle(endAngle * 2 * Math.PI);
    const values = pie(dataSets);
    const radius = Math.min(props.width, props.height) / 2;
    const standardArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth);
    const hoveredArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - props.arcWidth);
    const baseArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth).startAngle(0).endAngle(2 * Math.PI);
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
  };

  _animateChart = () => {
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
  };

  _animateActiveArc = (currentActiveIndex, nextActiveIndex) => {
    const currentArcData = this.state.values[currentActiveIndex];
    const nextArcData = this.state.values[nextActiveIndex];

    if (currentArcData) {
      d3.select(this['arc-' + this.props.id + currentActiveIndex]).transition('currentArc').duration(200).attr('d', this.state.standardArc(currentArcData));
    }

    if (nextArcData) {
      d3.select(this['arc-' + this.props.id + nextActiveIndex]).transition('nextArc').duration(200).attr('d', this.state.hoveredArc(nextArcData));
    }
  };

  _bounceAnimate = () => {
    d3.selectAll('.arc-' + this.props.id)
      .transition('bounce')
      .ease(t => {
        // See Penner's Equation and D3 docs on custom easing function
        // for details on variable names.
        const constantMultiplier = 2;
        const maxValue = 1;
        const timePadding = 0.9;
        let time = t;
        let value = 0;

        const b0 = maxValue - time;
        const b1 = b0 * (maxValue - b0) + b0;
        const b2 = b0 * (maxValue - b1) + b1;
        const x0 = constantMultiplier * Math.sqrt(time);
        const x1 = x0 * Math.sqrt(time);
        const x2 = x1 * Math.sqrt(time) + timePadding;
        const t0 = maxValue / (maxValue + x0 + x1 + x2);
        const t1 = t0 + t0 * x0;
        const t2 = t1 + t0 * x1;
        const m0 = t0 + t0 * x0 / constantMultiplier;
        const m1 = t1 + t0 * x1 / constantMultiplier;
        const m2 = t2 + t0 * x2 / constantMultiplier;
        const a = maxValue / (t0 * t0);

        switch (true) {
          case time >= (maxValue - time):
            value = maxValue;
            break;
          case time < t0:
            value = a * time * time;
            break;
          case time < t1:
            value = a * (time -= m0) * time + b0;
            break;
          case time < t2:
            value = a * (time -= m1) * time + b1;
            break;
          default:
            value = a * (time -= m2) * time + b2;
            break;
        }

        return value;
      })
      .duration(this.props.animationDuration)
      .attrTween('d', (d, i, a) => {
        return d3.interpolate(this.state.bounceArcAnimationStartPaths[i], a);
      });
  };

  _rollAnimate = () => {
    d3.selectAll('.arc-' + this.props.id)
      .transition('roll')
      .duration(this.props.animationDuration)
      .attrTween('transform', function () {
        return d3.interpolateString('rotate(0)', 'rotate(360)');
      });
  };

  _handleClick = (index, event) => {
    this.props.onClick(this.props.data[index], event);
  };

  _handleMouseEnter = (point) => {
    if (this.props.animateOnHover && this.state.activeIndex !== point.index) {
      d3.select(this[point.ref]).transition('mouseEnter').duration(200).attr('d', this.state.hoveredArc(point.arc));
    }

    this.props.onMouseEnter(this.props.data[point.index], point.index);

    this.setState({
      activeIndex: point.index
    });
  };

  _handleMouseLeave = (point) => {
    if (this.props.animateOnHover) {
      d3.select(this[point.ref]).transition('mouseLeave').duration(200).attr('d', this.state.standardArc(point.arc));
    }

    this.props.onMouseLeave();

    this.setState({
      activeIndex: -1
    });
  };

  _renderArcs = (colors) => {
    return this.state.values.map((point, i) => {
      return (
        <g
          key={i}
          onClick={this._handleClick.bind(null, i)}
          onMouseEnter={this._handleMouseEnter.bind(null, { arc: point, index: i, ref: 'arc-' + this.props.id + i })}
          onMouseLeave={this._handleMouseLeave.bind(null, { arc: point, index: i, ref: 'arc-' + this.props.id + i })}
        >
          <path
            className={'arc-' + this.props.id}
            d={this.state.standardArc(point)}
            fill={colors[i]}
            opacity={this.props.opacity}
            ref={(ref) => {
              this['arc-' + this.props.id + i] = ref;
            }}
          />
        </g>
      );
    });
  };

  _renderBaseArc = (baseArcColor) => {
    if (this.props.showBaseArc) {
      return (
        <g>
          <path d={this.state.baseArc()} fill={baseArcColor} />
        </g>
      );
    } else {
      return null;
    }
  };

  _renderDataPoints = (dataPointColors) => {
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
          fill={dataPointColors[index]}
          key={index}
          r={this.props.dataPointRadius}
          transform={'translate(' + dataPointArc.centroid() + ')'}
        />
      );
    });
  };

  _renderDataLabel = (styles, colors) => {
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
        const color = this.state.activeIndex === -1 ? colors[0] : colors[this.state.activeIndex];
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
  };

  render () {
    const position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';
    const fontSize = Math.min(this.props.width, this.props.height) * 0.2;
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    const colors = this.props.colors || [theme.Colors.PRIMARY].concat(d3.scale.category20().range());
    const baseArcColor = this.props.baseArcColor || theme.Colors.BASE_ARC;
    const dataPointColors = this.props.dataPointColors || [theme.Colors.SUCCESS].concat(d3.scale.category20b().range());

    return (
      <div
        className='mx-donutchart'
        style={[styles.component, this.props.style, { fontSize, height: this.props.height, width: this.props.width }]}
      >
        {this._renderDataLabel(styles, colors)}
        <svg
          className='mx-donutchart-svg'
          height={this.props.height}
          width={this.props.width}
        >
          <g className='mx-donutchart-g' transform={position}>
            {this._renderBaseArc(baseArcColor)}
            {this._renderArcs(colors)}
            {this._renderDataPoints(dataPointColors)}
          </g>
        </svg>
      </div>
    );
  }

  styles = (theme) => {
    return {
      component: {
        position: 'relative',
        fontFamily: theme.FontFamily
      },
      center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)'
      },
      label: {
        color: theme.Colors.GRAY_500,
        fontSize: '0.4em',
        marginTop: 5
      },
      value: {
        fontWeight: 300
      }
    };
  };
}

module.exports = Radium(DonutChart);
