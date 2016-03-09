const React = require('react');
const Velocity = require('velocity-animate');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const Drawer = React.createClass({
  propTypes: {
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    isOpen: React.PropTypes.bool
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

  _handleArrowClick () {
    this._renderTransition(true);
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
      <div ref='component' style={styles.component}>
        <nav style={styles.nav}><Icon onClick={this._handleArrowClick} size={20} style={styles.icon} type='arrow-left'/></nav>
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
    backgroundColor: '#eaeaea'
  },
  icon: {
    color: StyleConstants.Colors.ASH,
    position: 'absolute',
    left: 25
  },
  nav: {
    padding: '15px 25px',
    borderBottom: 'solid 1px ' + StyleConstants.Colors.ASH,
    height: 15
  }
};

module.exports = Drawer;

