const React = require('react');

const Spin = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    direction: React.PropTypes.oneOf(['counterclockwise', 'clockwise']),
    speed: React.PropTypes.number //milliseconds, time it takes to make 1 full rotation
  },

  getDefaultProps () {
    return {
      direction: 'clockwise',
      speed: 1000
    };
  },

  componentDidMount () {
    const el = React.findDOMNode(this);
    const speed = this.props.speed;
    const spinDirection = this.props.direction === 'clockwise' ? -1: 1;
    let rotation = 0;

    setInterval(() => {
      el.style.transform = 'rotate(' + rotation * spinDirection + 'deg)';

      if (rotation < 360) {
        rotation += 1;
      } else {
        rotation = 0;
      }
    }, speed / 360);
  },

  render () {
    return (
      <div style={{ display: 'inline-block' }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Spin;