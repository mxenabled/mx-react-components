const React = require('react');

const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

const GridLinesGroup = React.createClass({
  propTypes: {
    axis: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string,
    scaleFunction: React.PropTypes.func.isRequired,
    tickSize: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      orientation: 'left',
      translation: 'translate(0,0)'
    };
  },

  componentWillMount () {
    const tickValues = ChartUtils.getAxisTickValues(this.props.data, this.props.axis);

    const gridLinesFunction = d3.svg.axis()
      .scale(this.props.scaleFunction())
      .orient(this.props.orientation)
      .tickSize(this.props.tickSize, 0, 0)
      .tickFormat('')
      .ticks(tickValues.length)
      .tickValues(tickValues);

    this.setState({
      gridLinesFunction
    });
  },

  componentDidMount () {
    this._renderGridLines();
  },

  componentDidUpdate () {
    this._renderGridLines();
  },

  _renderGridLines () {
    d3.select(this.refs[this.props.axis + 'GridLines']).call(this.state.gridLinesFunction);
  },

  render () {
    return <g className={this.props.axis + '-grid-line'} ref={this.props.axis + 'GridLines'} transform={this.props.translation} />;
  }
});

module.exports = GridLinesGroup;