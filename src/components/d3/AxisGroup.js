const React = require('react');
const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

const AxisGroup = React.createClass({
  propTypes: {
    axis: React.PropTypes.string.isRequired,
    axisFormatFunction: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scaleFunction: React.PropTypes.func.isRequired,
    translation: React.PropTypes.string
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
    const tickValues = ChartUtils.getAxisTickValues(this.props.data, this .props.axis);
    const axisFunction = d3.svg.axis()
      .scale(this.props.scaleFunction())
      .orient(this.props.orientation)
      .tickFormat(this.props.axisFormatFunction)
      .ticks(tickValues.length)
      .tickValues(tickValues);

    d3.select(this.refs[this.props.axis + 'Axis']).call(axisFunction);
  },

  render () {
    return (
      <g
        className={this.props.axis + '-axis'}
        ref={this.props.axis + 'Axis'}
        transform={this.props.translation}
      />
    );
  }
});

module.exports = AxisGroup;