const React = require('react');
const Velocity = require('velocity-animate');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const Drawer = React.createClass({
  propTypes: {
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    isOpen: React.PropTypes.bool,
    navContent: React.PropTypes.shape({
      duration: React.PropTypes.number,
      label: React.PropTypes.string.isRequired,
      onNextClick: React.PropTypes.func.isRequired,
      onPreviousClick: React.PropTypes.func.isRequired
    }),
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

  _renderNavContent () {
    const styles = this.styles();

    return this.props.navContent ?
      <div ref={(ref) => (this._navContent = ref)} style={styles.navContent}>
        <Icon onClick={this.props.navContent.onPreviousClick} size={25} style={styles.icon} type='caret-left'/>
        {this.props.navContent.label}
        <Icon onClick={this.props.navContent.onNextClick} size={25} style={styles.icon} type='caret-right'/>
      </div> : null;
  },

  _renderTransition (isOpen) {
    const el = this._component;
    const transition = isOpen ? { right: -800 } : { right: 0 };
    const options = {
      complete: this._doNavAnimation.bind(this, isOpen),
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _doNavAnimation (isOpen) {
    this._slideArrow(isOpen);
    this._slideNavContent(isOpen);
  },

  _slideArrow (isOpen) {
    const el = this._arrow;
    const transition = isOpen ? { left: -25 } : { left: 25 };
    const options = {
      duration: this.props.navContent.duration | this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _slideNavContent (isOpen) {
    const el = this._navContent;
    const transition = isOpen ? { top: -25 } : { top: 12 };
    const options = {
      duration: this.props.navContent.duration | this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  render () {
    const styles = this.styles();

    return (
      <div ref={(ref) => (this._component = ref)} style={styles.component}>
        <nav style={styles.nav}>
          <span ref={(ref) => (this._arrow = ref)} style={styles.iconContainer}>
            <Icon onClick={this.props.onClose} size={25} style={styles.icon}type='arrow-left'/>
          </span>
          {this._renderNavContent()}
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        top: 0,
        bottom: 0,
        right: -800,
        position: 'absolute',
        width: 800,
        overflow: 'hidden',
        backgroundColor: StyleConstants.Colors.PORCELAIN
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
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        height: 15,
        padding: '15px 25px'
      },
      navContent: {
        fontFamily: StyleConstants.Fonts.THIN,
        color: StyleConstants.Colors.ASH,
        position: 'absolute',
        right: 25,
        top: -25
      }
    };
  }

});

module.exports = Drawer;
