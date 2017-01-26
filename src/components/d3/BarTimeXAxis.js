const React = require('react');

const d3 = require('d3');
const moment = require('moment');

const StyleConstants = require('../../constants/Style');

const BarTimeXAxis = React.createClass({
  propTypes: {
    tickRange: React.PropTypes.array,
    tickSize: React.PropTypes.number,
    tickValues: React.PropTypes.array,
    timeAxisFormat: React.PropTypes.string.isRequired,
    transform: React.PropTypes.string,
    xScaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      tickSize: 6,
      tickValues: null,
      transform: 'translate(0,0)'
    };
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    const timeAxisFunction = d3.svg.axis()
      .scale(this.props.xScaleFunction)
      .tickValues(this.props.tickValues)
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .outerTickSize(0);

    d3.select(this.timeAxis).call(timeAxisFunction);

    this._styleChart();
  },

  _styleChart () {
    const style = this.styles();
    const axis = d3.select(this.timeAxis);

    // Style x axis labels
    axis.selectAll('text')
      .style(style.text);

    // Style x axis path
    axis.selectAll('path')
      .style(style.path);
  },

  render () {
    return (
      <g
        className='x-bar-time-axis'
        ref={(ref) => this.timeAxis = ref}
        transform={this.props.transform}
      />
    );
  },

  styles () {
    return {
      text: {
        fill: StyleConstants.Colors.ASH,
        stroke: 'none',
        'font-size': StyleConstants.FontSizes.MEDIUM,
        'text-anchor': 'middle'
      },
      path: {
        stroke: StyleConstants.Colors.FOG,
        'stroke-width': 1,
        fill: 'none'
      }
    };
  }
});

module.exports = BarTimeXAxis;