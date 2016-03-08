const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const PieChart = React.createClass({
  propTypes: {
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    duration: React.PropTypes.number,
    height: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    showDataLabel: React.PropTypes.bool,
    title: React.PropTypes.string,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
      duration: 500,
      height: 350,
      onClick () {},
      onMouseEnter () {},
      onMouseLeave () {},
      showDataLabel: true,
      title: '',
      width: 300
    };
  },

  componentDidMount () {
    const dom = ReactDOM.findDOMNode(this);

    this._renderChart(dom);
  },

  _renderChart (dom) {
    const { width, height, duration, data, colors } = this.props;
    const thisGlobal = this;
    const expandWidth = 10;
    const strokeWidth = 3;
    const radius = Math.min(width, height) / 2 - expandWidth;

    const pieChart = d3.select(dom)
      .append('svg')
      .attr('class', 'mx-donutchart-svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius / 2);

    const arcOver = d3.svg.arc()
      .outerRadius(radius + expandWidth)
      .innerRadius(radius / 2);

    const pie = d3.layout.pie()
      .sort(null)
      .value((d) => {
        return d.value;
      });

    const g = pieChart.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'mx-donutchart-g')
      .attr('stroke-width', strokeWidth)
      .attr('stroke', StyleConstants.Colors.WHITE)
      .append('path')
      .style('fill', (d, i) => {
        return colors[i];
      })
      .on('click', function (d, i) {
        thisGlobal.props.onClick(d, i);
      })
      .on('mouseenter', function (d, i) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr('d', arcOver);

        thisGlobal.props.onMouseEnter(d.value, i);
      })
      .on('mouseleave', function (d, i) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr('d', arc);

        thisGlobal.props.onMouseLeave(d.value, i);
      })
      .transition().delay((d, i) => {
        return i * duration / 2;
      })
      .ease('linear')
      .attrTween('d', (d) => {
        const i = d3.interpolate(d.startAngle, d.endAngle);

        return (t) => {
          d.endAngle = i(t);

          return arc(d);
        };
      });
  },

  render () {
    return (
      <div className='mx-donutchart'></div>
    );
  }
});


module.exports = PieChart;
