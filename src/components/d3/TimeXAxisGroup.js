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

  componentWillMount () {
    const timeAxisFunction = d3.svg.axis()
      .scale(this.props.xScaleFunction())
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .tickSize(this.props.tickSize, this.props.tickSize)
      .ticks(this.props.numberOfTicks);

    this.setState({
      timeAxisFunction
    });
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    d3.select(this.refs.timeAxis).call(this.state.timeAxisFunction);
  },

  render () {
    return (
      <g
        className='time-axis'
        ref='timeAxis'
        transform={this.props.translation}
      />
    );
  }
});

module.exports = TimeXAxisGroup;