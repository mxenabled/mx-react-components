'use strict';

var React = require('react');

var StyleConstants = require('../../constants/Style');

var CirclesGroup = React.createClass({
  displayName: 'CirclesGroup',

  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    circleColor: React.PropTypes.string,
    circleOverlayRadius: React.PropTypes.number,
    circleRadius: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    onCircleClick: React.PropTypes.func,
    shouldAnimate: React.PropTypes.bool,
    strokeWidth: React.PropTypes.number,
    translation: React.PropTypes.string,
    useCircleOverlay: React.PropTypes.bool,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      circleColor: StyleConstants.Colors.CHARCOAL,
      circleOverlayRadius: 6,
      circleRadius: 3,
      onCircleClick: function onCircleClick() {},
      shouldAnimate: true,
      strokeWidth: 2,
      translation: 'translate(0,0)',
      useCircleOverlay: false
    };
  },
  componentDidMount: function componentDidMount() {
    this._animateCircles();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._animateCircles();
  },
  _animateCircles: function _animateCircles() {
    var _this = this;

    if (this.props.shouldAnimate) {
      d3.select(this.circleGroup).selectAll('.circle').data(this.props.data).transition().attr('cy', function (d) {
        return _this.props.yScaleValueFunction(d.y);
      });
    }
  },
  render: function render() {
    var _this2 = this;

    var _props = this.props,
        adjustedHeight = _props.adjustedHeight,
        circleOverlayRadius = _props.circleOverlayRadius,
        circleRadius = _props.circleRadius,
        data = _props.data,
        shouldAnimate = _props.shouldAnimate,
        translation = _props.translation,
        useCircleOverlay = _props.useCircleOverlay,
        xScaleValueFunction = _props.xScaleValueFunction,
        yScaleValueFunction = _props.yScaleValueFunction;

    var preventCircleOverlapCutOff = 45;

    return React.createElement(
      'g',
      {
        className: 'circle-group',
        ref: function ref(_ref) {
          return _this2.circleGroup = _ref;
        },
        transform: translation
      },
      data.length <= preventCircleOverlapCutOff ? data.map(function (item, index) {
        var cx = xScaleValueFunction(item.x);
        var cy = shouldAnimate ? adjustedHeight : yScaleValueFunction(item.y);

        return React.createElement(
          'g',
          { key: index },
          React.createElement('circle', {
            className: 'circle',
            cx: cx,
            cy: cy,
            fill: StyleConstants.Colors.WHITE,
            onClick: function onClick() {
              if (!useCircleOverlay) {
                _this2.props.onCircleClick(item);
              }
            },
            r: circleRadius,
            stroke: _this2.props.circleColor,
            style: { 'strokeWidth': _this2.props.strokeWidth }
          }),
          useCircleOverlay && React.createElement('circle', {
            className: 'circle-overlay',
            cx: cx,
            cy: yScaleValueFunction(item.y),
            fill: StyleConstants.Colors.WHITE,
            onClick: function onClick() {
              _this2.props.onCircleClick(item);
            },
            r: circleOverlayRadius,
            style: { 'fillOpacity': 0 }
          })
        );
      }) : null
    );
  }
});

module.exports = CirclesGroup;