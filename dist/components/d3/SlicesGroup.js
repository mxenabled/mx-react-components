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

var SlicesGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SlicesGroup, _React$Component);

  function SlicesGroup() {
    _classCallCheck(this, SlicesGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlicesGroup).apply(this, arguments));
  }

  _createClass(SlicesGroup, [{
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement("g", {
        className: "slices"
      }, this.props.data.map(function (dataPoint, index) {
        return React.createElement("rect", {
          height: _this.props.adjustedHeight,
          key: 'slice-' + index,
          onMouseOver: _this.props.handleChartMouseOver.bind(null, dataPoint),
          opacity: 0,
          transform: _this.props.translation,
          width: _this.props.sliceWidth,
          x: _this.props.xScaleValueFunction(dataPoint.x) - _this.props.sliceWidth / 2,
          y: 0
        });
      }));
    }
  }]);

  return SlicesGroup;
}(React.Component);

_defineProperty(SlicesGroup, "propTypes", {
  adjustedHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  handleChartMouseOver: PropTypes.func.isRequired,
  sliceWidth: PropTypes.number.isRequired,
  translation: PropTypes.string.isRequired,
  xScaleValueFunction: PropTypes.func.isRequired
});

module.exports = SlicesGroup;