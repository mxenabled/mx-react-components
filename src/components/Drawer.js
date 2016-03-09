const React = require('react');
const Velocity = require('velocity-animate');

const Drawer = React.createClass({
  propTypes: {
    duration: React.PropTypes.number,
    isOpen: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      duration: 500,
      isOpen: false,
      easing: [.28, .14, .34, 1.04]
    };
  },

  componentDidMount () {
    this._renderTransition(this.props.isOpen);
  },

  componentWillReceiveProps (newProps) {
    if (newProps.isOpen !== this.props.isOpen) {
      this._renderTransition(newProps.isOpen);
    }
  },

  _renderTransition (isOpen) {
    const el = this.refs.component;
    const transition = isOpen ? { right: -800 } : { right: 0 };
    const options = {
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  render () {
    return (
      <div ref='component' style={styles}>
        HELLO DRAWER
      </div>
    );
  }

});

const styles = {
  top: 0,
  bottom: 0,
  right: -800,
  position: 'absolute',
  width: 800,
  backgroundColor: '#eaeaea'
};

module.exports = Drawer;

