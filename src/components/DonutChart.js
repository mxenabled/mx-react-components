const React = require('react');
const Radium = require('radium');
const d3 = require('d3');
const objectAssign = require('object-assign');

const DonutPath = require('./DonutPath')

const DonutChart = React.createClass({
  propTypes: {
    activeIndex: React.PropTypes.number,      // The index of the data set that is active. Default: -1
    activeOffset: React.PropTypes.number,     // Amount in pixels to animate on hover. Default: 3
    animateOnHover: React.PropTypes.bool,     // Show animation on hover. Dependent on activeIndex prop. Default: false
    animateOnLoad: React.PropTypes.bool,      // Show animation on load. Default: false
    arcWidth: React.PropTypes.number,         // Width of the arc. Default: 80
    baseArcColor: React.PropTypes.string,     // Color of the base arc when using a partial total chart: Default: #E5E5E5
    chartTotal: React.PropTypes.number,       // Used when data total is not used for chart total, ie: chart with data of 30% and 20% but displayed against 100%. Default: 100
    children: React.PropTypes.node,           // Node passed to be used as custom legend. Default: none
    colors: React.PropTypes.array,            // Array of colors to be used. Default: D3's category20 colors
    data: React.PropTypes.array.isRequired,   // Array of data with values to be used for chart. Default: none. Required
    dataPoints: React.PropTypes.array,        // Array of data points to be used for single points on the chart, ie: Top Performer. Default: none
    dataPointColors: React.PropTypes.array,   // Array of colors to be used for data points. Default: D3's category20b colors
    dataPointRadius: React.PropTypes.number,  // Radius for the data point circles. Default: 40
    height: React.PropTypes.number,           // Height of the chart: Default: 360
    labelStyle: React.PropTypes.object,       // Object for use in styling the legend label. Default: see stlyes variable
    onClick: React.PropTypes.func,            // Method to be called when chart is clicked. Default: dummy function
    onMouseEnter: React.PropTypes.func,       // Method to be called when section hover is entered. Default: dummy function
    onMouseLeave: React.PropTypes.func,       // Method to be called when section hover is exited. Default: dummy function
    opacity: React.PropTypes.number,          // Opacity of the chart colors. Default: 1
    padAngle: React.PropTypes.number,         // Space between sections. Default: 0.01
    radiusOffset: React.PropTypes.number,     // Inset for the radius of the chart. Can be used to nest rings on charts with the same width/height. Default: 0
    showBaseArc: React.PropTypes.bool,        // Show the base arc on partial total charts. Default: false
    showLegend: React.PropTypes.bool,         // Show center legend. Default: true
    valueFormat: React.PropTypes.object,      // Format of the value displayed in the legend. Default: basic number. Options: leading, trailing and decimals
    valueStyle: React.PropTypes.object,       // Object used for styling the legend value. Default: see styles variable
    width: React.PropTypes.number,            // Width of the chart. Default: 360
    zeroStateText: React.PropTypes.string     // Text to display in the legend when not hovreing over a section: Default: 'Roll over an item for details'
  },

  getDefaultProps () {
    return {
      activeIndex: -1,
      activeOffset: 3,
      animateOnHover: false,
      animateOnLoad: false,
      arcWidth: 80,
      baseArcColor: '#E5E5E5',
      chartTotal: 100,
      colors: d3.scale.category20().range(),
      data: [],
      dataPoints: [],
      dataPointColors: d3.scale.category20b().range(),
      dataPointRadius: 40,
      height: 360,
      labelStyle: {},
      onClick () {},
      onMouseEnter () {},
      onMouseLeave () {},
      opacity: 1,
      padAngle: 0.01,
      radiusOffset: 0,
      showBaseArc: false,
      showLegend: true,
      valueFormat: {},
      valueStyle: {},
      width: 360,
      zeroStateText: 'Roll over an item for details'
    };
  },

  _renderArcs () {
    if (this.props.data.length > 0) {
      const dataSets = this.props.data.map(item => {
        return item.value;
      });

      const valueTotal = dataSets.reduce((a,b) => {
        return a + b;
      });

      const endAngle = this.props.chartTotal ? valueTotal / this.props.chartTotal : 1;
      const pie = d3.layout.pie().sort(null).padAngle(this.props.padAngle).endAngle(endAngle * 2 * Math.PI);
      const values = pie(dataSets);
      const radius = (Math.min(this.props.width, this.props.height) / 2) - this.props.radiusOffset;
      const standardArc = d3.svg.arc().outerRadius(radius - this.props.activeOffset).innerRadius(radius - this.props.arcWidth);
      const hoverArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - this.props.arcWidth);


      return values.map((point, i) => {
        const arc = this.props.activeIndex === i && this.props.animateOnHover ? hoverArc : standardArc;

        return (
          <g
            key={i}
            onClick={this.props.onClick.bind(null, i)}
            onMouseEnter={this.props.onMouseEnter.bind(null, i)}
            onMouseLeave={this.props.onMouseLeave}
          >
            <DonutPath
              animateOnLoad={this.props.animateOnLoad}
              arc={arc}
              color={this.props.colors[i]}
              opacity={this.props.opacity}
              value={point}
            />
          </g>
        );
      });
    }
  },

  _renderBaseArc () {
    if (this.props.showBaseArc) {
      const radius = (Math.min(this.props.width, this.props.height) / 2) - this.props.radiusOffset;

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

    const radius = (Math.min(this.props.width, this.props.height) / 2) - this.props.radiusOffset;

    return dataPoints.map((dataPoint, index) => {
      const endAngle = dataPoint / this.props.chartTotal;

      const dataPointArc = d3.svg.arc()
        .outerRadius(radius - this.props.activeOffset)
        .innerRadius(radius - this.props.arcWidth)
        .startAngle(0)
        .endAngle(endAngle * 2 * 2 * Math.PI);

      return (
        <circle cx='0' cy='0' r={this.props.dataPointRadius} key={index} transform={'translate(' + dataPointArc.centroid() + ')'} fill={this.props.dataPointColors[index]} />
      );
    });
  },

  _renderLegend () {
    if (this.props.showLegend) {
      if (this.props.children) {
        return (
          <div onClick={this.props.onClick} style={styles.center}>
            {this.props.children}
          </div>
        );
      } else {
        if (this.props.activeIndex >= 0) {
          const activeDataSet = this.props.data[this.props.activeIndex] || {};
          const color = this.props.colors[this.props.activeIndex];

          const valueFormat = objectAssign({
            decimals: 0,
            leading: '',
            trailing: ''
          }, this.props.valueFormat);

          const value = valueFormat.leading + parseFloat(activeDataSet.value).toFixed(valueFormat.decimals) + valueFormat.trailing;

          return (
            <div onClick={this.props.onClick} style={styles.center}>
                <div style={[styles.label, this.props.labelStyle]}>
                  {activeDataSet.name}
                </div>
                <div style={[styles.value, this.props.valueStyle, { color }]}>
                  {value}
                </div>
            </div>
          );
        } else {
          return (
            <div onClick={this.props.onClick} style={styles.center}>
                <div style={[styles.label, this.props.labelStyle]}>
                  {this.props.zeroStateText}
                </div>
            </div>
          );
        }
      }
    }
  },

  render () {
    const position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';

    return (
      <div style={[styles.component, { height: this.props.height, width: this.props.width }]}>
        {this._renderLegend()}
        <svg height={this.props.height} width={this.props.width}>
          <g transform={position} style={styles.pointer}>
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
    position: 'relative'
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
    fontSize: '18px',
    fontWeight: '800'
  },
  pointer: {
    cursor: 'pointer'
  },
  value: {
    fontSize: '28px',
    fontWeight: '400'
  }
};

module.exports = Radium.Enhancer(DonutChart);