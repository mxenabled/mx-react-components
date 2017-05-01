const PropTypes = require('prop-types');
const React = require('react');

const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

const GridLinesGroup = React.createClass({
  propTypes: {
    axis: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    orientation: PropTypes.string,
    scaleFunction: PropTypes.func.isRequired,
    tickSize: PropTypes.number.isRequired,
    translation: PropTypes.string
  },

  getDefaultProps () {
    return {
      orientation: 'left',
      translation: 'translate(0,0)'
    };
  },

  componentDidMount () {
    this._renderGridLines();
  },

  componentDidUpdate () {
    this._renderGridLines();
  },

  _renderGridLines () {
    const max = d3.max(this.props.data, d => d[this.props.axis]);
    const min = d3.min(this.props.data, d => d[this.props.axis]);
    const { tickValues } = ChartUtils.getAxisTickSpecification(min, max);

    const gridLinesFunction = d3.svg.axis()
      .scale(this.props.scaleFunction())
      .orient(this.props.orientation)
      .tickSize(this.props.tickSize, 0, 0)
      .tickFormat('')
      .ticks(tickValues.length)
      .tickValues(tickValues);

    d3.select(this.gridLines).call(gridLinesFunction);
  },

  render () {
    return (
      <g
        className={this.props.axis + '-grid-line'}
        ref={(ref) => this.gridLines = ref}
        transform={this.props.translation}
      />
    );
  }
});

module.exports = GridLinesGroup;