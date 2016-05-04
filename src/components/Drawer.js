const Radium = require('radium');
const React = require('react');
const Velocity = require('velocity-animate');

const Button = require('../components/Button');

const StyleConstants = require('../constants/Style');

const Drawer = React.createClass({
  propTypes: {
    buttonPrimaryColor: React.PropTypes.string,
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    navConfig: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      onNextClick: React.PropTypes.func.isRequired,
      onPreviousClick: React.PropTypes.func.isRequired
    }),
    onClose: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      buttonPrimaryColor: StyleConstants.Colors.PRIMARY,
      duration: 500,
      easing: [0.28, 0.14, 0.34, 1.04],
      title: ''
    };
  },

  componentDidMount () {
    this._animateComponent({ left: this._getAnimationDistance() });
  },

  _getAnimationDistance () {
    const greaterThan1200ComponentWidth = 960;
    const maxResolutionBreakPoint = 1200;
    const minResoultionBreakPoint = 750;
    const windowWidth = window.innerWidth;

    if (windowWidth >= maxResolutionBreakPoint) {
      //Resolution - 960 from the left
      return windowWidth - greaterThan1200ComponentWidth;
    } else if (windowWidth <= minResoultionBreakPoint) {
      //All the way over to the left
      return 0;
    } else {
      //20% from the left
      return '20%';
    }
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

  _renderNav () {
    const styles = this.styles();

    return this.props.navConfig ? (
      <nav style={styles.nav}>
        <Button
          icon='caret-left'
          onClick={this.props.navConfig.onPreviousClick}
          primaryColor={this.props.buttonPrimaryColor}
          type='base'
        />
        <span style={styles.navLabel}>
          {this.props.navConfig.label}
        </span>
        <Button
          icon='caret-right'
          onClick={this.props.navConfig.onNextClick}
          primaryColor={this.props.buttonPrimaryColor}
          type='base'
        />
      </nav>
    ) : <div style={styles.nav} />;
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.componentWrapper}>
        <div onClick={this._handleCloseClick} style={styles.scrim}></div>
        <div ref={(ref) => (this._component = ref)} style={styles.component}>
          <header style={styles.header}>
            <span style={styles.backArrow}>
              <Button
                icon='arrow-left'
                onClick={this._handleCloseClick}
                primaryColor={this.props.buttonPrimaryColor}
                type={'base'}
              />
            </span>
            <span style={styles.title}>
              {this.props.title}
            </span>
            {this._renderNav()}
          </header>
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        zIndex: 1001,
        top: 0,
        bottom: 0,
        left: '100%',
        position: 'absolute',
        width: '80%',
        overflow: 'hidden',
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        boxShadow: StyleConstants.ShadowHigh,

        '@media (max-width: 750px)': {
          width: '100%'
        },
        '@media (min-width: 1200px)': {
          width: 960
        }
      },
      componentWrapper: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
      },
      content: {
        backgroundColor: StyleConstants.Colors.WHITE,
        height: '100%'
      },
      scrim: {
        zIndex: 1000,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: 'center',
        backgroundColor: StyleConstants.Colors.SCRIM
      },
      icons: {
        color: StyleConstants.Colors.ASH
      },
      backArrow: {
        paddingLeft: 20,
        textAlign: 'left',
        width: '25%',

        '@media (max-width: 750px)': {
          paddingLeft: 10
        }
      },
      header: {
        alignItems: 'center',
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.NORMAL,
        fontSize: StyleConstants.FontSizes.LARGE,
        height: 45,
        justifyContent: 'center',
        padding: '7px 7px',
        position: 'relative'
      },
      title: {
        overflow: 'hidden',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        width: '50%',
        whiteSpace: 'nowrap'
      },
      nav: {
        paddingRight: 20,
        textAlign: 'right',
        width: '25%',
        whiteSpace: 'nowrap',

        '@media (max-width: 750px)': {
          paddingRight: 10
        }
      },
      navLabel: {
        padding: '7px 14px',

        '@media (max-width: 750px)': {
          display: 'none',
          padding: 0
        }
      }
    };
  }
});

module.exports = Radium(Drawer);