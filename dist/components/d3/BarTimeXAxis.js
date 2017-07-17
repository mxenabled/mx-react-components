'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var d3 = require('d3');
var moment = require('moment');
var _merge = require('lodash/merge');

var StyleConstants = require('../../constants/Style');

var BarTimeXAxis = function (_React$Component) {
  _inherits(BarTimeXAxis, _React$Component);

  function BarTimeXAxis() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BarTimeXAxis);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BarTimeXAxis.__proto__ || Object.getPrototypeOf(BarTimeXAxis)).call.apply(_ref, [this].concat(args))), _this), _this._renderAxis = function () {
      var timeAxisFunction = d3.svg.axis().scale(_this.props.xScaleFunction).tickValues(_this.props.tickValues).tickFormat(function (d) {
        return moment.unix(d).format(_this.props.timeAxisFormat);
      }).outerTickSize(0);

      d3.select(_this.timeAxis).call(timeAxisFunction);

      _this._styleChart();
    }, _this._styleChart = function () {
      var style = _merge({}, _this.styles(), _this.props.style);
      var axis = d3.select(_this.timeAxis);

      // Style x axis labels
      axis.selectAll('text').style(style.text);

      // Style x axis path
      axis.selectAll('path').style(style.path);
    }, _this.styles = function () {
      return {
        text: {
          fill: StyleConstants.Colors.ASH,
          stroke: 'none',
          'font-size': StyleConstants.FontSizes.MEDIUM,
          'text-anchor': 'middle'
        },
        path: {
          stroke: StyleConstants.Colors.FOG,
          'stroke-width': 1,
          fill: 'none'
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BarTimeXAxis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._renderAxis();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._renderAxis();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement('g', {
        className: 'x-bar-time-axis',
        ref: function ref(_ref2) {
          return _this2.timeAxis = _ref2;
        },
        transform: this.props.transform
      });
    }
  }]);

  return BarTimeXAxis;
}(React.Component);

BarTimeXAxis.propTypes = {
  style: PropTypes.object,
  tickRange: PropTypes.array,
  tickSize: PropTypes.number,
  tickValues: PropTypes.array,
  timeAxisFormat: PropTypes.string.isRequired,
  transform: PropTypes.string,
  xScaleFunction: PropTypes.func.isRequired
};
BarTimeXAxis.defaultProps = {
  style: {},
  tickSize: 6,
  tickValues: null,
  transform: 'translate(0,0)'
};


module.exports = BarTimeXAxis;