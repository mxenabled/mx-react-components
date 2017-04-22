'use strict';

var React = require('react');

var d3 = require('d3');
var moment = require('moment');

var TimeXAxisGroup = React.createClass({
  displayName: 'TimeXAxisGroup',

  propTypes: {
    ticks: React.PropTypes.array.isRequired,
    tickSize: React.PropTypes.number,
    timeAxisFormat: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string,
    xScaleFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      tickSize: 6,
      translation: 'translate(0,0)'
    };
  },
  componentDidMount: function componentDidMount() {
    this._renderAxis();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._renderAxis();
  },
  _renderAxis: function _renderAxis() {
    var _this = this;

    var timeAxisFunction = d3.svg.axis().scale(this.props.xScaleFunction()).tickSize(this.props.tickSize, this.props.tickSize).tickValues(this.props.ticks).tickFormat(function (d) {
      return moment.unix(d).format(_this.props.timeAxisFormat);
    });

    d3.select(this.timeAxis).call(timeAxisFunction);
  },
  render: function render() {
    var _this2 = this;

    return React.createElement('g', {
      className: 'time-axis',
      ref: function ref(_ref) {
        return _this2.timeAxis = _ref;
      },
      transform: this.props.translation
    });
  }
});

module.exports = TimeXAxisGroup;