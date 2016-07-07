const _isEqual = require('lodash/isEqual');
const React = require('react');
const Radium = require('radium');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const Gauge = React.createClass({
  propTypes: {
    activeOffset: React.PropTypes.number,
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
    id: React.PropTypes.string,
    opacity: React.PropTypes.number,
    padAngle: React.PropTypes.number,
    showBaseArc: React.PropTypes.bool,
    showDataLabel: React.PropTypes.bool,
    width: React.PropTypes.number
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
      height: 150,
      id: 'gauge',
      opacity: 1,
      padAngle: 0.02,
      showBaseArc: true,
      showDataLabel: true,
      width: 150
    };
  },

  getInitialState () {
    return {};
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
    const startAngle = (225 * (Math.PI / 360));
    const endAngle = (135 * (Math.PI / 360));
    const pie = d3.layout.pie().sort(null).padAngle(props.padAngle).endAngle(endAngle);
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

  _renderArcs () {
    const firstSegment = -135 * (Math.PI / 180);
    const endOfFirstSegment = -90 * (Math.PI / 180);
    const secondSegment = -90 * (Math.PI / 180);
    const endOfSecondSegment = -45 * (Math.PI / 180);
    const thirdSegment = -45 * (Math.PI / 180);
    const endOfThirdSegment = 0;
    const fourthSegment = 0;
    const endOfFourthSegment = 45 * (Math.PI / 180);
    const fifthSegment = 45 * (Math.PI / 180);
    const endOfFifthSegment = 90 * (Math.PI / 180);
    const sixthSegment = 90 * (Math.PI / 180);
    const endOfSixthSegment = 135 * (Math.PI / 180);

    const segments = [
      { startAngle: firstSegment, endAngle: endOfFirstSegment, padAngle: 0.02 },
      { startAngle: secondSegment, endAngle: endOfSecondSegment, padAngle: 0.02 },
      { startAngle: thirdSegment, endAngle: endOfThirdSegment, padAngle: 0.02 },
      { startAngle: fourthSegment, endAngle: endOfFourthSegment, padAngle: 0.02 },
      { startAngle: fifthSegment, endAngle: endOfFifthSegment, padAngle: 0.02 },
      { startAngle: sixthSegment, endAngle: endOfSixthSegment, padAngle: 0.02 }];

    return segments.map((point, i) => {
      return (
        <g
          key={i}
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
        .startAngle(endAngle * (Math.PI / 180))
        .endAngle(endAngle * (Math.PI / 180));

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

    if (this.props.showDataLabel) {
      if (this.props.children) {
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
        const color = this.props.colors[0];
        const text = this.props.defaultLabelText;
        const value = this.props.formatter(this.props.defaultLabelValue);

        return (
          <div
            className='mx-gauge-data'
            onClick={this._handleClick}
            style={styles.center}
          >
            <div className='mx-gauge-data-value' style={[styles.value, { color }]}>
              {value}
            </div>
            <div className='mx-gauge-data-label' style={styles.label}>
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
    const fontSize = Math.min(this.props.width, this.props.height) * 0.2;
    const styles = this.styles();

    return (
      <div
        className='mx-gauge'
        style={[styles.component, this.props.style, { fontSize, height: this.props.height, width: this.props.width }]}
      >
        {this._renderDataLabel()}
        <svg
          className='mx-gauge-svg'
          height={this.props.height}
          ref={this.props.id}
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
        color: StyleConstants.Colors.ASH,
        fontSize: '0.4em',
        marginTop: 5
      },
      value: {
        fontWeight: 300
      }
    };
  }
});

module.exports = Radium(Gauge);
