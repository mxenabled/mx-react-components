'use strict';

var React = require('react');

var d3 = require('d3');

var StyleConstants = require('../../constants/Style');

var LineGroup = React.createClass({
  displayName: 'LineGroup',

  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    dashLine: React.PropTypes.bool,
    data: React.PropTypes.array.isRequired,
    lineColor: React.PropTypes.string,
    shouldAnimate: React.PropTypes.bool,
    strokeWidth: React.PropTypes.number,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dashLine: false,
      lineColor: StyleConstants.Colors.CHARCOAL,
      shouldAnimate: true,
      strokeWidth: 2,
      translation: 'translate(0,0)'
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    var flatLine = d3.svg.line().x(function (d) {
      return _this.props.xScaleValueFunction(d.x);
    }).y(function () {
      return _this.props.adjustedHeight;
    });

    var line = d3.svg.line().x(function (d) {
      return _this.props.xScaleValueFunction(d.x);
    }).y(function (d) {
      return _this.props.yScaleValueFunction(d.y);
    });

    this.setState({
      flatLine: flatLine,
      line: line
    });
  },
  componentDidMount: function componentDidMount() {
    this._animateLine();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._animateLine();
  },
  _animateLine: function _animateLine() {
    if (this.props.shouldAnimate) {
      d3.select(this.chartLine).transition().attr('d', this.state.line(this.props.data));
    }
  },
  render: function render() {
    var _this2 = this;

    var _props = this.props,
        data = _props.data,
        dashLine = _props.dashLine,
        lineColor = _props.lineColor,
        shouldAnimate = _props.shouldAnimate,
        strokeWidth = _props.strokeWidth,
        translation = _props.translation;


    return React.createElement(
      'g',
      { className: 'chart-line-group', transform: translation },
      React.createElement('path', {
        d: shouldAnimate ? this.state.flatLine(data) : this.state.line(data),
        fill: 'none',
        ref: function ref(_ref) {
          return _this2.chartLine = _ref;
        },
        stroke: lineColor,
        strokeDasharray: dashLine ? '4,4' : 'none',
        strokeWidth: strokeWidth
      })
    );
  }
});

module.exports = LineGroup;