"use strict";

var _Theme = require("../Theme");

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

var PropTypes = require('prop-types');

var React = require('react');

var d3 = require('d3');

var moment = require('moment');

var _merge = require('lodash/merge');

var _require = require('../../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../../utils/Style');

var BarTimeXAxis =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BarTimeXAxis, _React$Component);

  function BarTimeXAxis() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BarTimeXAxis);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BarTimeXAxis)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderAxis", function () {
      var timeAxisFunction = d3.svg.axis().scale(_this.props.xScaleFunction).tickValues(_this.props.tickValues).tickFormat(function (d) {
        return moment.unix(d).format(_this.props.timeAxisFormat);
      }).outerTickSize(0);
      d3.select(_this.timeAxis).call(timeAxisFunction);

      _this._styleChart();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_styleChart", function () {
      var theme = StyleUtils.mergeTheme(_this.props.theme);

      var style = _merge({}, _this.styles(theme), _this.props.style);

      var axis = d3.select(_this.timeAxis); // Style x axis labels

      axis.selectAll('text').style(style.text); // Style x axis path

      axis.selectAll('path').style(style.path);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        text: {
          fill: theme.Colors.GRAY_500,
          stroke: 'none',
          'font-size': theme.FontSizes.MEDIUM,
          'text-anchor': 'middle'
        },
        path: {
          stroke: theme.Colors.GRAY_300,
          'stroke-width': 1,
          fill: 'none'
        }
      };
    });

    return _this;
  }

  _createClass(BarTimeXAxis, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._renderAxis();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._renderAxis();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("g", {
        className: "x-bar-time-axis",
        ref: function ref(_ref) {
          return _this2.timeAxis = _ref;
        },
        transform: this.props.transform
      });
    }
  }]);

  return BarTimeXAxis;
}(React.Component);

_defineProperty(BarTimeXAxis, "propTypes", {
  style: PropTypes.object,
  theme: themeShape,
  tickRange: PropTypes.array,
  tickSize: PropTypes.number,
  tickValues: PropTypes.array,
  timeAxisFormat: PropTypes.string.isRequired,
  transform: PropTypes.string,
  xScaleFunction: PropTypes.func.isRequired
});

_defineProperty(BarTimeXAxis, "defaultProps", {
  style: {},
  tickSize: 6,
  tickValues: null,
  transform: 'translate(0,0)'
});

module.exports = (0, _Theme.withTheme)(BarTimeXAxis);