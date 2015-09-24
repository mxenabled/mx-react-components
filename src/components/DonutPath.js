const React = require('react');
const d3 = require('d3');

const DonutPath = React.createClass({
  propTypes: {
    arc: React.PropTypes.func,
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    value: React.PropTypes.object
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
    const arc =  this.props.arc.startAngle(this.props.value.startAngle).endAngle(endAngle).padAngle(this.props.value.padAngle);

    return (
      <path d={arc()} fill={this.props.color} opacity={this.props.opacity} />
    );

  }
});

module.exports = DonutPath;