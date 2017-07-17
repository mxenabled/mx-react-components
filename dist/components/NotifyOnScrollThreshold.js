'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var _throttle = require('lodash/throttle');

var NotifyOnScrollThreshold = function (_React$Component) {
  _inherits(NotifyOnScrollThreshold, _React$Component);

  function NotifyOnScrollThreshold() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NotifyOnScrollThreshold);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NotifyOnScrollThreshold.__proto__ || Object.getPrototypeOf(NotifyOnScrollThreshold)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      scrollHeight: 0,
      scrollPosition: 0,
      thresholdMet: false
    }, _this._handleScroll = function (evt) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NotifyOnScrollThreshold, [{
    key: 'componentDidMount',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.container.parentElement.removeEventListener('scroll', this._handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { ref: function ref(_ref2) {
            return _this2.container = _ref2;
          } },
        this.props.children(this.state.thresholdMet, this.state.scrollPosition, this.state.scrollHeight)
      );
    }
  }]);

  return NotifyOnScrollThreshold;
}(React.Component);

NotifyOnScrollThreshold.propTypes = {
  children: PropTypes.func.isRequired,
  onThresholdMet: PropTypes.func,
  threshold: PropTypes.number // Number between 0 and 1 representing 0 to 100%
};
NotifyOnScrollThreshold.defaultProps = {
  onThresholdMet: function onThresholdMet() {},
  threshold: 0.9
};


module.exports = NotifyOnScrollThreshold;