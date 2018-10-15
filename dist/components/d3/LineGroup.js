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

var _require = require('../../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../../utils/Style');

var LineGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LineGroup, _React$Component);

  function LineGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LineGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LineGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_animateLine", function () {
      if (_this.props.shouldAnimate) {
        d3.select(_this.chartLine).transition().attr('d', _this.state.line(_this.props.data));
      }
    });

    return _this;
  }

  _createClass(LineGroup, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var flatLine = d3.svg.line().x(function (d) {
        return _this2.props.xScaleValueFunction(d.x);
      }).y(function () {
        return _this2.props.adjustedHeight;
      });
      var line = d3.svg.line().x(function (d) {
        return _this2.props.xScaleValueFunction(d.x);
      }).y(function (d) {
        return _this2.props.yScaleValueFunction(d.y);
      });
      this.setState({
        flatLine: flatLine,
        line: line
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._animateLine();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._animateLine();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var lineColor = this.props.lineColor || theme.Colors.GRAY_700;
      var _this$props = this.props,
          data = _this$props.data,
          dashLine = _this$props.dashLine,
          shouldAnimate = _this$props.shouldAnimate,
          strokeWidth = _this$props.strokeWidth,
          translation = _this$props.translation;
      return React.createElement("g", {
        className: "chart-line-group",
        transform: translation
      }, React.createElement("path", {
        d: shouldAnimate ? this.state.flatLine(data) : this.state.line(data),
        fill: "none",
        ref: function ref(_ref) {
          return _this3.chartLine = _ref;
        },
        stroke: lineColor,
        strokeDasharray: dashLine ? '4,4' : 'none',
        strokeWidth: strokeWidth
      }));
    }
  }]);

  return LineGroup;
}(React.Component);

_defineProperty(LineGroup, "propTypes", {
  adjustedHeight: PropTypes.number.isRequired,
  dashLine: PropTypes.bool,
  data: PropTypes.array.isRequired,
  lineColor: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  strokeWidth: PropTypes.number,
  theme: themeShape,
  translation: PropTypes.string,
  xScaleValueFunction: PropTypes.func.isRequired,
  yScaleValueFunction: PropTypes.func.isRequired
});

_defineProperty(LineGroup, "defaultProps", {
  dashLine: false,
  shouldAnimate: true,
  strokeWidth: 2,
  translation: 'translate(0,0)'
});

module.exports = (0, _Theme.withTheme)(LineGroup);