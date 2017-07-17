'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var _isEqual = require('lodash/isEqual');
var _merge = require('lodash/merge');
var _omit = require('lodash/omit');
var _functions = require('lodash/functions');

var StyleConstants = require('../constants/Style');

var Bar = function (_React$Component) {
  _inherits(Bar, _React$Component);

  function Bar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bar.__proto__ || Object.getPrototypeOf(Bar)).call.apply(_ref, [this].concat(args))), _this), _this._getTransformWithScale = function (factor) {
      var centerX = 0;
      var centerY = _this.props.value > 0 ? _this.props.y + _this.props.height : _this.props.y;
      var sx = -centerX * (factor - 1);
      var sy = -centerY * (factor - 1);

      return 'translate(' + sx + ',' + sy + ') scale(1, ' + factor + ')';
    }, _this._drawPath = function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          width = _ref2.width,
          height = _ref2.height,
          value = _ref2.value,
          radius = _ref2.radius;

      if (value > 0 || value === 0 && !_this.props.hasNegative) {
        return 'M' + x + ',' + y + 'h' + (width - radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - radius) + 'h' + -width + 'v' + (-height + radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + 'Z';
      } else if (value < 0 || value === 0 && !_this.props.hasPositive) {
        return 'M' + x + ',' + y + 'h' + width + 'v' + (height - radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (radius * 2 - width) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (radius - height) + 'Z';
      } else {
        return 'M' + x + ',' + y + 'h' + (width - radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - radius) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (radius * 2 - width) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (radius - height) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + 'Z';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.animationDuration) {
        var transform = this._getTransformWithScale(0);

        d3.select(this.bar).attr('transform', transform).transition().duration(this.props.animationDuration).attr('transform', 'scale(1)');
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !_isEqual(_omit(nextProps, _functions(nextProps)), _omit(this.props, _functions(this.props)));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.hovering && this.props.animateOnHover) {
        var transform = this._getTransformWithScale(0.9);

        d3.select(this.bar).transition().duration(100).attr('transform', transform).transition().duration(100).attr('transform', 'scale(1)');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hasMinBarHeight = this.props.height === 0 && this.props.minBarHeight;
      var divisor = this.props.hasNegative && this.props.hasPositive ? 2 : 1;

      var y = this.props.y;

      if (hasMinBarHeight) {
        if (this.props.hasNegative && !this.props.hasPositive) {
          y = 0;
        } else {
          y = this.props.y - this.props.minBarHeight / divisor;
        }
      }

      return React.createElement('path', {
        d: this._drawPath({
          x: this.props.x,
          y: y,
          width: this.props.width,
          height: this.props.height,
          value: this.props.value,
          radius: this.props.radius
        }),
        onClick: this.props.onClick,
        onMouseOut: this.props.onMouseOut,
        onMouseOver: this.props.onMouseOver,
        ref: function ref(_ref3) {
          _this2.bar = _ref3;
        },
        style: this.props.style
      });
    }
  }]);

  return Bar;
}(React.Component);

