const React = require('react');
const Radium = require('radium');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const DonutChart = React.createClass({
  propTypes: {
    activeIndex: React.PropTypes.number,
    activeOffset: React.PropTypes.number,
    animateOnHover: React.PropTypes.bool,
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
    formatter: React.PropTypes.func,
    height: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    opacity: React.PropTypes.number,
    padAngle: React.PropTypes.number,
    showBaseArc: React.PropTypes.bool,
    showDataLabel: React.PropTypes.bool,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      activeIndex: -1,
      activeOffset: 3,
      animateOnHover: true,
      arcWidth: 80,
      baseArcColor: '#E5E5E5',
      colors: d3.scale.category20().range(),
      data: [],
      dataPointColors: d3.scale.category20b().range(),
      dataPointRadius: 40,
      dataPoints: [],
      defaultLabelText: 'Roll over an item for details',
      formatter (value) {
        return value;
      },
      height: 360,
      onClick () {},
      onMouseEnter () {},
      onMouseLeave () {},
      opacity: 1,
      padAngle: 0.01,
      showBaseArc: false,
      showDataLabel: true,
      width: 360
    };
  },

  getInitialState () {
    return {
      activeIndex: -1
    };
  },

  componentDidMount () {
    this.setState({
      activeIndex: this.props.activeIndex
    });
  },

  componentWillReceiveProps (newProps) {
    if (newProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: newProps.activeIndex
      });
    }
  },

  _handleMouseEnter (index) {
    this.setState({
      activeIndex: index
    });

    this.props.onMouseEnter(index);
  },

  _handleMouseLeave () {
    this.setState({
      activeIndex: -1
    });

    this.props.onMouseLeave();
  },

  _renderArcs () {
    if (this.props.data.length > 0) {
      const dataSets = this.props.data.map(item => {
        return item.value;
      });

      const valueTotal = dataSets.reduce((a, b) => {
        return a + b;
      });

      const endAngle = this.props.chartTotal ? valueTotal / this.props.chartTotal : 1;
      const pie = d3.layout.pie().sort(null).padAngle(this.props.padAngle).endAngle(endAngle * 2 * Math.PI);
      const values = pie(dataSets);
      const radius = Math.min(this.props.width, this.props.height) / 2;
      const standardArc = d3.svg.arc().outerRadius(radius - this.props.activeOffset).innerRadius(radius - this.props.arcWidth);
      const hoverArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - this.props.arcWidth);


      return values.map((point, i) => {
        const arc = this.state.activeIndex === i && this.props.animateOnHover ? hoverArc : standardArc;

        return (
          <g
            key={i}
            onClick={this.props.onClick.bind(null, i)}
            onMouseEnter={this._handleMouseEnter.bind(null, i)}
            onMouseLeave={this._handleMouseLeave}
          >
            <path d={arc(point)} fill={this.props.colors[i]} opacity={this.props.opacity} />
          </g>
        );
      });
    }
  },

  _renderBaseArc () {
    if (this.props.showBaseArc) {
      const radius = (Math.min(this.props.width, this.props.height) / 2);

      const baseArc = d3.svg.arc().outerRadius(radius - this.props.activeOffset)
                                  .innerRadius(radius - this.props.arcWidth)
                                  .startAngle(0)
                                  .endAngle(2 * Math.PI);

      return (
        <g key={baseArc}>
          <path d={baseArc()} fill={this.props.baseArcColor}></path>
        </g>
      );
    }
  },

  _renderDataPoints () {
    const dataPoints = this.props.dataPoints.map(dataPoint => {
      return dataPoint.value;
    });

    const radius = Math.min(this.props.width, this.props.height) / 2;

    return dataPoints.map((dataPoint, index) => {
      const endAngle = dataPoint / this.props.chartTotal;

      const dataPointArc = d3.svg.arc()
        .outerRadius(radius - this.props.activeOffset)
        .innerRadius(radius - this.props.arcWidth)
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
          <div onClick={this.props.onClick} style={styles.center}>
            {this.props.children}
          </div>
        );
      } else if (this.state.activeIndex >= 0) {
        const activeDataSet = this.props.data[this.state.activeIndex] || {};
        const color = this.props.colors[this.state.activeIndex];
        const value = this.props.formatter(activeDataSet.value);

        return (
          <div onClick={this.props.onClick} style={styles.center}>
              <div style={styles.label}>
                {activeDataSet.name}
              </div>
              <div style={[styles.value, { color }]}>
                {value}
              </div>
          </div>
        );
      } else {
        return (
          <div onClick={this.props.onClick} style={styles.center}>
            <div style={styles.label}>
              {this.props.defaultLabelText}
            </div>
          </div>
        );
      }
    }
  },

  render () {
    const position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';

    return (
      <div style={[styles.component, { height: this.props.height, width: this.props.width }]}>
        {this._renderDataLabel()}
        <svg height={this.props.height} width={this.props.width}>
          <g style={styles.pointer} transform={position}>
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
    color: '#333',
    fontSize: '14px',
    fontWeight: '800'
  },
  pointer: {
    cursor: 'pointer'
  },
  value: {
    fontSize: '24px',
    fontWeight: '400'
  }
};

module.exports = Radium(DonutChart);