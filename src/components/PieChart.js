const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');

const StyleConstants = require('../constants/Style');

const PieChart = React.createClass({
  propTypes: {
    animateDuration: React.PropTypes.number,
    animationTypeOnLoad: React.PropTypes.oneOf(['roll', 'pop']),
    arcWidth: React.PropTypes.number,
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    hoverExpandDistance: React.PropTypes.number,
    onLabelClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onPieClick: React.PropTypes.func,
    showDataLabel: React.PropTypes.bool,
    style: React.PropTypes.object,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      animationTypeOnLoad: 'roll',
      animateDuration: 500,
      arcWidth: 2,
      colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
      height: 350,
      hoverExpandDistance: 10,
      onLabelClick () {},
      onMouseEnter () {},
      onMouseLeave () {},
      onPieClick () {},
      showDataLabel: true,
      width: 300
    };
  },

  componentDidMount () {
    const dom = ReactDOM.findDOMNode(this.refs.chart);

    this._renderChart(dom);
  },

  _renderShowLabels () {
    const styles = this.styles();

    return (
      <div
        className='mx-donutchart-data'
        onClick={this.props.onLabelClick}
        style={styles.center}
      >
        {this.props.children}
      </div>
    );
  },

  _renderChart (dom) {
    const { animateDuration, arcWidth, height, width, hoverExpandDistance, data, colors } = this.props;
    const thisGlobal = this;
    const strokeWidth = 2;
    const radius = Math.min(width, height) / 2 - hoverExpandDistance;
    const arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius / arcWidth);

    const arcOver = d3.svg.arc()
      .outerRadius(radius + hoverExpandDistance)
      .innerRadius(radius / arcWidth);

    const pieChart = d3.select(dom)
      .append('svg')
      .attr('class', 'mx-donutchart-svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

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
      .each(function (d) {
        this._current = d;
      })
      .style('fill', (d, i) => {
        return colors[i];
      })
      .on('click', function (d, i) {
        thisGlobal.props.onPieClick(d.value, i);
      })
      .on('mouseenter', function (d, i) {
        d3.select(this)
          .transition()
          .duration(animateDuration)
          .attr('d', arcOver);

        thisGlobal.props.onMouseEnter(d.value, i);
      })
      .on('mouseleave', function (d, i) {
        d3.select(this)
          .transition()
          .duration(animateDuration)
          .attr('d', arc);

        thisGlobal.props.onMouseLeave(d.value, i);
      });

    if (this.props.animationTypeOnLoad === 'roll') {
      g.transition().delay(function (d, i) {
        return i * animateDuration / 2;
      })
        .ease('linear')
        .attrTween('d', function (a) {
          const i = d3.interpolate(a.startAngle, a.endAngle);

          return (t) => {
            a.endAngle = i(t);

            return arc(a);
          };
        });
    } else {
      g.transition()
        .ease('bounce')
        .duration(animateDuration)
        .attrTween('d', function (a) {
          const i = d3.interpolate(this._current, a);
          const k = d3.interpolate(0, arc.outerRadius()());

          this._current = i(0);

          return function (t) {
            return arc.innerRadius(k(t) / 2).outerRadius(k(t))(i(t));
          };
        });
    }
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        {this.props.showDataLabel ? this._renderShowLabels() : null}
        <div className='mx-donutchart' ref='chart' style={this.props.style}></div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        position: 'relative',
        zIndex: 1
      },
      center: {
        position: 'absolute',
        top: '50%',
        left: this.props.width / 2,
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }
    };
  }
});

module.exports = PieChart;
