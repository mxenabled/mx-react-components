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

var defaultShape = {
  large: PropTypes.number,
  medium: PropTypes.number,
  small: PropTypes.number
};

var Column =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Column, _React$Component);

  function Column() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Column);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Column)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getColumnWidths", function () {
      var colWidths = [];
      var _this$props$span = _this.props.span,
          large = _this$props$span.large,
          medium = _this$props$span.medium,
          small = _this$props$span.small; // Column widths

      if (small === 0) {
        colWidths.push('hidden-sm');
      } else if (small) {
        colWidths.push('col-sm-' + small);
      }

      if (medium === 0) {
        colWidths.push('hidden-md');
      } else if (medium && medium !== small) {
        colWidths.push('col-md-' + medium);
      }

      if (large === 0) {
        colWidths.push('hidden-lg');
      } else if (large && large !== medium) {
        colWidths.push('col-lg-' + large);
      }

      return colWidths;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getColumnOffsets", function () {
      var offsets = [];
      var small = _this.props.offset.small;
      var medium = _this.props.offset.medium;
      var large = _this.props.offset.large; // Column offsets

      if (small >= 0) {
        offsets.push('col-sm-offset-' + small);
      }

      if (medium >= 0 && medium !== small) {
        offsets.push('col-md-offset-' + medium);
      }

      if (large >= 0 && large !== medium) {
        offsets.push('col-lg-offset-' + large);
      }

      return offsets;
    });

    return _this;
  }

  _createClass(Column, [{
    key: "render",
    value: function render() {
      var className = []; // Column widths

      className = className.concat(this.getColumnWidths()); // Column offsets

      className = className.concat(this.getColumnOffsets());
      return React.createElement("div", {
        className: className.join(' '),
        style: {
          boxSizing: 'border-box',
          position: this.props.relative ? 'relative' : 'static'
        }
      }, this.props.children);
    }
  }]);

  return Column;
}(React.Component);

_defineProperty(Column, "propTypes", {
  offset: PropTypes.shape(defaultShape),
  relative: PropTypes.bool,
  span: PropTypes.shape(defaultShape)
});

_defineProperty(Column, "defaultProps", {
  offset: {},
  relative: true,
  span: {
    large: 12
  }
});

module.exports = Column;