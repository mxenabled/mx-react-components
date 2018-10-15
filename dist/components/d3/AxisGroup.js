"use strict";

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

var ChartUtils = require('../../utils/Chart');

var AxisGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AxisGroup, _React$Component);

  function AxisGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AxisGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AxisGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderAxis", function () {
      var max = d3.max(_this.props.data, function (d) {
        return d[_this.props.axis];
      });
      var min = d3.min(_this.props.data, function (d) {
        return d[_this.props.axis];
      });

      var _ChartUtils$getAxisTi = ChartUtils.getAxisTickSpecification(min, max),
          tickValues = _ChartUtils$getAxisTi.tickValues;

      var axisFunction = d3.svg.axis().scale(_this.props.scaleFunction()).orient(_this.props.orientation).tickFormat(_this.props.axisFormatFunction).ticks(tickValues.length).tickValues(tickValues);
      d3.select(_this.axisGroup).call(axisFunction);
    });

    return _this;
  }

  _createClass(AxisGroup, [{
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
        className: this.props.axis + '-axis',
        ref: function ref(_ref) {
          return _this2.axisGroup = _ref;
        },
        transform: this.props.translation
      });
    }
  }]);

  return AxisGroup;
}(React.Component);

_defineProperty(AxisGroup, "propTypes", {
  axis: PropTypes.string.isRequired,
  axisFormatFunction: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  orientation: PropTypes.string.isRequired,
  scaleFunction: PropTypes.func.isRequired,
  translation: PropTypes.string
});

_defineProperty(AxisGroup, "defaultProps", {
  translation: 'translate(0,0)'
});

module.exports = AxisGroup;