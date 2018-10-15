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

var moment = require('moment');

var TimeXAxisGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeXAxisGroup, _React$Component);

  function TimeXAxisGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimeXAxisGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimeXAxisGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderAxis", function () {
      var timeAxisFunction = d3.svg.axis().scale(_this.props.xScaleFunction()).tickSize(_this.props.tickSize, _this.props.tickSize).tickValues(_this.props.ticks).tickFormat(function (d) {
        return moment.unix(d).format(_this.props.timeAxisFormat);
      });
      d3.select(_this.timeAxis).call(timeAxisFunction);
    });

    return _this;
  }

  _createClass(TimeXAxisGroup, [{
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
        className: "time-axis",
        ref: function ref(_ref) {
          return _this2.timeAxis = _ref;
        },
        transform: this.props.translation
      });
    }
  }]);

  return TimeXAxisGroup;
}(React.Component);

_defineProperty(TimeXAxisGroup, "propTypes", {
  ticks: PropTypes.array.isRequired,
  tickSize: PropTypes.number,
  timeAxisFormat: PropTypes.string.isRequired,
  translation: PropTypes.string,
  xScaleFunction: PropTypes.func.isRequired
});

_defineProperty(TimeXAxisGroup, "defaultProps", {
  tickSize: 6,
  translation: 'translate(0,0)'
});

module.exports = TimeXAxisGroup;