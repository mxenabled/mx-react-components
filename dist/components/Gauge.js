'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isEqual = require('lodash/isEqual');
var React = require('react');
var d3 = require('d3');

var StyleConstants = require('../constants/Style');

var Gauge = React.createClass({
  displayName: 'Gauge',

  propTypes: {
    activeOffset: React.PropTypes.number,
    arcWidth: React.PropTypes.number,
    baseArcColor: React.PropTypes.string,
    chartTotal: React.PropTypes.number,
    children: React.PropTypes.node,
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    dataPointColors: React.PropTypes.array,
    dataPointRadius: React.PropTypes.number,
    dataPoints: React.PropTypes.array,
    formatter: React.PropTypes.func,
    height: React.PropTypes.number,
    id: React.PropTypes.string,
    numberLabel: React.PropTypes.string,
    numberLabelColor: React.PropTypes.string,
    numberOfSegments: React.PropTypes.number,
    opacity: React.PropTypes.number,
    padAngle: React.PropTypes.number,
    showBaseArc: React.PropTypes.bool,
    showDataLabel: React.PropTypes.bool,
    textLabel: React.PropTypes.string,
    textLabelColor: React.PropTypes.string,
    width: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
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
  },
  getInitialState: function getInitialState() {
    return {
      radiansMultiplier: Math.PI / 180
    };
  },
  componentWillMount: function componentWillMount() {
    this._setupD3Functions(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (!_isEqual(this.props.data, newProps.data)) {
      this._setupD3Functions(newProps);
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  },
  _setupD3Functions: function _setupD3Functions(props) {
    var dataSets = props.data.map(function (item) {
      return item.value;
    });
    var startAngle = -135 * this.state.radiansMultiplier;
    var endAngle = 135 * this.state.radiansMultiplier;
    var pie = d3.layout.pie().padAngle(props.padAngle).endAngle(endAngle);
    var values = pie(dataSets);
    var radius = Math.min(props.width, props.height) / 2;
    var standardArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth);
    var hoveredArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - props.arcWidth);
    var baseArc = d3.svg.arc().outerRadius(radius - props.activeOffset).innerRadius(radius - props.arcWidth).startAngle(startAngle).endAngle(endAngle);

    this.setState({
      baseArc: baseArc,
      endAngle: endAngle,
      hoveredArc: hoveredArc,
      pie: pie,
      radius: radius,
      standardArc: standardArc,
      values: values
    });
  },
  _buildSegments: function _buildSegments(props) {
    var numberOfSegments = props.numberOfSegments;
    var segmentSize = 270 / numberOfSegments;
    var convertToPie = this.state.radiansMultiplier;
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
  },
  _renderArcs: function _renderArcs() {
    var _this = this;

    var segments = this._buildSegments(this.props);

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
  },
  _renderBaseArc: function _renderBaseArc() {
    return React.createElement(
      'g',
      null,
      React.createElement('path', { d: this.state.baseArc(), fill: this.props.baseArcColor })
    );
  },
  _renderDataPoints: function _renderDataPoints() {
    var _this2 = this;

    var dataPoints = this.props.dataPoints.map(function (dataPoint) {
      return dataPoint.value;
    });

    return dataPoints.map(function (dataPoint, index) {
      var percentOfTotal = dataPoint / _this2.props.chartTotal;
      var endAngle = percentOfTotal * 270 - 135;

      var dataPointArc = d3.svg.arc().outerRadius(_this2.state.radius - _this2.props.activeOffset).innerRadius(_this2.state.radius - _this2.props.arcWidth).startAngle(endAngle * _this2.state.radiansMultiplier).endAngle(endAngle * _this2.state.radiansMultiplier);

      return React.createElement('circle', {
        cx: '0',
        cy: '0',
        fill: _this2.props.dataPointColors[index],
        key: index,
        r: _this2.props.dataPointRadius,
        transform: 'translate(' + dataPointArc.centroid() + ')'
      });
    });
  },
  _renderDataLabel: function _renderDataLabel() {
    var styles = this.styles();

    if (this.props.showDataLabel && this.props.children) {
      return React.createElement(
        'div',
        {
          className: 'mx-gauge-data',
          onClick: this._handleClick,
          style: styles.center
        },
        this.props.children
      );
    } else {
      var number = this.props.formatter(this.props.numberLabel);
      var numberColor = this.props.numberLabelColor;
      var text = this.props.textLabel;
      var textColor = this.props.textLabelColor;

      return React.createElement(
        'div',
        {
          className: 'mx-gauge-data',
          onClick: this._handleClick,
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
  },
  render: function render() {
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
  },
  styles: function styles() {
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
  }
});

module.exports = Gauge;