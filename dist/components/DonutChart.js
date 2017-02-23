'use strict';

var _isEqual = require('lodash/isEqual');
var React = require('react');
var Radium = require('radium');
var d3 = require('d3');

var StyleConstants = require('../constants/Style');

var DonutChart = React.createClass({
  displayName: 'DonutChart',

  propTypes: {
    activeIndex: React.PropTypes.number,
    activeOffset: React.PropTypes.number,
    animateOnHover: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    animationTypeOnLoad: React.PropTypes.oneOf(['roll', 'pop']),
    arcWidth: React.PropTypes.number,
    baseArcColor: React.PropTypes.string,
    chartTotal: React.PropTypes.number,
    children: React.PropTypes.node,
    colors: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
    dataPointColors: React.PropTypes.array,
    dataPointRadius: React.PropTypes.number,
    dataPoints: React.PropTypes.array,
    defaultLabelText: React.PropTypes.string,
    defaultLabelValue: React.PropTypes.string,
    formatter: React.PropTypes.func,
    height: React.PropTypes.number,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    opacity: React.PropTypes.number,
    padAngle: React.PropTypes.number,
    showBaseArc: React.PropTypes.bool,
    showDataLabel: React.PropTypes.bool,
    width: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
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
  },
  getInitialState: function getInitialState() {
    return {
      activeIndex: this.props.activeIndex || -1
    };
  },
  componentWillMount: function componentWillMount() {
    this._setupD3Functions(this.props);
  },
  componentDidMount: function componentDidMount() {
    this._animateChart();
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this._setupD3Functions(newProps);

    if (newProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: newProps.activeIndex
      });
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (!_isEqual(prevProps.data, this.props.data)) {
      this._animateChart();
    }

    if (!_isEqual(prevProps.activeIndex, this.props.activeIndex)) {
      this._animateActiveArc(prevProps.activeIndex, this.props.activeIndex);
    }
  },
  _setupD3Functions: function _setupD3Functions(props) {
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

    this.setState({
      baseArc: baseArc,
      endAngle: endAngle,
      hoveredArc: hoveredArc,
      pie: pie,
      radius: radius,
      standardArc: standardArc,
      values: values,
      bounceArcAnimationStartPaths: bounceArcAnimationStartPaths
    });
  },
  _animateChart: function _animateChart() {
    switch (this.props.animationTypeOnLoad) {
      case 'roll':
        this._rollAnimate();
        break;
      case 'pop':
        this._bounceAnimate();
        break;
      default:
        break;
    }
  },
  _animateActiveArc: function _animateActiveArc(currentActiveIndex, nextActiveIndex) {
    var currentArcData = this.state.values[currentActiveIndex];
    var nextArcData = this.state.values[nextActiveIndex];

    if (currentArcData) {
      d3.select(this['arc-' + this.props.id + currentActiveIndex]).transition('currentArc').duration(200).attr('d', this.state.standardArc(currentArcData));
    }

    if (nextArcData) {
      d3.select(this['arc-' + this.props.id + nextActiveIndex]).transition('nextArc').duration(200).attr('d', this.state.hoveredArc(nextArcData));
    }
  },
  _bounceAnimate: function _bounceAnimate() {
    var _this = this;

    d3.selectAll('.arc-' + this.props.id).transition('bounce').ease(function (t) {
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
    }).duration(this.props.animationDuration).attrTween('d', function (d, i, a) {
      return d3.interpolate(_this.state.bounceArcAnimationStartPaths[i], a);
    });
  },
  _rollAnimate: function _rollAnimate() {
    d3.selectAll('.arc-' + this.props.id).transition('roll').duration(this.props.animationDuration).attrTween('transform', function () {
      return d3.interpolateString('rotate(0)', 'rotate(360)');
    });
  },
  _handleClick: function _handleClick(index, event) {
    this.props.onClick(this.props.data[index], event);
  },
  _handleMouseEnter: function _handleMouseEnter(point) {
    if (this.props.animateOnHover && this.state.activeIndex !== point.index) {
      d3.select(this[point.ref]).transition('mouseEnter').duration(200).attr('d', this.state.hoveredArc(point.arc));
    }

    this.props.onMouseEnter(this.props.data[point.index], point.index);

    this.setState({
      activeIndex: point.index
    });
  },
  _handleMouseLeave: function _handleMouseLeave(point) {
    if (this.props.animateOnHover) {
      d3.select(this[point.ref]).transition('mouseLeave').duration(200).attr('d', this.state.standardArc(point.arc));
    }

    this.props.onMouseLeave();

    this.setState({
      activeIndex: -1
    });
  },
  _renderArcs: function _renderArcs() {
    var _this2 = this;

    return this.state.values.map(function (point, i) {
      return React.createElement(
        'g',
        {
          key: i,
          onClick: _this2._handleClick.bind(null, i),
          onMouseEnter: _this2._handleMouseEnter.bind(null, { arc: point, index: i, ref: 'arc-' + _this2.props.id + i }),
          onMouseLeave: _this2._handleMouseLeave.bind(null, { arc: point, index: i, ref: 'arc-' + _this2.props.id + i })
        },
        React.createElement('path', {
          className: 'arc-' + _this2.props.id,
          d: _this2.state.standardArc(point),
          fill: _this2.props.colors[i],
          opacity: _this2.props.opacity,
          ref: function ref(_ref) {
            _this2['arc-' + _this2.props.id + i] = _ref;
          }
        })
      );
    });
  },
  _renderBaseArc: function _renderBaseArc() {
    if (this.props.showBaseArc) {
      return React.createElement(
        'g',
        null,
        React.createElement('path', { d: this.state.baseArc(), fill: this.props.baseArcColor })
      );
    } else {
      return null;
    }
  },
  _renderDataPoints: function _renderDataPoints() {
    var _this3 = this;

    var dataPoints = this.props.dataPoints.map(function (dataPoint) {
      return dataPoint.value;
    });

    return dataPoints.map(function (dataPoint, index) {
      var endAngle = dataPoint / _this3.props.chartTotal;

      var dataPointArc = d3.svg.arc().outerRadius(_this3.state.radius - _this3.props.activeOffset).innerRadius(_this3.state.radius - _this3.props.arcWidth).startAngle(0).endAngle(endAngle * 2 * 2 * Math.PI);

      return React.createElement('circle', {
        cx: '0',
        cy: '0',
        fill: _this3.props.dataPointColors[index],
        key: index,
        r: _this3.props.dataPointRadius,
        transform: 'translate(' + dataPointArc.centroid() + ')'
      });
    });
  },
  _renderDataLabel: function _renderDataLabel() {
    var styles = this.styles();

    if (this.props.showDataLabel) {
      if (this.props.children) {
        return React.createElement(
          'div',
          {
            className: 'mx-donutchart-data',
            onClick: this._handleClick,
            style: styles.center
          },
          this.props.children
        );
      } else {
        var activeDataSet = this.props.data[this.state.activeIndex] || {};
        var color = this.state.activeIndex === -1 ? this.props.colors[0] : this.props.colors[this.state.activeIndex];
        var text = this.state.activeIndex === -1 ? this.props.defaultLabelText : activeDataSet.name;
        var value = this.state.activeIndex === -1 ? this.props.formatter(this.props.defaultLabelValue) : this.props.formatter(activeDataSet.value);

        return React.createElement(
          'div',
          {
            className: 'mx-donutchart-data',
            onClick: this._handleClick,
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
  },
  render: function render() {
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
        color: StyleConstants.Colors.ASH,
        fontSize: '0.4em',
        marginTop: 5
      },
      value: {
        fontWeight: 300
      }
    };
  }
});

module.exports = Radium(DonutChart);