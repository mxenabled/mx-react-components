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
    this._animateComponent({ left: '20%' });
    this._animateBackArrow();
    if (this.props.navConfig) {
      this._animateNav();
    }
  },

  _renderNav () {
    const styles = this.styles();

    return this.props.navConfig ?
      <nav ref={(ref) => (this._nav = ref)} style={styles.nav}>
        <Icon
          onClick={this.props.navConfig.onPreviousClick}
          size={25}
          style={styles.icons}
          type='caret-left'
        />
        {this.props.navConfig.label}
        <Icon
          onClick={this.props.navConfig.onNextClick}
          size={25}
          style={styles.icons}
          type='caret-right'
        />
      </nav> : null;
  },

  _handleCloseClick () {
    this._animateComponent({ left: '100%' })
    .then(() => {
      this.props.onClose();
    });
  },

  _animateComponent (transition) {
    const el = this._component;
    const options = {
      duration: this.props.duration,
      easing: this.props.easing
    };

    return Velocity(el, transition, options);
  },

  _animateBackArrow () {
    const el = this._backArrow;
    const transition = { left: 25 };
    const options = {
      delay: this.props.duration,
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _animateNav () {
    const el = this._nav;
    const transition = { top: '50%' };
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
            <Icon
              onClick={this._handleCloseClick}
              size={25}
              style={styles.icons}
              type='arrow-left'
            />
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
        left: '100%',
        position: 'absolute',
        width: '80%',
        overflow: 'hidden',
        backgroundColor: StyleConstants.Colors.PORCELAIN
      },
      icons: {
        color: StyleConstants.Colors.ASH
      },
      backArrow: {
        position: 'absolute',
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)'
      },
      header: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        height: 15,
        padding: '15px 25px',
        position: 'relative'
      },
      nav: {
        fontFamily: StyleConstants.Fonts.THIN,
        color: StyleConstants.Colors.ASH,
        position: 'absolute',
        right: 25,
        top: '-100%',
        transform: 'translateY(-50%)'
      }
    };
  }

});

module.exports = Drawer;
