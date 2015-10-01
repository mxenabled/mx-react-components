'use strict';

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
    formatter: React.PropTypes.func,
    height: React.PropTypes.number,
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
      activeOffset: 3,
      animateOnHover: true,
      arcWidth: 80,
      baseArcColor: '#E5E5E5',
      colors: d3.scale.category20().range(),
      data: [],
      dataPointColors: d3.scale.category20b().range(),
      dataPointRadius: 40,
      dataPoints: [],
      defaultLabelText: 'Roll over an item for details',
      formatter: function formatter(value) {
        return value;
      },
      height: 360,
      onClick: function onClick() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      opacity: 1,
      padAngle: 0.01,
      showBaseArc: false,
      showDataLabel: true,
      width: 360
    };
  },

  getInitialState: function getInitialState() {
    return {
      activeIndex: -1
    };
  },

  componentDidMount: function componentDidMount() {
    this.setState({
      activeIndex: this.props.activeIndex
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: newProps.activeIndex
      });
    }
  },

  _handleMouseEnter: function _handleMouseEnter(index) {
    this.setState({
      activeIndex: index
    });

    this.props.onMouseEnter(index);
  },

  _handleMouseLeave: function _handleMouseLeave() {
    this.setState({
      activeIndex: -1
    });

    this.props.onMouseLeave();
  },

  _renderArcs: function _renderArcs() {
    var _this = this;

    if (this.props.data.length > 0) {
      var _ret = (function () {
        var dataSets = _this.props.data.map(function (item) {
          return item.value;
        });

        var valueTotal = dataSets.reduce(function (a, b) {
          return a + b;
        });

        var endAngle = _this.props.chartTotal ? valueTotal / _this.props.chartTotal : 1;
        var pie = d3.layout.pie().sort(null).padAngle(_this.props.padAngle).endAngle(endAngle * 2 * Math.PI);
        var values = pie(dataSets);
        var radius = Math.min(_this.props.width, _this.props.height) / 2;
        var standardArc = d3.svg.arc().outerRadius(radius - _this.props.activeOffset).innerRadius(radius - _this.props.arcWidth);
        var hoverArc = d3.svg.arc().outerRadius(radius).innerRadius(radius - _this.props.arcWidth);

        return {
          v: values.map(function (point, i) {
            var arc = _this.state.activeIndex === i && _this.props.animateOnHover ? hoverArc : standardArc;

            return React.createElement(
              'g',
              {
                key: i,
                onClick: _this.props.onClick.bind(null, i),
                onMouseEnter: _this._handleMouseEnter.bind(null, i),
                onMouseLeave: _this._handleMouseLeave
              },
              React.createElement('path', { d: arc(point), fill: _this.props.colors[i], opacity: _this.props.opacity })
            );
          })
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  },

  _renderBaseArc: function _renderBaseArc() {
    if (this.props.showBaseArc) {
      var radius = Math.min(this.props.width, this.props.height) / 2;

      var baseArc = d3.svg.arc().outerRadius(radius - this.props.activeOffset).innerRadius(radius - this.props.arcWidth).startAngle(0).endAngle(2 * Math.PI);

      return React.createElement(
        'g',
        { key: baseArc },
        React.createElement('path', { d: baseArc(), fill: this.props.baseArcColor })
      );
    }
  },

  _renderDataPoints: function _renderDataPoints() {
    var _this2 = this;

    var dataPoints = this.props.dataPoints.map(function (dataPoint) {
      return dataPoint.value;
    });

    var radius = Math.min(this.props.width, this.props.height) / 2;

    return dataPoints.map(function (dataPoint, index) {
      var endAngle = dataPoint / _this2.props.chartTotal;

      var dataPointArc = d3.svg.arc().outerRadius(radius - _this2.props.activeOffset).innerRadius(radius - _this2.props.arcWidth).startAngle(0).endAngle(endAngle * 2 * 2 * Math.PI);

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
    if (this.props.showDataLabel) {
      if (this.props.children) {
        return React.createElement(
          'div',
          { onClick: this.props.onClick, style: styles.center },
          this.props.children
        );
      } else if (this.state.activeIndex >= 0) {
        var activeDataSet = this.props.data[this.state.activeIndex] || {};
        var color = this.props.colors[this.state.activeIndex];
        var value = this.props.formatter(activeDataSet.value);

        return React.createElement(
          'div',
          { onClick: this.props.onClick, style: styles.center },
          React.createElement(
            'div',
            { style: styles.label },
            activeDataSet.name
          ),
          React.createElement(
            'div',
            { style: [styles.value, { color: color }] },
            value
          )
        );
      } else {
        return React.createElement(
          'div',
          { onClick: this.props.onClick, style: styles.center },
          React.createElement(
            'div',
            { style: styles.label },
            this.props.defaultLabelText
          )
        );
      }
    }
  },

  render: function render() {
    var position = 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')';

    return React.createElement(
      'div',
      { style: [styles.component, { height: this.props.height, width: this.props.width }] },
      this._renderDataLabel(),
      React.createElement(
        'svg',
        { height: this.props.height, width: this.props.width },
        React.createElement(
          'g',
          { style: styles.pointer, transform: position },
          this._renderBaseArc(),
          this._renderArcs(),
          this._renderDataPoints()
        )
      )
    );
  }
});

var styles = {
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
    color: '#333',
    fontSize: '14px',
    fontWeight: '800'
  },
  pointer: {
    cursor: 'pointer'
  },
  value: {
    fontSize: '24px',
    fontWeight: '400'
  }
};

module.exports = Radium(DonutChart);