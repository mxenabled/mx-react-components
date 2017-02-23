'use strict';

var React = require('react');
var _throttle = require('lodash/throttle');

var NotifyOnScrollThreshold = React.createClass({
  displayName: 'NotifyOnScrollThreshold',

  propTypes: {
    children: React.PropTypes.func.isRequired,
    onThresholdMet: React.PropTypes.func,
    threshold: React.PropTypes.number // Number between 0 and 1 representing 0 to 100%
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onThresholdMet: function onThresholdMet() {},
      threshold: 0.9
    };
  },
  getInitialState: function getInitialState() {
    return {
      scrollHeight: 0,
      scrollPosition: 0,
      thresholdMet: false
    };
  },
  componentDidMount: function componentDidMount() {
    this._handleScroll = _throttle(this._handleScroll, 200);

    this.container.parentElement.addEventListener('scroll', this._handleScroll);

    if (this.container.parentElement.scrollHeight <= this.container.parentElement.clientHeight) {
      this.setState({
        scrollHeight: this.container.parentElement.scrollHeight,
        thresholdMet: true
      });
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.container.parentElement.removeEventListener('scroll', this._handleScroll);
  },
  _handleScroll: function _handleScroll(evt) {
    var element = evt.target;
    var heightDifference = element.scrollHeight - element.clientHeight;
    var position = element.scrollTop / heightDifference;
    var scrollHeightIsLessThanElementHeight = element.scrollHeight <= element.clientHeight;
    var thresholdMet = position >= this.props.threshold || scrollHeightIsLessThanElementHeight;

    if (this.state.thresholdMet !== thresholdMet) {
      this.setState({
        scrollHeight: element.scrollHeight,
        scrollPosition: element.scrollTop,
        thresholdMet: thresholdMet
      }, this.props.onThresholdMet);
    }
  },
  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { ref: function ref(_ref) {
          return _this.container = _ref;
        } },
      this.props.children(this.state.thresholdMet, this.state.scrollPosition, this.state.scrollHeight)
    );
  }
});

module.exports = NotifyOnScrollThreshold;