'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _isEqual = require('lodash/isEqual');
var PropTypes = require('prop-types');
var React = require('react');
var d3 = require('d3');

var StyleConstants = require('../constants/Style');

var Gauge = function (_React$Component) {
  _inherits(Gauge, _React$Component);

  function Gauge() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Gauge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Gauge.__proto__ || Object.getPrototypeOf(Gauge)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      radiansMultiplier: Math.PI / 180
    }, _this._setupD3Functions = function (props) {
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
    }, _this._buildSegments = function (props) {
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
    }, _this._renderArcs = function () {
      var segments = _this._buildSegments(_this.props);

      return segments.map(function (point, i) {
        return React.createElement(
          'g',
          {
            key: point.id
          },
          React.createElement('path', {
            className: 'arc-' + _this.props.id,
            d: _this.state.standardArc(point),
            fill: _this.props.colors[i],
            opacity: _this.props.opacity
          })
        );
      });
    }, _this._renderBaseArc = function () {
      return React.createElement(
        'g',
        null,
        React.createElement('path', { d: _this.state.baseArc(), fill: _this.props.baseArcColor })
      );
    }, _this._renderDataPoints = function () {
      var dataPoints = _this.props.dataPoints.map(function (dataPoint) {
        return dataPoint.value;
      });

      return dataPoints.map(function (dataPoint, index) {
        var percentOfTotal = dataPoint / _this.props.chartTotal;
        var endAngle = percentOfTotal * 270 - 135;

        var dataPointArc = d3.svg.arc().outerRadius(_this.state.radius - _this.props.activeOffset).innerRadius(_this.state.radius - _this.props.arcWidth).startAngle(endAngle * _this.state.radiansMultiplier).endAngle(endAngle * _this.state.radiansMultiplier);

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

      if (_this.props.showDataLabel && _this.props.children) {
        return React.createElement(
          'div',
          {
            className: 'mx-gauge-data',
            onClick: _this._handleClick,
            style: styles.center
          },
          _this.props.children
        );
      } else {
        var number = _this.props.formatter(_this.props.numberLabel);
        var numberColor = _this.props.numberLabelColor;
        var text = _this.props.textLabel;
        var textColor = _this.props.textLabelColor;

        return React.createElement(
          'div',
          {
            className: 'mx-gauge-data',
            onClick: _this._handleClick,
            style: styles.center
          },
          React.createElement(
            'div',
            { className: 'mx-gauge-data-value', style: _extends({}, styles.number, { color: numberColor }) },
            number
          ),
          React.createElement(
            'div',
            { className: 'mx-gauge-data-label', style: _extends({}, styles.label, { color: textColor }) },
            text
          )
        );
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
          fontSize: StyleConstants.FontSizes.LARGE,
          marginTop: 5
        },
        number: {
          fontWeight: 300
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Gauge, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._setupD3Functions(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!_isEqual(this.props.data, newProps.data)) {
        this._setupD3Functions(newProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
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
          className: 'mx-gauge',
          style: _extends({}, styles.component, this.props.style, { fontSize: fontSize, height: this.props.height, width: this.props.width })
        },
        this._renderDataLabel(),
        React.createElement(
          'svg',
          {
            className: 'mx-gauge-svg',
            height: this.props.height,
            width: this.props.width
          },
          React.createElement(
            'g',
            { className: 'mx-gauge-g', transform: position },
            this._renderBaseArc(),
            this._renderArcs(),
            this._renderDataPoints()
          )
        )
      );
    }
  }]);

  return Gauge;
}(React.Component);

Gauge.propTypes = {
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
  width: PropTypes.number
};
Gauge.defaultProps = {
  activeOffset: 0,
  arcWidth: 10,
  baseArcColor: StyleConstants.Colors.BASE_ARC,
  colors: [StyleConstants.Colors.PRIMARY].concat(d3.scale.category20().range()),
  data: [],
  dataPointColors: [StyleConstants.Colors.CHARCOAL].concat(d3.scale.category20b().range()),
  dataPointRadius: 5,
  dataPoints: [],
  formatter: function formatter(value) {
    return value;
  },

  numberLabelColor: StyleConstants.Colors.PRIMARY,
  height: 150,
  id: 'gauge',
  numberOfSegments: 6,
  opacity: 1,
  padAngle: 0.02,
  showBaseArc: true,
  showDataLabel: true,
  textLabelColor: StyleConstants.Colors.ASH,
  width: 150
};


module.exports = Gauge;