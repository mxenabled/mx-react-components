const React = require('react');
const Radium = require('radium');

const DonutPath = React.createClass({
  propTypes: {
    animateOnLoad: React.PropTypes.bool.isRequired, // Show animation on load. Default: false (from DonutChart)
    arc: React.PropTypes.func.isRequired, // D3 arc method used to calculate path.
    color: React.PropTypes.string.isRequired, // Color for the path
    opacity: React.PropTypes.number.isRequired, // Opacity for the path. Default: 1 (from DonutChart)
    value: React.PropTypes.object.isRequired // Value for the segment.
  },

  getInitialState () {
    return {
      elapsedTime: 0,
      endAngle: 0
    };
  },

  componentDidMount () {
    if (this.props.animateOnLoad) {
      this.interval = setInterval(this._renderAnimation, 10);
    }
  },

  componentWillUnmount () {
    if (this.props.animateOnLoad) {
      clearInterval(this.interval);
    }
  },

  _renderAnimation () {
    let elapsedTime = this.state.elapsedTime;
    let endAngle = this.state.endAngle;

    endAngle += (elapsedTime / 5000);

    if (endAngle >= this.props.value.endAngle) {
      clearInterval(this.interval);

      this.setState({
        elapsedTime: 0,
        endAngle: this.props.value.endAngle
      });
    } else {
      elapsedTime++;

      this.setState({
        elapsedTime,
        endAngle
      });
    }
  },

  render () {
    const endAngle = this.props.animateOnLoad ? this.state.endAngle : this.props.value.endAngle;
    const arc = this.props.arc.startAngle(this.props.value.startAngle).endAngle(endAngle).padAngle(this.props.value.padAngle);

    return (
      <path d={arc()} fill={this.props.color} opacity={this.props.opacity} />
    );
  }
});

module.exports = Radium.Enhancer(DonutPath);