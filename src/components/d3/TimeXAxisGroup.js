const React = require('react');
const ReactDom = require('react-dom');

const d3 = require('d3');
const moment = require('moment');

const TimeXAxisGroup = React.createClass({
  props: {
    timeAxisFormat: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string,
    xScaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      translation: 'translate(0,0)'
    };
  },

  componentWillMount () {
    const timeAxis = d3.svg.axis()
      .scale(this.props.xScaleFunction())
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat);
      })
      .tickSize(6, 6)
      .ticks(10);

    this.setState({
      timeAxis
    });
  },

  componentDidMount () {
    this._renderAxis();
  },

  componentDidUpdate () {
    this._renderAxis();
  },

  _renderAxis () {
    d3.select(this.refs.timeAxis).call(this.state.timeAxis);
  },

  render () {
    return (
      <g
        className='x-axis'
        ref='timeAxis'
        transform={this.props.translation}
      />
    );
  }
});

module.exports = TimeXAxisGroup;