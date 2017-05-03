const _isEqual = require('lodash/isEqual');
const PropTypes = require('prop-types');
const React = require('react');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const Gauge = React.createClass({
  propTypes: {
    activeOffset: PropTypes.number,
    arcWidth: PropTypes.number,
    baseArcColor: PropTypes.string,
    chartTotal: PropTypes.number,
    children: PropTypes.node,
    colors: PropTypes.array,
    data: PropTypes.array.isRequired,
    dataPointColors: PropTypes.array,
    dataPointRadius: PropTypes.number,
    dataPoints: PropTypes.array,
    formatter: PropTypes.func,
    height: PropTypes.number,
    id: PropTypes.string,
    numberLabel: PropTypes.string,
    numberLabelColor: PropTypes.string,
    numberOfSegments: PropTypes.number,
    opacity: PropTypes.number,
    padAngle: PropTypes.number,
    showBaseArc: PropTypes.bool,
    showDataLabel: PropTypes.bool,
    textLabel: PropTypes.string,
    textLabelColor: PropTypes.string,
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
      activeOffset: 0,
      arcWidth: 10,
      baseArcColor: StyleConstants.Colors.BASE_ARC,
      colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
      data: [],
      dataPointColors: [StyleConstants.Colors.CHARCOAL].concat(d3.scale.category20b().range()),
      dataPointRadius: 5,
      dataPoints: [],
      formatter (value) {
        return value;
      },
      numberLabelColor: StyleConstants.Colors.PRIMARY,
      height: 150,
      id: 'gauge',
      numberOfSegments: 6,
      opacity: 1,
      padAngle: 0.02,
      showBaseArc: true,
      showDataLabel: true,
      textLabelColor: StyleConstants.Colors.ASH,
      width: 150
    };
  },

  getInitialState () {
    return {
      radiansMultiplier: (Math.PI / 180)
    };
  },

  componentWillMount () {
    this._setupD3Functions(this.props);
  },

  componentWillReceiveProps (newProps) {
    if (!_isEqual(this.props.data, newProps.data)) {
      this._setupD3Functions(newProps);
    }
  },

  shouldComponentUpdate (nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  },

  _setupD3Functions (props) {
    const dataSets = props.data.map(item => {
      return item.value;
    });
    const startAngle = (-135 * this.state.radiansMultiplier);
    const endAngle = (135 * this.state.radiansMultiplier);
    const pie = d3.layout.pie().padAngle(props.padAngle).endAngle(endAngle);
    const values = pie(dataSets);
    const radius = Math.min(props.width, props.height) / 2;
    const standardArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth);
    const hoveredArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - props.arcWidth);
    const baseArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth).startAngle(startAngle).endAngle(endAngle);

    this.setState({
      baseArc,
      endAngle,
      hoveredArc,
      pie,
      radius,
      standardArc,
      values
    });
  },

  _buildSegments (props) {
    const numberOfSegments = props.numberOfSegments;
    const segmentSize = 270 / (numberOfSegments);
    const convertToPie = this.state.radiansMultiplier;
    const segments = [];
    let startAngle = -135;
    let endAngle = startAngle + segmentSize;

    for (let i = 1; i <= numberOfSegments; i++) {
      segments[i] = {
        id: 'segment' + i,
        startAngle: (startAngle * convertToPie),
        endAngle: (endAngle * convertToPie),
        padAngle: 0.02
      };

      startAngle = endAngle;
      endAngle = (startAngle + segmentSize);
    }
    return segments;
  },

  _renderArcs () {
    const segments = this._buildSegments(this.props);

    return segments.map((point, i) => {
      return (
        <g
          key={point.id}
        >
          <path
            className={'arc-' + this.props.id}
            d={this.state.standardArc(point)}
            fill={this.props.colors[i]}
            opacity={this.props.opacity}
          />
        </g>
      );
    });
  },

  _renderBaseArc () {
    return (
      <g>
        <path d={this.state.baseArc()} fill={this.props.baseArcColor}></path>
      </g>
    );
  },

  _renderDataPoints () {
    const dataPoints = this.props.dataPoints.map(dataPoint => {
      return dataPoint.value;
    });

    return dataPoints.map((dataPoint, index) => {
      const percentOfTotal = dataPoint / this.props.chartTotal;
      const endAngle = (percentOfTotal * 270) - 135;

      const dataPointArc = d3.svg.arc()
        .outerRadius(this.state.radius - this.props.activeOffset)
        .innerRadius(this.state.radius - this.props.arcWidth)
        .startAngle(endAngle * this.state.radiansMultiplier)
        .endAngle(endAngle * this.state.radiansMultiplier);

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
    const styles = this.styles();

    if (this.props.showDataLabel && this.props.children) {
      return (
        <div
          className='mx-gauge-data'
          onClick={this._handleClick}
          style={styles.center}
        >
          {this.props.children}
        </div>
      );
    } else {
      const number = this.props.formatter(this.props.numberLabel);
      const numberColor = this.props.numberLabelColor;
      const text = this.props.textLabel;
      const textColor = this.props.textLabelColor;

      return (
        <div
          className='mx-gauge-data'
          onClick={this._handleClick}
          style={styles.center}
        >
          <div className='mx-gauge-data-value' style={Object.assign({}, styles.number, { color: numberColor })}>
            {number}
          </div>
          <div className='mx-gauge-data-label' style={Object.assign({}, styles.label, { color: textColor })}>
            {text}
          </div>
        </div>
      );
    }
  },

  render () {
    const position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';
    const fontSize = Math.min(this.props.width, this.props.height) * 0.2;
    const styles = this.styles();

    return (
      <div
        className='mx-gauge'
        style={Object.assign({}, styles.component, this.props.style, { fontSize, height: this.props.height, width: this.props.width })}
      >
        {this._renderDataLabel()}
        <svg
          className='mx-gauge-svg'
          height={this.props.height}
          width={this.props.width}
        >
          <g className='mx-gauge-g' transform={position}>
            {this._renderBaseArc()}
            {this._renderArcs()}
            {this._renderDataPoints()}
          </g>
        </svg>
      </div>
    );
  },

  styles () {
    return {
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
        fontSize: StyleConstants.FontSizes.LARGE,
        marginTop: 5
      },
      number: {
        fontWeight: 300
      }
    };
  }
});

module.exports = Gauge;
