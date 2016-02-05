const React = require('react');
const ReactDom = require('react-dom');

const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

const AxisGroup = React.createClass({
  props: {
    axis: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string,
    axisFormat: React.PropTypes.string.isRequired,
    scaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      translation: 'translate(0,0)'
    };
  },

  componentWillMount () {
    const tickValues = ChartUtils.getAxisTickValues(this.props.data, this .props.axis);

    const axisFunction = d3.svg.axis()
      .scale(this.props.scaleFunction())
      .orient(this.props.orientation)
      .tickFormat(this.props.axisFormat)
      .ticks(tickValues.length)
      .tickValues(tickValues);

    this.setState({
      axisFunction
    });
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    d3.select(this.refs[this.props.axis + 'Axis']).call(this.state.axisFunction);
  },

  render () {
    return <g className={this.props.axis + '-axis'} ref={this.props.axis + 'Axis'} transform={this.props.translation} />;
  }
});

module.exports = AxisGroup;