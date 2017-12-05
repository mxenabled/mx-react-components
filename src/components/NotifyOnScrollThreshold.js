const PropTypes = require("prop-types");
const React = require("react");
const _throttle = require("lodash/throttle");

class NotifyOnScrollThreshold extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onThresholdMet: PropTypes.func,
    threshold: PropTypes.number // Number between 0 and 1 representing 0 to 100%
  };

  static defaultProps = {
    onThresholdMet: () => {},
    threshold: 0.9
  };

  state = {
    scrollHeight: 0,
    scrollPosition: 0,
    thresholdMet: false
  };

  componentDidMount() {
    this._handleScroll = _throttle(this._handleScroll, 200);

    this.container.parentElement.addEventListener("scroll", this._handleScroll);

    if (
      this.container.parentElement.scrollHeight <=
      this.container.parentElement.clientHeight
    ) {
      this.setState({
        scrollHeight: this.container.parentElement.scrollHeight,
        thresholdMet: true
      });
    }
  }

  componentWillUnmount() {
    this.container.parentElement.removeEventListener(
      "scroll",
      this._handleScroll
    );
  }

  _handleScroll = evt => {
    const element = evt.target;
    const heightDifference = element.scrollHeight - element.clientHeight;
    const position = element.scrollTop / heightDifference;
    const scrollHeightIsLessThanElementHeight =
      element.scrollHeight <= element.clientHeight;
    const thresholdMet =
      position >= this.props.threshold || scrollHeightIsLessThanElementHeight;

    if (this.state.thresholdMet !== thresholdMet) {
      this.setState(
        {
          scrollHeight: element.scrollHeight,
          scrollPosition: element.scrollTop,
          thresholdMet
        },
        this.props.onThresholdMet
      );
    }
  };

  render() {
    return (
      <div ref={ref => (this.container = ref)}>
        {this.props.children(
          this.state.thresholdMet,
          this.state.scrollPosition,
          this.state.scrollHeight
        )}
      </div>
    );
  }
}

module.exports = NotifyOnScrollThreshold;
