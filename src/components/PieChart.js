const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const PieChart = React.createClass({
  propTypes: {
    arcWidth: React.PropTypes.number,
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    distance: React.PropTypes.number,
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
      distance: 10,
      duration: 500,
      height: 350,
      Legend: true,
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
    const { width, height, arcWidth, distance, duration, colors, data, showDataLabel } = this.props;
    const self = this;
    const radius = Math.min(width, height) / 2;

    const chart = d3.select(dom)
      .append('svg')
      .attr('class', 'mx-donutchart-svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(arcWidth ? radius / arcWidth : radius * 0.6);

    const pie = d3.layout.pie().sort(null).value((d) => {
      return d.value;
    });

    const g = chart.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'mx-donutchart-g')
      .on('click', (d) => {
        this.props.onClick(d.value);
      })
      .on('mouseover', function (d, i) {
        d3.select(this)
          .transition()
          .duration(duration)
          .ease('bounce')
          .attr('transform', (d) => {
            d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
            const x = Math.sin(d.midAngle) * distance;
            const y = -Math.cos(d.midAngle) * distance;

            return 'translate(' + x + ',' + y + ')';
          });

        d3.select(this).append('text')
          .style('fill', () => {
            return colors[i];
          })
          .attr('id', 'showValue')
          .attr('transform', 'translate(0,-5)')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .style('font', StyleConstants.Fonts.REGULAR)
          .text((d) => {
            if (showDataLabel) {
              return d.value;
            } else {
              return '';
            }
          });

        g.filter((e) => {
          return e.value !== d.value;
        }).style('opacity', 0.5);

        self.props.onMouseEnter(d.value, i);
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .transition()
          .duration(duration)
          .ease('bounce')
          .attr('transform', 'translate(0,0)');

        d3.select('#showValue').remove();
        g.filter((e) => {
          return e.value !== d.value;
        }).style('opacity', 1);

        self.props.onMouseLeave(d.value, i);
      });

    g.append('path')
      .style('fill', (d, i) => {
        return colors[i];
      })
      .transition().delay((d, i) => {
        return i * duration / 2;
      })
      .duration(duration / 2)
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
      <div></div>
    );
  }
});


module.exports = PieChart;
