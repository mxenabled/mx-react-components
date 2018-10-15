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

var _throttle = require('lodash/throttle');

var NotifyOnScrollThreshold =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NotifyOnScrollThreshold, _React$Component);

  function NotifyOnScrollThreshold() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NotifyOnScrollThreshold);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NotifyOnScrollThreshold)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      scrollHeight: 0,
      scrollPosition: 0,
      thresholdMet: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleScroll", function (evt) {
      var element = evt.target;
      var heightDifference = element.scrollHeight - element.clientHeight;
      var position = element.scrollTop / heightDifference;
      var scrollHeightIsLessThanElementHeight = element.scrollHeight <= element.clientHeight;
      var thresholdMet = position >= _this.props.threshold || scrollHeightIsLessThanElementHeight;

      if (_this.state.thresholdMet !== thresholdMet) {
        _this.setState({
          scrollHeight: element.scrollHeight,
          scrollPosition: element.scrollTop,
          thresholdMet: thresholdMet
        }, _this.props.onThresholdMet);
      }
    });

    return _this;
  }

  _createClass(NotifyOnScrollThreshold, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._handleScroll = _throttle(this._handleScroll, 200);
      this.container.parentElement.addEventListener('scroll', this._handleScroll);

      if (this.container.parentElement.scrollHeight <= this.container.parentElement.clientHeight) {
        this.setState({
          scrollHeight: this.container.parentElement.scrollHeight,
          thresholdMet: true
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.container.parentElement.removeEventListener('scroll', this._handleScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: "mx-notify-scroll-threshold",
        ref: function ref(_ref) {
          return _this2.container = _ref;
        }
      }, this.props.children(this.state.thresholdMet, this.state.scrollPosition, this.state.scrollHeight));
    }
  }]);

  return NotifyOnScrollThreshold;
}(React.Component);

_defineProperty(NotifyOnScrollThreshold, "propTypes", {
  children: PropTypes.func.isRequired,
  onThresholdMet: PropTypes.func,
  threshold: PropTypes.number // Number between 0 and 1 representing 0 to 100%

});

_defineProperty(NotifyOnScrollThreshold, "defaultProps", {
  onThresholdMet: function onThresholdMet() {},
  threshold: 0.9
});

module.exports = NotifyOnScrollThreshold;