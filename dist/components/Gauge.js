"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var PropTypes = require('prop-types');

var React = require('react');

var d3 = require('d3');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var Gauge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Gauge, _React$Component);

  function Gauge() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Gauge);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Gauge)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      radiansMultiplier: Math.PI / 180
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_setupD3Functions", function (props) {
      var dataSets = props.data.map(function (item) {
        return item.value;
      });
      var startAngle = -135 * _this.state.radiansMultiplier;
      var endAngle = 135 * _this.state.radiansMultiplier;
      var pie = d3.layout.pie().padAngle(props.padAngle).endAngle(endAngle);
      var values = pie(dataSets);
      var radius = Math.min(props.width, props.height) / 2;
      var standardArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth);
      var hoveredArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - props.arcWidth);
      var baseArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth).startAngle(startAngle).endAngle(endAngle);

      _this.setState({
        baseArc: baseArc,
        endAngle: endAngle,
        hoveredArc: hoveredArc,
        pie: pie,
        radius: radius,
        standardArc: standardArc,
        values: values
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_buildSegments", function (props) {
      var numberOfSegments = props.numberOfSegments;
      var segmentSize = 270 / numberOfSegments;
      var convertToPie = _this.state.radiansMultiplier;
      var segments = [];
      var startAngle = -135;
      var endAngle = startAngle + segmentSize;

      for (var i = 1; i <= numberOfSegments; i++) {
        segments[i] = {
          id: 'segment' + i,
          startAngle: startAngle * convertToPie,
          endAngle: endAngle * convertToPie,
          padAngle: 0.02
        };
        startAngle = endAngle;
        endAngle = startAngle + segmentSize;
      }

      return segments;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderArcs", function (colors) {
      var segments = _this._buildSegments(_this.props);

      return segments.map(function (point, i) {
        return React.createElement("g", {
          key: point.id
        }, React.createElement("path", {
          className: 'arc-' + _this.props.id,
          d: _this.state.standardArc(point),
          fill: colors[i],
          opacity: _this.props.opacity
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderBaseArc", function (baseArcColor) {
      return React.createElement("g", null, React.createElement("path", {
        d: _this.state.baseArc(),
        fill: baseArcColor
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderDataPoints", function (dataPointColors) {
      var dataPoints = _this.props.dataPoints.map(function (dataPoint) {
        return dataPoint.value;
      });

      return dataPoints.map(function (dataPoint, index) {
        var percentOfTotal = dataPoint / _this.props.chartTotal;
        var endAngle = percentOfTotal * 270 - 135;
        var dataPointArc = d3.svg.arc().outerRadius(_this.state.radius - _this.props.activeOffset).innerRadius(_this.state.radius - _this.props.arcWidth).startAngle(endAngle * _this.state.radiansMultiplier).endAngle(endAngle * _this.state.radiansMultiplier);
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderDataLabel", function (styles, numberLabelColor, textLabelColor) {
      if (_this.props.showDataLabel && _this.props.children) {
        return React.createElement("div", {
          className: "mx-gauge-data",
          onClick: _this._handleClick,
          style: styles.center
        }, _this.props.children);
      } else {
        var number = _this.props.formatter(_this.props.numberLabel);

        var numberColor = numberLabelColor;
        var text = _this.props.textLabel;
        var textColor = textLabelColor;
        return React.createElement("div", {
          className: "mx-gauge-data",
          onClick: _this._handleClick,
          style: styles.center
        }, React.createElement("div", {
          className: "mx-gauge-data-value",
          style: _extends({}, styles.number, {
            color: numberColor
          })
        }, number), React.createElement("div", {
          className: "mx-gauge-data-label",
          style: _extends({}, styles.label, {
            color: textColor
          })
        }, text));
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
          fontSize: theme.FontSizes.LARGE,
          marginTop: 5
        },
        number: {
          fontWeight: 300
        }
      };
    });

    return _this;
  }

  _createClass(Gauge, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this._setupD3Functions(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (!_isEqual(this.props.data, newProps.data)) {
        this._setupD3Functions(newProps);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';
      var fontSize = Math.min(this.props.width, this.props.height) * 0.2;
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var baseArcColor = this.props.baseArcColor || theme.Colors.BASE_ARC;
      var colors = this.props.baseArcColor || [theme.Colors.PRIMARY].concat(d3.scale.category20().range());
      var dataPointColors = this.props.dataPointColors || [theme.Colors.GRAY_700].concat(d3.scale.category20b().range());
      var numberLabelColor = this.props.numberLabelColor || theme.Colors.PRIMARY;
      var textLabelColor = this.props.textLabelColor || theme.Colors.GRAY_500;
      return React.createElement("div", {
        className: "mx-gauge",
        style: _extends({}, styles.component, this.props.style, {
          fontSize: fontSize,
          height: this.props.height,
          width: this.props.width
        })
      }, this._renderDataLabel(styles, numberLabelColor, textLabelColor), React.createElement("svg", {
        className: "mx-gauge-svg",
        height: this.props.height,
        width: this.props.width
      }, React.createElement("g", {
        className: "mx-gauge-g",
        transform: position
      }, this._renderBaseArc(baseArcColor), this._renderArcs(colors), this._renderDataPoints(dataPointColors))));
    }
  }]);

  return Gauge;
}(React.Component);

_defineProperty(Gauge, "propTypes", {
  activeOffset: PropTypes.number,
  arcWidth: PropTypes.number,
  baseArcColor: PropTypes.string,
  chartTotal: PropTypes.number,
  children: PropTypes.node,
  colors: PropTypes.array,
  data: PropTypes.array.isRequired,
  dataPointColors: PropTypes.array,
  dataPointRadius: PropTypes.number,
  dataPoints: PropTypes.array,
  formatter: PropTypes.func,
  height: PropTypes.number,
  id: PropTypes.string,
  numberLabel: PropTypes.string,
  numberLabelColor: PropTypes.string,
  numberOfSegments: PropTypes.number,
  opacity: PropTypes.number,
  padAngle: PropTypes.number,
  showBaseArc: PropTypes.bool,
  showDataLabel: PropTypes.bool,
  textLabel: PropTypes.string,
  textLabelColor: PropTypes.string,
  theme: themeShape,
  width: PropTypes.number
});

_defineProperty(Gauge, "defaultProps", {
  activeOffset: 0,
  arcWidth: 10,
  data: [],
  dataPointRadius: 5,
  dataPoints: [],
  formatter: function formatter(value) {
    return value;
  },
  height: 150,
  id: 'gauge',
  numberOfSegments: 6,
  opacity: 1,
  padAngle: 0.02,
  showBaseArc: true,
  showDataLabel: true,
  width: 150
});

module.exports = (0, _Theme.withTheme)(Gauge);