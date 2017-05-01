const PropTypes = require('prop-types');
const React = require('react');
const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

const AxisGroup = React.createClass({
  propTypes: {
    axis: PropTypes.string.isRequired,
    axisFormatFunction: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    orientation: PropTypes.string.isRequired,
    scaleFunction: PropTypes.func.isRequired,
    translation: PropTypes.string
  },

  getDefaultProps () {
    return {
      translation: 'translate(0,0)'
    };
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    const max = d3.max(this.props.data, d => d[this.props.axis]);
    const min = d3.min(this.props.data, d => d[this.props.axis]);
    const { tickValues } = ChartUtils.getAxisTickSpecification(min, max);

    const axisFunction = d3.svg.axis()
      .scale(this.props.scaleFunction())
      .orient(this.props.orientation)
      .tickFormat(this.props.axisFormatFunction)
      .ticks(tickValues.length)
      .tickValues(tickValues);

    d3.select(this.axisGroup).call(axisFunction);
  },

  render () {
    return (
      <g
        className={this.props.axis + '-axis'}
        ref={(ref) => this.axisGroup = ref}
        transform={this.props.translation}
      />
    );
  }
});

module.exports = AxisGroup;