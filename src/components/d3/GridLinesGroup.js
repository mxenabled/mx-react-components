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