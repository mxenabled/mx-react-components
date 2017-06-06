const PropTypes = require('prop-types');
const React = require('react');

const d3 = require('d3');
const moment = require('moment');
const _merge = require('lodash/merge');

const StyleConstants = require('../../constants/Style');

class BarTimeXAxis extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    tickRange: PropTypes.array,
    tickSize: PropTypes.number,
    tickValues: PropTypes.array,
    timeAxisFormat: PropTypes.string.isRequired,
    transform: PropTypes.string,
    xScaleFunction: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: {},
    tickSize: 6,
    tickValues: null,
    transform: 'translate(0,0)'
  };

  componentDidMount () {
    this._renderAxis();
  }

  componentDidUpdate () {
    this._renderAxis();
  }

  _renderAxis = () => {
    const timeAxisFunction = d3.svg.axis()
      .scale(this.props.xScaleFunction)
      .tickValues(this.props.tickValues)
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .outerTickSize(0);

    d3.select(this.timeAxis).call(timeAxisFunction);

    this._styleChart();
  };

  _styleChart = () => {
    const style = _merge({}, this.styles(), this.props.style);
    const axis = d3.select(this.timeAxis);

    // Style x axis labels
    axis.selectAll('text')
      .style(style.text);

    // Style x axis path
    axis.selectAll('path')
      .style(style.path);
  };

  render () {
    return (
      <g
        className='x-bar-time-axis'
        ref={(ref) => this.timeAxis = ref}
        transform={this.props.transform}
      />
    );
  }

  styles = () => {
    return {
      text: {
        fill: StyleConstants.Colors.GRAY_500,
        stroke: 'none',
        'font-size': StyleConstants.FontSizes.MEDIUM,
        'text-anchor': 'middle'
      },
      path: {
        stroke: StyleConstants.Colors.GRAY_300,
        'stroke-width': 1,
        fill: 'none'
      }
    };
  };
}

module.exports = BarTimeXAxis;
