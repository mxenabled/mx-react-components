const React = require('react');
const _throttle = require('lodash/throttle');

const NotifyOnScrollThreshold = React.createClass({
  propTypes: {
    children: React.PropTypes.func,
    threshold: React.PropTypes.number
  getDefaultProps () {
    return {
      threshold: 0.9
    };
  },

  getInitialState () {
    return {
      scrollHeight: 0,
      scrollPosition: 0,
      thresholdMet: false
    };
  },

  componentDidMount () {
    this._handleScroll = _throttle(this._handleScroll, 200);

    this.container.parentElement.addEventListener('scroll', this._handleScroll);
  },

  componentWillUnmount () {
    this.container.parentElement.removeEventListener('scroll', this._handleScroll);
  },

  _handleScroll (evt) {
    const element = evt.target;
    const availableHeight = element.scrollHeight - element.clientHeight;
    const position = element.scrollTop / availableHeight;

    this.setState({ thresholdMet: position >= this.props.threshold });
        scrollHeight: element.scrollHeight,
        scrollPosition: element.scrollTop,
  },

  render () {
    return (
      <div ref={(ref) => this.container = ref}>
        {this.props.children(this.state.thresholdMet, this.state.scrollPosition, this.state.scrollHeight)}
      </div>
    );
  }
});

module.exports = NotifyOnScrollThreshold;