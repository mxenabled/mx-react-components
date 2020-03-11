const PropTypes = require('prop-types');
const React = require('react');

class Spin extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    direction: PropTypes.oneOf(['counterclockwise', 'clockwise']),
    speed: PropTypes.number //milliseconds, time it takes to make 1 full rotation
  };

  static defaultProps = {
    direction: 'clockwise',
    speed: 1000
  };

  constructor(props) {
    super(props);
    this.spinRef = React.createRef();
  }

  componentDidMount() {
    const el = this.spinRef.current
    const speed = this.props.speed;
    const spinDirection = this.props.direction === 'clockwise' ? 1 : -1;
    let rotation = 0;

    this.interval = setInterval(() => {
      el.style.transform = 'rotate(' + rotation * spinDirection + 'deg)';

      if (rotation < 360) {
        rotation += 1;
      } else {
        rotation = 0;
      }
    }, speed / 360);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className='mx-spin' ref={this.spinRef} style={{ display: 'inline-block' }}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Spin;
