'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _isEqual = require('lodash/isEqual');
var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var d3 = require('d3');

var StyleConstants = require('../constants/Style');

var DonutChart = function (_React$Component) {
  _inherits(DonutChart, _React$Component);

  function DonutChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DonutChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DonutChart.__proto__ || Object.getPrototypeOf(DonutChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeIndex: _this.props.activeIndex || -1
    }, _this._setupD3Functions = function (props) {
      var dataSets = props.data.map(function (item) {
        return item.value;
      });
      var valueTotal = dataSets.length ? dataSets.reduce(function (a, b) {
        return a + b;
      }) : 0;
      var endAngle = props.chartTotal ? valueTotal / props.chartTotal : 1;
      var pie = d3.layout.pie().sort(null).padAngle(props.padAngle).endAngle(endAngle * 2 * Math.PI);
      var values = pie(dataSets);
      var radius = Math.min(props.width, props.height) / 2;
      var standardArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth);
      var hoveredArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - props.arcWidth);
      var baseArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth).startAngle(0).endAngle(2 * Math.PI);
      var bounceArcAnimationStart = d3.svg.arc().outerRadius(10).innerRadius(5);
      var bounceArcAnimationStartPaths = values.map(function (point) {
        return bounceArcAnimationStart(point);
      });

      _this.setState({
        baseArc: baseArc,
        endAngle: endAngle,
        hoveredArc: hoveredArc,
        pie: pie,
        radius: radius,
        standardArc: standardArc,
        values: values,
        bounceArcAnimationStartPaths: bounceArcAnimationStartPaths
      });
    }, _this._animateChart = function () {
      switch (_this.props.animationTypeOnLoad) {
        case 'roll':
          _this._rollAnimate();
          break;
        case 'pop':
          _this._bounceAnimate();
          break;
        default:
          break;
      }
    }, _this._animateActiveArc = function (currentActiveIndex, nextActiveIndex) {
      var currentArcData = _this.state.values[currentActiveIndex];
      var nextArcData = _this.state.values[nextActiveIndex];

      if (currentArcData) {
        d3.select(_this['arc-' + _this.props.id + currentActiveIndex]).transition('currentArc').duration(200).attr('d', _this.state.standardArc(currentArcData));
      }

      if (nextArcData) {
        d3.select(_this['arc-' + _this.props.id + nextActiveIndex]).transition('nextArc').duration(200).attr('d', _this.state.hoveredArc(nextArcData));
      }
    }, _this._bounceAnimate = function () {
      d3.selectAll('.arc-' + _this.props.id).transition('bounce').ease(function (t) {
        // See Penner's Equation and D3 docs on custom easing function
        // for details on variable names.
        var constantMultiplier = 2;
        var maxValue = 1;
        var timePadding = 0.9;
        var time = t;
        var value = 0;

        var b0 = maxValue - time;
        var b1 = b0 * (maxValue - b0) + b0;
        var b2 = b0 * (maxValue - b1) + b1;
        var x0 = constantMultiplier * Math.sqrt(time);
        var x1 = x0 * Math.sqrt(time);
        var x2 = x1 * Math.sqrt(time) + timePadding;
        var t0 = maxValue / (maxValue + x0 + x1 + x2);
        var t1 = t0 + t0 * x0;
        var t2 = t1 + t0 * x1;
        var m0 = t0 + t0 * x0 / constantMultiplier;
        var m1 = t1 + t0 * x1 / constantMultiplier;
        var m2 = t2 + t0 * x2 / constantMultiplier;
        var a = maxValue / (t0 * t0);

        switch (true) {
          case time >= maxValue - time:
            value = maxValue;
            break;
          case time < t0:
            value = a * time * time;
            break;
          case time < t1:
            value = a * (time -= m0) * time + b0;
            break;
          case time < t2:
            value = a * (time -= m1) * time + b1;
            break;
          default:
            value = a * (time -= m2) * time + b2;
            break;
        }

        return value;
      }).duration(_this.props.animationDuration).attrTween('d', function (d, i, a) {
        return d3.interpolate(_this.state.bounceArcAnimationStartPaths[i], a);
      });
    }, _this._rollAnimate = function () {
      d3.selectAll('.arc-' + _this.props.id).transition('roll').duration(_this.props.animationDuration).attrTween('transform', function () {
        return d3.interpolateString('rotate(0)', 'rotate(360)');
      });
    }, _this._handleClick = function (index, event) {
      _this.props.onClick(_this.props.data[index], event);
    }, _this._handleMouseEnter = function (point) {
      if (_this.props.animateOnHover && _this.state.activeIndex !== point.index) {
        d3.select(_this[point.ref]).transition('mouseEnter').duration(200).attr('d', _this.state.hoveredArc(point.arc));
      }

      _this.props.onMouseEnter(_this.props.data[point.index], point.index);

      _this.setState({
        activeIndex: point.index
      });
    }, _this._handleMouseLeave = function (point) {
      if (_this.props.animateOnHover) {
        d3.select(_this[point.ref]).transition('mouseLeave').duration(200).attr('d', _this.state.standardArc(point.arc));
      }

      _this.props.onMouseLeave();

      _this.setState({
        activeIndex: -1
      });
    }, _this._renderArcs = function () {
      return _this.state.values.map(function (point, i) {
        return React.createElement(
          'g',
          {
            key: i,
            onClick: _this._handleClick.bind(null, i),
            onMouseEnter: _this._handleMouseEnter.bind(null, { arc: point, index: i, ref: 'arc-' + _this.props.id + i }),
            onMouseLeave: _this._handleMouseLeave.bind(null, { arc: point, index: i, ref: 'arc-' + _this.props.id + i })
          },
          React.createElement('path', {
            className: 'arc-' + _this.props.id,
            d: _this.state.standardArc(point),
            fill: _this.props.colors[i],
            opacity: _this.props.opacity,
            ref: function ref(_ref2) {
              _this['arc-' + _this.props.id + i] = _ref2;
            }
          })
        );
      });
    }, _this._renderBaseArc = function () {
      if (_this.props.showBaseArc) {
        return React.createElement(
          'g',
          null,
          React.createElement('path', { d: _this.state.baseArc(), fill: _this.props.baseArcColor })
        );
      } else {
        return null;
      }
    }, _this._renderDataPoints = function () {
      var dataPoints = _this.props.dataPoints.map(function (dataPoint) {
        return dataPoint.value;
      });

      return dataPoints.map(function (dataPoint, index) {
        var endAngle = dataPoint / _this.props.chartTotal;

        var dataPointArc = d3.svg.arc().outerRadius(_this.state.radius - _this.props.activeOffset).innerRadius(_this.state.radius - _this.props.arcWidth).startAngle(0).endAngle(endAngle * 2 * 2 * Math.PI);

        return React.createElement('circle', {
          cx: '0',
          cy: '0',
          fill: _this.props.dataPointColors[index],
          key: index,
          r: _this.props.dataPointRadius,
          transform: 'translate(' + dataPointArc.centroid() + ')'
        });
      });
    }, _this._renderDataLabel = function () {
      var styles = _this.styles();

      if (_this.props.showDataLabel) {
        if (_this.props.children) {
          return React.createElement(
            'div',
            {
              className: 'mx-donutchart-data',
              onClick: _this._handleClick,
              style: styles.center
            },
            _this.props.children
          );
        } else {
          var activeDataSet = _this.props.data[_this.state.activeIndex] || {};
          var color = _this.state.activeIndex === -1 ? _this.props.colors[0] : _this.props.colors[_this.state.activeIndex];
          var text = _this.state.activeIndex === -1 ? _this.props.defaultLabelText : activeDataSet.name;
          var value = _this.state.activeIndex === -1 ? _this.props.formatter(_this.props.defaultLabelValue) : _this.props.formatter(activeDataSet.value);

          return React.createElement(
            'div',
            {
              className: 'mx-donutchart-data',
              onClick: _this._handleClick,
              style: styles.center
            },
            React.createElement(
              'div',
              { className: 'mx-donutchart-data-value', style: [styles.value, { color: color }] },
              value
            ),
            React.createElement(
              'div',
              { className: 'mx-donutchart-data-label', style: styles.label },
              text
            )
          );
        }
      } else {
        return null;
      }
    }, _this.styles = function () {
      return {
        component: {
          position: 'relative',
          fontFamily: StyleConstants.FontFamily
        },
        center: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          textAlign: 'center',
          transform: 'translate(-50%, -50%)'
        },
        label: {
          color: StyleConstants.Colors.ASH,
          fontSize: '0.4em',
          marginTop: 5
        },
        value: {
          fontWeight: 300
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DonutChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._setupD3Functions(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._animateChart();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this._setupD3Functions(newProps);

      if (newProps.activeIndex !== this.props.activeIndex) {
        this.setState({
          activeIndex: newProps.activeIndex
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!_isEqual(prevProps.data, this.props.data)) {
        this._animateChart();
      }

      if (!_isEqual(prevProps.activeIndex, this.props.activeIndex)) {
        this._animateActiveArc(prevProps.activeIndex, this.props.activeIndex);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';
      var fontSize = Math.min(this.props.width, this.props.height) * 0.2;
      var styles = this.styles();

      return React.createElement(
        'div',
        {
          className: 'mx-donutchart',
          style: [styles.component, this.props.style, { fontSize: fontSize, height: this.props.height, width: this.props.width }]
        },
        this._renderDataLabel(),
        React.createElement(
          'svg',
          {
            className: 'mx-donutchart-svg',
            height: this.props.height,
            width: this.props.width
          },
          React.createElement(
            'g',
            { className: 'mx-donutchart-g', transform: position },
            this._renderBaseArc(),
            this._renderArcs(),
            this._renderDataPoints()
          )
        )
      );
    }
  }]);

  return DonutChart;
}(React.Component);

DonutChart.propTypes = {
  activeIndex: PropTypes.number,
  activeOffset: PropTypes.number,
  animateOnHover: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationTypeOnLoad: PropTypes.oneOf(['roll', 'pop']),
  arcWidth: PropTypes.number,
  baseArcColor: PropTypes.string,
  chartTotal: PropTypes.number,
  children: PropTypes.node,
  colors: PropTypes.array,
  data: PropTypes.array.isRequired,
  dataPointColors: PropTypes.array,
  dataPointRadius: PropTypes.number,
  dataPoints: PropTypes.array,
  defaultLabelText: PropTypes.string,
  defaultLabelValue: PropTypes.string,
  formatter: PropTypes.func,
  height: PropTypes.number,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  opacity: PropTypes.number,
  padAngle: PropTypes.number,
  showBaseArc: PropTypes.bool,
  showDataLabel: PropTypes.bool,
  width: PropTypes.number
};
DonutChart.defaultProps = {
  activeIndex: -1,
  activeOffset: 0,
  animateOnHover: false,
  animationDuration: 500,
  arcWidth: 10,
  baseArcColor: StyleConstants.Colors.BASE_ARC,
  colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
  data: [],
  dataPointColors: [StyleConstants.Colors.LIME].concat(d3.scale.category20b().range()),
  dataPointRadius: 5,
  dataPoints: [],
  formatter: function formatter(value) {
    return value;
  },

  height: 150,
  id: 'donut-chart',
  onClick: function onClick() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},

  opacity: 1,
  padAngle: 0.02,
  showBaseArc: true,
  showDataLabel: true,
  width: 150
};


module.exports = Radium(DonutChart);