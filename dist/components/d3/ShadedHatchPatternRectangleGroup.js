"use strict";

var _Theme = require("../Theme");

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

var _require = require('../../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../../utils/Style');

var ShadedHatchPatternRectangleGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ShadedHatchPatternRectangleGroup, _React$Component);

  function ShadedHatchPatternRectangleGroup() {
    _classCallCheck(this, ShadedHatchPatternRectangleGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShadedHatchPatternRectangleGroup).apply(this, arguments));
  }

  _createClass(ShadedHatchPatternRectangleGroup, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var fillColor = this.props.fillColor || theme.Colors.GRAY_300;
      return React.createElement("g", {
        className: "shaded-hatch-pattern"
      }, React.createElement("pattern", {
        height: 4,
        id: "diagonalHatch",
        patternUnits: "userSpaceOnUse",
        width: 4
      }, React.createElement("path", {
        d: "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",
        stroke: fillColor,
        strokeWidth: 1
      })), React.createElement("rect", {
        fill: 'url(#diagonalHatch)',
        height: this.props.height,
        transform: this.props.translation,
        width: this.props.width,
        x: this.props.x,
        y: this.props.y
      }));
    }
  }]);

  return ShadedHatchPatternRectangleGroup;
}(React.Component);

_defineProperty(ShadedHatchPatternRectangleGroup, "propTypes", {
  fillColor: PropTypes.string,
  height: PropTypes.number.isRequired,
  theme: themeShape,
  translation: PropTypes.string,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
});

_defineProperty(ShadedHatchPatternRectangleGroup, "defaultProps", {
  translation: 'translate(0,0)'
});

module.exports = (0, _Theme.withTheme)(ShadedHatchPatternRectangleGroup);