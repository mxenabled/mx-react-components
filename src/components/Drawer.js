const React = require('react');
const Velocity = require('velocity-animate');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const Drawer = React.createClass({
  propTypes: {
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    navConfig: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      onNextClick: React.PropTypes.func.isRequired,
      onPreviousClick: React.PropTypes.func.isRequired
    }),
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      duration: 500,
      easing: [0.28, 0.14, 0.34, 1.04]
    };
  },

  componentDidMount () {
    this._animateComponent({ right: 0 });
    this._animateBackArrow({ left: 25 });
    if (this.props.navConfig) {
      this._animateNav({ top: 12 });
    }
  },

  componentWillUnmount () {
    console.log('component unmounting');
  },

  _renderNav () {
    const styles = this.styles();

    return this.props.navConfig ?
      <nav ref={(ref) => (this._nav = ref)} style={styles.nav}>
        <Icon onClick={this.props.navConfig.onPreviousClick} size={25} style={styles.icons} type='caret-left'/>
        {this.props.navConfig.label}
        <Icon onClick={this.props.navConfig.onNextClick} size={25} style={styles.icons} type='caret-right'/>
      </nav> : null;
  },

  _handleCloseClick () {
  },

  _animateComponent (transition) {
    const el = this._component;
//    const transition = { right: 0 };
    const options = {
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _animateBackArrow (transition) {
    const el = this._backArrow;
//    const transition = { left: 25 };
    const options = {
      delay: this.props.duration,
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _animateNav (transition) {
    const el = this._nav;
//    const transition = { top: 12 };
    const options = {
      delay: this.props.duration,
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  render () {
    const styles = this.styles();

    return (
      <div ref={(ref) => (this._component = ref)} style={styles.component}>
        <header style={styles.header}>
          <span ref={(ref) => (this._backArrow = ref)} style={styles.backArrow}>
            <Icon onClick={this._handleCloseClick} size={25} style={styles.icons}type='arrow-left'/>
          </span>
          {this._renderNav()}
        </header>
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
      icons: {
        color: StyleConstants.Colors.ASH
      },
      backArrow: {
        position: 'absolute',
        left: -25,
        top: 12
      },
      header: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        height: 15,
        padding: '15px 25px'
      },
      nav: {
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
