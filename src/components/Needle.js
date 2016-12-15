
const React = require('react');

const ReactDOM = require('react-dom');

const _merge = require('lodash/merge');

const Needle = React.createClass({
  propTypes: {
    direction: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      direction: 'up'
    };
  },

  componentDidMount () {
    const el = ReactDOM.findDOMNode(this);

    let rotation = 25;

    const direction = this.props.direction;

      //sets the rotation
    switch (direction) {
      case 'up':
        rotation = 0;
        break;
      case 'right':
        rotation = 90;
        break;
      case 'down':
        rotation = 180;
        break;
      case 'left':
        rotation = 270;
        break;
    }

    let distance = 0;
    let up = true;
    let right = 'translateX(10px)';
    let left = 'translateX(-10px)';

    const rotationTransform = 'rotate(' + rotation + 'deg)';

    if (rotation === 90 || rotation === 270) {
      right = 'translateX(10px)';
      left = 'translateX(-10px)';
    }

    if (rotation === 0 || rotation === 180) {
      right = 'translateY(10px)';
      left = 'translateY(-10px)';
    }

    el.style.transform = rotationTransform;


    setInterval(() => {
      el.style.transitionTimingFunction = 'cubic-bezier(0.6, -0.5, 0.2, 1.5)';
      el.style.transition = '1100ms';

      if (distance === 20) {
        up = false;
        el.style.transform = right + ' ' + rotationTransform;
      }
      if (distance === 0) {
        up = true;
        el.style.transform = left + ' ' + rotationTransform;
      }

      if (up) {
        distance += 1;
      }
      if (!up) {
        distance -= 1;
      }
    }, 30);
  },

  render () {
    const styles = this.styles();

    return (
      <div className='mx-needle' style={Object.assign({}, styles.component)}></div>
    );
  },

  styles () {
    return _merge({}, {
      component: {
        position: 'relative',
        display: 'inline-block',
        backgroundImage: 'url("needle.svg")',
        height: '50px',
        src: 'needle.svg',
        width: '50px'
      }
    });
  }
});

module.exports = Needle;
