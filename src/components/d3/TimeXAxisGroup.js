const React = require('react');

const d3 = require('d3');
const moment = require('moment');

const TimeXAxisGroup = React.createClass({
  propTypes: {
    numberOfTicks: React.PropTypes.number,
    tickSize: React.PropTypes.number,
    timeAxisFormat: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string,
    xScaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      numberOfTicks: 10,
      tickSize: 6,
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
    const timeAxisFunction = d3.svg.axis()
    .scale(this.props.xScaleFunction())
    .tickFormat(d => {
      return moment.unix(d).format(this.props.timeAxisFormat);
    })
    .tickSize(this.props.tickSize, this.props.tickSize)
    .ticks(this.props.numberOfTicks);

    d3.select(this.timeAxis).call(timeAxisFunction);
  },

  render () {
    return (
      <g
        className='time-axis'
        ref={(ref) => this.timeAxis = ref}
        transform={this.props.translation}
      />
    );
  }
});

module.exports = TimeXAxisGroup;