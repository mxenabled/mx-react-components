"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Radium = require('radium');

var React = require('react');

var Icon = require('../Icon');

var _require = require('../../constants/App'),
    themeShape = _require.themeShape;

var DefaultRanges =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DefaultRanges, _React$Component);

  function DefaultRanges() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DefaultRanges);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DefaultRanges)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      selectedOption: null
    });

    return _this;
  }

  _createClass(DefaultRanges, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          defaultRanges = _this$props.defaultRanges,
          handleDefaultRangeSelection = _this$props.handleDefaultRangeSelection,
          selectedStartDate = _this$props.selectedStartDate,
          selectedEndDate = _this$props.selectedEndDate,
          styles = _this$props.styles,
          theme = _this$props.theme;
      return React.createElement("div", {
        className: "mx-default-ranges",
        role: "",
        style: styles.rangeOptions
      }, defaultRanges.map(function (range, index) {
        var isSelectedRange = _this2.state.selectedOption === index && range.getStartDate() === selectedStartDate && range.getEndDate() === selectedEndDate;
        return React.createElement("button", {
          "aria-label": "".concat(range.displayValue, " range").concat(isSelectedRange ? ', Selected' : ''),
          className: "mx-default-ranges-range",
          key: range.displayValue + range.getStartDate(),
          onClick: function onClick() {
            handleDefaultRangeSelection(range);

            _this2.setState({
              selectedOption: index
            });
          },
          style: styles.rangeOption
        }, React.createElement("div", null, React.createElement(Icon, {
          size: 20,
          style: _extends({}, styles.rangeOptionIcon, {
            fill: isSelectedRange ? theme.Colors.PRIMARY : 'transparent'
          }),
          type: "check-solid"
        })), React.createElement("div", null, range.displayValue));
      }));
    }
  }]);

  return DefaultRanges;
}(React.Component);

DefaultRanges.propTypes = {
  defaultRanges: PropTypes.array,
  handleDefaultRangeSelection: PropTypes.func,
  primaryColor: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.shape({
    defaultRangesTitle: PropTypes.object,
    rangeOption: PropTypes.object,
    rangeOptions: PropTypes.object
  }),
  theme: themeShape
};
module.exports = Radium(DefaultRanges);