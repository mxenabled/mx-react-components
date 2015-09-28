'use strict';

var React = require('react');

var Spin = React.createClass({
  displayName: 'Spin',

  propTypes: {
    children: React.PropTypes.node,
    direction: React.PropTypes.oneOf(['counterclockwise', 'clockwise']),
    speed: React.PropTypes.number //milliseconds, time it takes to make 1 full rotation
  },

  getDefaultProps: function getDefaultProps() {
    return {
      direction: 'clockwise',
      speed: 1000
    };
  },

  componentDidMount: function componentDidMount() {
    var el = React.findDOMNode(this);
    var speed = this.props.speed;
    var spinDirection = this.props.direction === 'clockwise' ? -1 : 1;
    var rotation = 0;

    setInterval(function () {
      el.style.transform = 'rotate(' + rotation * spinDirection + 'deg)';

      if (rotation < 360) {
        rotation += 1;
      } else {
        rotation = 0;
      }
    }, speed / 360);
  },

  render: function render() {
    return React.createElement(
      'div',
      { style: { display: 'inline-block' } },
      this.props.children
    );
  }
});

module.exports = Spin;