Bar.propTypes = {
  animateOnHover: PropTypes.bool,
  animationDuration: PropTypes.number,
  hasNegative: PropTypes.bool,
  hasPositive: PropTypes.bool,
  height: PropTypes.number,
  hovering: PropTypes.bool,
  minBarHeight: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  radius: PropTypes.number,
  value: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

var BarChart = function (_React$Component2) {
  _inherits(BarChart, _React$Component2);

  function BarChart() {
    var _ref4;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, BarChart);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref4 = BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call.apply(_ref4, [this].concat(args))), _this3), _this3.state = {
      hoveringObj: {},
      clickedData: _this3.props.initialSelectedData || {},
      hasNegative: false,
      hasPositive: false
    }, _this3._hasPositiveOrNegativeValues = function () {
      var hasNegative = false;
      var hasPositive = false;

      _this3.props.data.forEach(function (d) {
        if (!hasNegative && d.value < 0) {
          hasNegative = true;
        } else if (!hasPositive && d.value > 0) {
          hasPositive = true;
        }
        return d.value;
      });

      _this3.setState({
        hasNegative: hasNegative,
        hasPositive: hasPositive
      });
    }, _this3._handleMouseOver = function (x, y, width, height, data) {
      _this3.setState({
        hoveringObj: {
          x: x,
          y: y,
          width: width,
          height: height,
          value: data.value,
          label: data.label
        }
      });

      _this3.props.onHover(data);
    }, _this3._handleMouseOut = function () {
      _this3.setState({
        hoveringObj: {}
      });
    }, _this3._handleOnClick = function (data) {
      _this3.setState({
        clickedData: data
      });

      _this3.props.onClick(data);
    }, _this3._getTooltipX = function () {
      if (Object.keys(_this3.state.hoveringObj).length) {
        var margin = _this3.props.margin;
        var bb = _this3.tooltip.getBBox();
        var hoveringObj = _this3.state.hoveringObj;

        // Center the tooltip on the X Axis of the bar width
        var hoverCX = hoveringObj.width / 2 + hoveringObj.x + margin.left;
        var tooltipCX = bb.width / 2;

        return hoverCX - tooltipCX;
      }
      return -1000;
    }, _this3._getTooltipY = function () {
      if (Object.keys(_this3.state.hoveringObj).length) {
        var margin = _this3.props.margin;
        var negativeValue = _this3.state.hoveringObj.value < 0;
        var positiveValue = _this3.state.hoveringObj.value > 0;
        var tooltipHeight = _this3.state.hoveringObj.y + margin.top;
        var bboxHeight = _this3.tooltip.getBBox().height;
        var negativeHeightAdjustment = _this3.state.hoveringObj.height + bboxHeight;
        var positiveHeightAdjustment = tooltipHeight - bboxHeight / 2;
        var _this3$state = _this3.state,
            hasNegative = _this3$state.hasNegative,
            hasPositive = _this3$state.hasPositive;

        var divisor = hasNegative && hasPositive ? 2 : 1;

        if (negativeValue) {
          return tooltipHeight + negativeHeightAdjustment;
        } else if (positiveValue) {
          return positiveHeightAdjustment;
        } else {
          if (hasNegative && !hasPositive) {
            return negativeHeightAdjustment + _this3.props.minBarHeight + tooltipHeight;
          }
          return positiveHeightAdjustment - _this3.props.minBarHeight / divisor;
        }
      }
      return -1000;
    }, _this3._getHeight = function (baseHeight) {
      if (_this3.props.minBarHeight) {
        var adjuster = _this3.props.barRadius > _this3.props.minBarHeight ? _this3.props.barRadius : _this3.props.minBarHeight;

        return baseHeight + adjuster;
      } else {
        return baseHeight;
      }
    }, _this3._getRadius = function (d) {
      if (d.value === 0 && _this3.props.minBarHeight) {
        return Math.min(_this3.props.barRadius, _this3.props.minBarHeight);
      } else {
        return _this3.props.barRadius;
      }
    }, _this3.styles = function () {
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
        },
        threshold: {
          stroke: StyleConstants.Colors.ASH,
          strokeDasharray: '4,4',
          strokeWidth: 1
        }
      };
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(BarChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._hasPositiveOrNegativeValues();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var transform = void 0;

      if (Object.keys(this.state.hoveringObj).length) {
        var x = this._getTooltipX();
        var y = this._getTooltipY();

        transform = 'translate(' + x + ', ' + y + ')';
      } else {
        transform = 'translate(-1000, -1000)';
      }

      d3.select(this.tooltip).attr('transform', transform);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var styles = _merge({}, this.styles(), this.props.style);
      var _props = this.props,
          height = _props.height,
          margin = _props.margin,
          width = _props.width;

      var widthMargin = width - margin.left - margin.right;
      var heightMargin = height - margin.top - margin.bottom;
      var _state = this.state,
          hasNegative = _state.hasNegative,
          hasPositive = _state.hasPositive;

      var data = this.props.data.reduce(function (acc, d) {
        return acc.concat(d.value);
      }, []);
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
              if (d.value === 0 && !_this4.props.minBarHeight) {
                return null;
              }

              var positive = d.value > 0;
              var x = xFunc(d.label);
              var y = positive ? yFunc(d.value) : yFunc(0);
              var w = xFunc.rangeBand();
              var baseHeight = hasNegative ? Math.abs(yFunc(d.value) - yFunc(0)) : heightMargin - yFunc(d.value);
              var h = _this4._getHeight(baseHeight);
              var r = _this4._getRadius(d);
              var key = d.label + d.value;
              var clicked = _this4.state.clickedData.value === d.value && _this4.state.clickedData.label === d.label;
              var hovering = _this4.state.hoveringObj.value === d.value && _this4.state.hoveringObj.label === d.label;
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
                animateOnHover: _this4.props.animateOnHover,
                animationDuration: 700,
                clicked: clicked,
                hasNegative: hasNegative,
                hasPositive: hasPositive,
                height: h,
                hovering: hovering,
                key: key,
                minBarHeight: _this4.props.minBarHeight,
                onClick: _this4._handleOnClick.bind(null, d),
                onMouseOut: _this4._handleMouseOut,
                onMouseOver: _this4._handleMouseOver.bind(null, x, y, w, h, d),
                radius: r,
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
          this.props.threshold ? React.createElement(
            'g',
            { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
            React.createElement('line', {
              style: styles.threshold,
              x1: 0,
              x2: width - margin.left - margin.right,
              y1: yFunc(this.props.threshold),
              y2: yFunc(this.props.threshold)
            })
          ) : null,
          React.createElement(
            'g',
            {
              ref: function ref(_ref5) {
                _this4.tooltip = _ref5;
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
    }
  }]);

  return BarChart;
}(React.Component);

BarChart.propTypes = {
  animateOnHover: PropTypes.bool,
  barRadius: PropTypes.number,
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  initialSelectedData: PropTypes.object,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  minBarHeight: PropTypes.number,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  showTooltips: PropTypes.bool,
  style: PropTypes.object,
  threshold: PropTypes.number,
  tooltipFormat: PropTypes.func,
  width: PropTypes.number,
  xAxis: PropTypes.element,
  yAxis: PropTypes.element
};
BarChart.defaultProps = {
  animateOnHover: false,
  barRadius: 3,
  height: 300,
  margin: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 20
  },
  minBarHeight: 0,
  onClick: function onClick() {},
  onHover: function onHover() {},
  style: {},
  tooltipFormat: function tooltipFormat(val) {
    return val;
  },
  width: 500,
  showTooltips: true
};


module.exports = BarChart;