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
      isOpen: false
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
    const transition = isOpen ? { left: 0 } : { left: 400 };
    const options = {
      duration: this.props.duration
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
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  position: 'relative',
  width: 400,
  backgroundColor: '#eaeaea'
};

module.exports = Drawer;

