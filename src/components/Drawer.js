const React = require('react');
const Velocity = require('velocity-animate');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const Drawer = React.createClass({
  propTypes: {
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      duration: 500,
      isOpen: false,
      easing: [0.28, 0.14, 0.34, 1.04]
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
      complete: this._slideArrow.bind(this, isOpen),
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _slideArrow (isOpen) {
    const el = this.refs.arrow;
    const transition = isOpen ? { left: -25 } : { left: 25 };
    const options = {
      duration: 200,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  render () {
    return (
      <div ref='component' style={styles.component}>
        <nav style={styles.nav}>
          <span ref='arrow' style={styles.iconContainer}><Icon onClick={this.props.onClose} size={25} style={styles.icon}type='arrow-left'/></span>
        </nav>
        <header></header>
        <div></div>
      </div>
    );
  }

});

const styles = {
  component: {
    top: 0,
    bottom: 0,
    right: -800,
    position: 'absolute',
    width: 800,
    overflow: 'hidden'
  },
  icon: {
    color: StyleConstants.Colors.ASH
  },
  iconContainer: {
    position: 'absolute',
    left: -25,
    top: 12
  },
  nav: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    borderBottom: 'solid 1px ' + StyleConstants.Colors.ASH,
    height: 15,
    padding: '15px 25px'
  }
};

module.exports = Drawer;

