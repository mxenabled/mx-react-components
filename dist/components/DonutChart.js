"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _isEqual = require('lodash/isEqual');

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var d3 = require('d3');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var DonutChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DonutChart, _React$Component);

  function DonutChart() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DonutChart);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DonutChart)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      activeIndex: _this.props.activeIndex || -1
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_setupD3Functions", function (props) {
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
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_animateChart", function () {
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
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_animateActiveArc", function (currentActiveIndex, nextActiveIndex) {
      var currentArcData = _this.state.values[currentActiveIndex];
      var nextArcData = _this.state.values[nextActiveIndex];

      if (currentArcData) {
        d3.select(_this['arc-' + _this.props.id + currentActiveIndex]).transition('currentArc').duration(200).attr('d', _this.state.standardArc(currentArcData));
      }

      if (nextArcData) {
        d3.select(_this['arc-' + _this.props.id + nextActiveIndex]).transition('nextArc').duration(200).attr('d', _this.state.hoveredArc(nextArcData));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_bounceAnimate", function () {
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
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_rollAnimate", function () {
      d3.selectAll('.arc-' + _this.props.id).transition('roll').duration(_this.props.animationDuration).attrTween('transform', function () {
        return d3.interpolateString('rotate(0)', 'rotate(360)');
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClick", function (index, event) {
      _this.props.onClick(_this.props.data[index], event);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleMouseEnter", function (point) {
      if (_this.props.animateOnHover && _this.state.activeIndex !== point.index) {
        d3.select(_this[point.ref]).transition('mouseEnter').duration(200).attr('d', _this.state.hoveredArc(point.arc));
      }

      _this.props.onMouseEnter(_this.props.data[point.index], point.index);

      _this.setState({
        activeIndex: point.index
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleMouseLeave", function (point) {
      if (_this.props.animateOnHover) {
        d3.select(_this[point.ref]).transition('mouseLeave').duration(200).attr('d', _this.state.standardArc(point.arc));
      }

      _this.props.onMouseLeave();

      _this.setState({
        activeIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderArcs", function (colors) {
      return _this.state.values.map(function (point, i) {
        return React.createElement("g", {
          key: i,
          onClick: _this._handleClick.bind(null, i),
          onMouseEnter: _this._handleMouseEnter.bind(null, {
            arc: point,
            index: i,
            ref: 'arc-' + _this.props.id + i
          }),
          onMouseLeave: _this._handleMouseLeave.bind(null, {
            arc: point,
            index: i,
            ref: 'arc-' + _this.props.id + i
          })
        }, React.createElement("path", {
          className: 'arc-' + _this.props.id,
          d: _this.state.standardArc(point),
          fill: colors[i],
          opacity: _this.props.opacity,
          ref: function ref(_ref) {
            _this['arc-' + _this.props.id + i] = _ref;
          }
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderBaseArc", function (baseArcColor) {
      if (_this.props.showBaseArc) {
        return React.createElement("g", null, React.createElement("path", {
          d: _this.state.baseArc(),
          fill: baseArcColor
        }));
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderDataPoints", function (dataPointColors) {
      var dataPoints = _this.props.dataPoints.map(function (dataPoint) {
        return dataPoint.value;
      });

      return dataPoints.map(function (dataPoint, index) {
        var endAngle = dataPoint / _this.props.chartTotal;
        var dataPointArc = d3.svg.arc().outerRadius(_this.state.radius - _this.props.activeOffset).innerRadius(_this.state.radius - _this.props.arcWidth).startAngle(0).endAngle(endAngle * 2 * 2 * Math.PI);
        return React.createElement("circle", {
          cx: "0",
          cy: "0",
          fill: dataPointColors[index],
          key: index,
          r: _this.props.dataPointRadius,
          transform: 'translate(' + dataPointArc.centroid() + ')'
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderDataLabel", function (styles, colors) {
      if (_this.props.showDataLabel) {
        if (_this.props.children) {
          return React.createElement("div", {
            className: "mx-donutchart-data",
            style: styles.center
          }, _this.props.children);
        } else {
          var activeDataSet = _this.props.data[_this.state.activeIndex] || {};
          var color = _this.state.activeIndex === -1 ? colors[0] : colors[_this.state.activeIndex];
          var text = _this.state.activeIndex === -1 ? _this.props.defaultLabelText : activeDataSet.name;
          var value = _this.state.activeIndex === -1 ? _this.props.formatter(_this.props.defaultLabelValue) : _this.props.formatter(activeDataSet.value);
          return React.createElement("div", {
            className: "mx-donutchart-data",
            style: styles.center
          }, React.createElement("div", {
            className: "mx-donutchart-data-value",
            style: [styles.value, {
              color: color
            }]
          }, value), React.createElement("div", {
            className: "mx-donutchart-data-label",
            style: styles.label
          }, text));
        }
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: {
          position: 'relative',
          fontFamily: theme.FontFamily
        },
        center: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          textAlign: 'center',
          transform: 'translate(-50%, -50%)'
        },
        label: {
          color: theme.Colors.GRAY_500,
          fontSize: '0.4em',
          marginTop: 5
        },
        value: {
          fontWeight: 300
        }
      };
    });

    return _this;
  }

  _createClass(DonutChart, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this._setupD3Functions(this.props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._animateChart();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      this._setupD3Functions(newProps);

      if (newProps.activeIndex !== this.props.activeIndex) {
        this.setState({
          activeIndex: newProps.activeIndex
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!_isEqual(prevProps.data, this.props.data)) {
        this._animateChart();
      }

      if (!_isEqual(prevProps.activeIndex, this.props.activeIndex)) {
        this._animateActiveArc(prevProps.activeIndex, this.props.activeIndex);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';
      var fontSize = Math.min(this.props.width, this.props.height) * 0.2;
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var colors = this.props.colors || [theme.Colors.PRIMARY].concat(d3.scale.category20().range());
      var baseArcColor = this.props.baseArcColor || theme.Colors.BASE_ARC;
      var dataPointColors = this.props.dataPointColors || [theme.Colors.SUCCESS].concat(d3.scale.category20b().range());
      return React.createElement("div", {
        className: "mx-donutchart",
        style: [styles.component, this.props.style, {
          fontSize: fontSize,
          height: this.props.height,
          width: this.props.width
        }]
      }, this._renderDataLabel(styles, colors), React.createElement("svg", {
        className: "mx-donutchart-svg",
        height: this.props.height,
        width: this.props.width
      }, React.createElement("g", {
        className: "mx-donutchart-g",
        transform: position
      }, this._renderBaseArc(baseArcColor), this._renderArcs(colors), this._renderDataPoints(dataPointColors))));
    }
  }]);

  return DonutChart;
}(React.Component);

_defineProperty(DonutChart, "propTypes", {
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
  theme: themeShape,
  width: PropTypes.number
});

_defineProperty(DonutChart, "defaultProps", {
  activeIndex: -1,
  activeOffset: 0,
  animateOnHover: false,
  animationDuration: 500,
  arcWidth: 10,
  data: [],
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
});

module.exports = (0, _Theme.withTheme)(Radium(DonutChart));