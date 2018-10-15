"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropTypes = require('prop-types');

var React = require('react');

var BreakPointGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BreakPointGroup, _React$Component);

  function BreakPointGroup() {
    _classCallCheck(this, BreakPointGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreakPointGroup).apply(this, arguments));
  }

  _createClass(BreakPointGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          adjustedHeight = _this$props.adjustedHeight,
          adjustedWidth = _this$props.adjustedWidth,
          breakPointDate = _this$props.breakPointDate,
          breakPointLabel = _this$props.breakPointLabel,
          margin = _this$props.margin,
          translation = _this$props.translation,
          xScaleValueFunction = _this$props.xScaleValueFunction;
      var breakPointXValue = xScaleValueFunction(breakPointDate);
      var breakPointLabelOffSet = 10;
      var breakPointLabelYPosition = 40;
      return React.createElement("g", {
        className: "break-point-items",
        transform: translation
      }, React.createElement("line", {
        className: "break-point-line",
        x1: breakPointXValue,
        x2: breakPointXValue,
        y1: margin.top,
        y2: adjustedHeight + margin.bottom
      }), adjustedWidth - breakPointXValue - breakPointLabelOffSet > 100 ? React.createElement("text", {
        className: "break-point-label",
        x: breakPointXValue + breakPointLabelOffSet,
        y: breakPointLabelYPosition
      }, breakPointLabel) : null);
    }
  }]);

  return BreakPointGroup;
}(React.Component);

_defineProperty(BreakPointGroup, "propTypes", {
  adjustedHeight: PropTypes.number.isRequired,
  adjustedWidth: PropTypes.number.isRequired,
  breakPointDate: PropTypes.number.isRequired,
  breakPointLabel: PropTypes.string.isRequired,
  margin: PropTypes.object.isRequired,
  translation: PropTypes.string,
  xScaleValueFunction: PropTypes.func.isRequired
});

_defineProperty(BreakPointGroup, "defaultProps", {
  translation: 'translate(0,0)'
});

module.exports = BreakPointGroup;