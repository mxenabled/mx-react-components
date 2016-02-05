const React = require('react');
const ReactDom = require('react-dom');

const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

const YAxisGroup = React.createClass({
  props: {
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string,
    translation: React.PropTypes.string,
    yAxisFormat: React.PropTypes.string.isRequired,
    yScaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      orientation: 'left',
      translation: 'translate(0,0)'
    };
  },

  componentWillMount () {
    const tickValues = ChartUtils.getYAxisTickValues(this.props.data);

    const yAxis = d3.svg.axis()
      .scale(this.props.yScaleFunction())
      .orient(this.props.orientation)
      .tickFormat(this.props.yAxisFormat)
      .ticks(tickValues.length)
      .tickValues(tickValues);

    this.setState({
      yAxis
    });
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    d3.select(this.refs.yAxis).call(this.state.yAxis);
  },

  render () {
    return <g className='y-axis' ref='yAxis' transform={this.props.translation} />;
  }
});

module.exports = YAxisGroup;