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
    defaultLabelValue: React.PropTypes.string,
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
      activeOffset: 0,
      animateOnHover: false,
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
      onClick () {},
      onMouseEnter () {},
      onMouseLeave () {},
      opacity: 1,
      padAngle: 0.01,
      showBaseArc: true,
      showDataLabel: true,
      width: 150
    };
  },

  getInitialState () {
    return {
      activeIndex: this.props.activeIndex
    };
  },

  componentWillReceiveProps (newProps) {
    if (newProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: newProps.activeIndex
      });
    }
  },

  _handleClick (index) {
    this.props.onClick(index);
  },

  _handleMouseEnter (index) {
    if (this.props.animateOnHover) {
      this.setState({
        activeIndex: index
      });
    }

    this.props.onMouseEnter(index);
  },

  _handleMouseLeave () {
    if (this.props.animateOnHover) {
      this.setState({
        activeIndex: -1
      });
    }

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

      if (valueTotal) {
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
              onClick={this._handleClick.bind(null, i)}
              onMouseEnter={this._handleMouseEnter.bind(null, i)}
              onMouseLeave={this._handleMouseLeave}
            >
              <path d={arc(point)} fill={this.props.colors[i]} opacity={this.props.opacity} />
            </g>
          );
        });
      }
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
