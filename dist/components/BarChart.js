'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var _isEqual = require('lodash/isEqual');
var _merge = require('lodash/merge');
var _omit = require('lodash/omit');
var _functions = require('lodash/functions');

var StyleConstants = require('../constants/Style');

var Bar = React.createClass({
  displayName: 'Bar',

  propTypes: {
    animateOnHover: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    height: React.PropTypes.number,
    hovering: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    radius: React.PropTypes.number,
    value: React.PropTypes.number,
    width: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  componentDidMount: function componentDidMount() {
    if (this.props.animationDuration) {
      var transform = this._getTransformWithScale(0);

      d3.select(this.bar).attr('transform', transform).transition().duration(this.props.animationDuration).attr('transform', 'scale(1)');
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return !_isEqual(_omit(nextProps, _functions(nextProps)), _omit(this.props, _functions(this.props)));
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.props.hovering && this.props.animateOnHover) {
      var transform = this._getTransformWithScale(0.9);

      d3.select(this.bar).transition().duration(100).attr('transform', transform).transition().duration(100).attr('transform', 'scale(1)');
    }
  },
  _getTransformWithScale: function _getTransformWithScale(factor) {
    var centerX = 0;
    var centerY = this.props.value > 0 ? this.props.y + this.props.height : this.props.y;
    var sx = -centerX * (factor - 1);
    var sy = -centerY * (factor - 1);

    return 'translate(' + sx + ',' + sy + ') scale(1, ' + factor + ')';
  },
  _drawPath: function _drawPath(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        value = _ref.value,
        radius = _ref.radius;

    if (value > 0) {
      return 'M' + x + ',' + y + 'h' + (width - radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - radius) + 'h' + -width + 'v' + (-height + radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + 'Z';
    } else {
      return 'M' + x + ',' + y + 'h' + width + 'v' + (height - radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (radius * 2 - width) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (radius - height) + 'Z';
    }
  },
  render: function render() {
    var _this = this;

    return React.createElement('path', {
      d: this._drawPath({
        x: this.props.x,
        y: this.props.y,
        width: this.props.width,
        height: this.props.height,
        value: this.props.value,
        radius: this.props.radius
      }),
      onClick: this.props.onClick,
      onMouseOut: this.props.onMouseOut,
      onMouseOver: this.props.onMouseOver,
      ref: function ref(_ref2) {
        _this.bar = _ref2;
      },
      style: this.props.style
    });
  }
});

var BarChart = React.createClass({
  displayName: 'BarChart',

  propTypes: {
    animateOnHover: React.PropTypes.bool,
    barRadius: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number,
    initialSelectedData: React.PropTypes.object,
    margin: React.PropTypes.shape({
      top: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      left: React.PropTypes.number
    }),
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    showTooltips: React.PropTypes.bool,
    style: React.PropTypes.object,
    tooltipFormat: React.PropTypes.func,
    width: React.PropTypes.number,
    xAxis: React.PropTypes.element,
    yAxis: React.PropTypes.element
  },

  getDefaultProps: function getDefaultProps() {
    return {
      animateOnHover: false,
      barRadius: 3,
      height: 300,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 20
      },
      onClick: function onClick() {},
      onHover: function onHover() {},
      style: {},
      tooltipFormat: function tooltipFormat(val) {
        return val;
      },
      width: 500,
      showTooltips: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      hoveringObj: {},
      clickedData: this.props.initialSelectedData || {}
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state);
  },
  componentDidUpdate: function componentDidUpdate() {
    var transform = void 0;

    if (Object.keys(this.state.hoveringObj).length) {
      var x = this._getTooltipX();
      var y = this._getTooltipY();

      transform = 'translate(' + x + ', ' + y + ')';
    } else {
      transform = 'translate(-1000, -1000)';
    }

    d3.select(this.tooltip).attr('transform', transform);
  },
  _handleMouseOver: function _handleMouseOver(x, y, width, height, data) {
    this.setState({
      hoveringObj: {
        x: x,
        y: y,
        width: width,
        height: height,
        value: data.value,
        label: data.label
      }
    });

    this.props.onHover(data);
  },
  _handleMouseOut: function _handleMouseOut() {
    this.setState({
      hoveringObj: {}
    });
  },
  _handleOnClick: function _handleOnClick(data) {
    this.setState({
      clickedData: data
    });

    this.props.onClick(data);
  },
  _getTooltipX: function _getTooltipX() {
    if (Object.keys(this.state.hoveringObj).length) {
      var margin = this.props.margin;
      var bb = this.tooltip.getBBox();
      var hoveringObj = this.state.hoveringObj;

      // Center the tooltip on the X Axis of the bar width
      var hoverCX = hoveringObj.width / 2 + hoveringObj.x + margin.left;
      var tooltipCX = bb.width / 2;

      return hoverCX - tooltipCX;
    }
    return -1000;
  },
  _getTooltipY: function _getTooltipY() {
    if (Object.keys(this.state.hoveringObj).length) {
      var margin = this.props.margin;

      if (this.state.hoveringObj.value < 0) {
        return this.state.hoveringObj.y + margin.top + this.state.hoveringObj.height + this.tooltip.getBBox().height;
      }
      return this.state.hoveringObj.y + margin.top - this.tooltip.getBBox().height / 2;
    }
    return -1000;
  },
  render: function render() {
    var _this2 = this;

    var styles = _merge({}, this.styles(), this.props.style);
    var _props = this.props,
        height = _props.height,
        margin = _props.margin,
        width = _props.width;

    var widthMargin = width - margin.left - margin.right;
    var heightMargin = height - margin.top - margin.bottom;

    var hasNegative = false;
    var hasPositive = false;

    var data = this.props.data.map(function (d) {
      if (!hasNegative && d.value < 0) {
        hasNegative = true;
      } else if (!hasPositive && d.value > 0) {
        hasPositive = true;
      }
      return d.value;
    });
    var yDomain = void 0;

    if (hasNegative && hasPositive) {
      yDomain = [Math.min.apply(null, data), Math.max.apply(null, data)];
    } else if (hasNegative && !hasPositive) {
      yDomain = [Math.min.apply(null, data), 0];
    } else {
      yDomain = [0, Math.max.apply(null, data)];
    }

    var xDomain = this.props.data.map(function (d) {
      return d.label;
    });

    var yFunc = d3.scale.linear().domain(yDomain).range([heightMargin, 0]);

    var xFunc = d3.scale.ordinal().domain(xDomain).rangeRoundBands([0, widthMargin], 0.2);

    return React.createElement(
      'div',
      { style: _extends({}, styles.component, this.props.style) },
      React.createElement(
        'svg',
        {
          height: height + margin.top + margin.bottom,
          preserveAspectRatio: 'xMinYMin meet',
          width: width + margin.left + margin.right,
          xmlns: 'http://www.w3.org/2000/svg'
        },
        React.createElement(
          'g',
          { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
          this.props.data.map(function (d) {
            if (d.value === 0) {
              return null;
            }

            var positive = d.value > 0;
            var x = xFunc(d.label);
            var y = positive ? yFunc(d.value) : yFunc(0);
            var w = xFunc.rangeBand();
            var h = hasNegative ? Math.abs(yFunc(d.value) - yFunc(0)) : heightMargin - yFunc(d.value);
            var key = d.label + d.value;
            var clicked = _this2.state.clickedData.value === d.value && _this2.state.clickedData.label === d.label;
            var hovering = _this2.state.hoveringObj.value === d.value && _this2.state.hoveringObj.label === d.label;
            var baseStyle = d.color ? _extends({}, styles.bar, { fill: d.color }) : styles.bar;
            var style = void 0;

            if (clicked) {
              style = _extends({}, baseStyle, positive ? styles.positiveBarClicked : styles.negativeBarClicked);
            } else if (hovering) {
              style = _extends({}, baseStyle, positive ? styles.positiveBarHover : styles.negativeBarHover);
            } else {
              style = baseStyle;
            }

            return React.createElement(Bar, {
              animateOnHover: _this2.props.animateOnHover,
              animationDuration: 700,
              clicked: clicked,
              height: h,
              hovering: hovering,
              key: key,
              onClick: _this2._handleOnClick.bind(null, d),
              onMouseOut: _this2._handleMouseOut,
              onMouseOver: _this2._handleMouseOver.bind(null, x, y, w, h, d),
              radius: _this2.props.barRadius,
              style: style,
              value: d.value,
              width: w,
              x: x,
              y: y
            });
          })
        ),
        this.props.yAxis ? this.props.yAxis : null,
        this.props.xAxis ? this.props.xAxis : null,
        React.createElement(
          'g',
          {
            ref: function ref(_ref3) {
              _this2.tooltip = _ref3;
            },
            style: styles.tooltipContainer
          },
          React.createElement(
            'text',
            { style: styles.tooltipText },
            this.props.tooltipFormat(this.state.hoveringObj.value)
          )
        )
      )
    );
  },
  styles: function styles() {
    return {
      bar: {
        fill: StyleConstants.Colors.FOG
      },
      positiveBarHover: {
        fill: StyleConstants.Colors.PRIMARY
      },
      negativeBarHover: {
        fill: StyleConstants.Colors.PRIMARY
      },
      positiveBarClicked: {
        fill: StyleConstants.Colors.PRIMARY
      },
      negativeBarClicked: {
        fill: StyleConstants.Colors.PRIMARY
      },
      tooltipContainer: {},
      tooltipText: {
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        color: StyleConstants.Colors.CHARCOAL,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }
    };
  }
});

module.exports = BarChart;