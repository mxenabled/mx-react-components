const _isNumber = require('lodash/isNumber');
const { StyleRoot } = require('radium');
const React = require('react');
const Velocity = require('velocity-animate');
const _throttle = require('lodash/throttle');
const _merge = require('lodash/merge');

const Button = require('../components/Button');

const StyleConstants = require('../constants/Style');

const Drawer = React.createClass({
  propTypes: {
    animateLeftDistance: React.PropTypes.number,
    breakPoints: React.PropTypes.shape({
      large: React.PropTypes.number,
      medium: React.PropTypes.number
    }),
    buttonPrimaryColor: React.PropTypes.string,
    closeOnScrimClick: React.PropTypes.bool,
    contentStyle: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    headerMenu: React.PropTypes.func,
    headerStyle: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    maxWidth: React.PropTypes.number,
    navConfig: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      onNextClick: React.PropTypes.func.isRequired,
      onPreviousClick: React.PropTypes.func.isRequired
    }),
    onClose: React.PropTypes.func.isRequired,
    showCloseButton: React.PropTypes.bool,
    showScrim: React.PropTypes.bool,
    styles: React.PropTypes.object,
    title: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      buttonPrimaryColor: StyleConstants.Colors.PRIMARY,
      breakPoints: StyleConstants.BreakPoints,
      closeOnScrimClick: true,
      duration: 500,
      easing: [0.28, 0.14, 0.34, 1.04],
      maxWidth: 960,
      showCloseButton: true,
      showScrim: true,
      title: ''
    };
  },

  componentWillMount () {
    this._resizeThrottled = _throttle(this._resize, 100);
  },

  componentDidMount () {
    this._animateComponent({ left: this._getAnimationDistance() });
    window.addEventListener('resize', this._resizeThrottled);
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this._resizeThrottled);
  },

  _getAnimationDistance () {
    if (_isNumber(this.props.animateLeftDistance)) {
      return this.props.animateLeftDistance + '%';
    }

    const windowWidth = window.innerWidth;

    if (windowWidth >= this.props.breakPoints.large) {
      //Resolution - maxWidth
      return windowWidth - this.props.maxWidth;
    } else if (windowWidth <= this.props.breakPoints.medium) {
      //All the way over to the left
      return 0;
    } else {
      //20% from the left
      const newLeft = windowWidth * 0.2;

      return Math.max(newLeft, windowWidth - this.props.maxWidth);
    }
  },

  /**
   * Animate the Drawer closed and then call the onClose callback.
   *
   * @returns {Promise} that is resolved when the animation finishes
   */
  close () {
    return this._animateComponent({ left: '100%' })
      .then(() => {
        this.props.onClose();
      });
  },

  _animateComponent (transition, extraOptions) {
    const el = this._component;
    const options = Object.assign({
      duration: this.props.duration,
      easing: this.props.easing
    }, extraOptions);

    return Velocity(el, transition, options);
  },

  _resize () {
    this._animateComponent({ left: this._getAnimationDistance() }, { duration: 0 });
  },

  _renderNav () {
    const styles = this.styles();

    return (
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
    );
  },

  render () {
    const styles = this.styles();

    return (
      <StyleRoot>
        <div style={styles.componentWrapper}>
          <div onClick={this.props.closeOnScrimClick && this.close} style={styles.scrim} />
          <div ref={(ref) => (this._component = ref)} style={Object.assign({}, styles.component, this.props.style)}>
            <header style={Object.assign({}, styles.header, this.props.headerStyle)}>
              <span style={styles.backArrow}>
                {this.props.showCloseButton &&
                  <Button
                    icon='arrow-left'
                    onClick={this.close}
                    primaryColor={this.props.buttonPrimaryColor}
                    type={'base'}
                  />
                }
              </span>
              <span style={styles.title}>
                {this.props.title}
              </span>
              <div style={styles.headerMenu}>
                {this.props.navConfig ? this._renderNav : this.props.headerMenu}
              </div>
            </header>
            <div style={Object.assign({}, styles.content, this.props.contentStyle)}>
              {this.props.children}
            </div>
          </div>
        </div>
      </ StyleRoot>
    );
  },

  styles () {
    return _merge({}, {
      component: {
        border: '1px solid ' + StyleConstants.Colors.FOG,
        boxSizing: 'border-box',
        zIndex: 1001,
        top: 0,
        bottom: 0,
        left: '100%',
        position: 'absolute',
        width: '80%',
        overflow: 'hidden',
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        boxShadow: StyleConstants.ShadowHigh,

        [`@media (max-width: ${this.props.breakPoints.medium}px)`]: {
          width: '100%'
        },
        [`@media (min-width: ${this.props.breakPoints.large}px)`]: {
          width: this.props.maxWidth
        }
      },
      componentWrapper: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 999
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
        backgroundColor: this.props.showScrim ? StyleConstants.Colors.SCRIM : 'transparent'
      },
      icons: {
        color: StyleConstants.Colors.ASH
      },
      backArrow: {
        paddingLeft: 20,
        textAlign: 'left',
        width: '25%',

        [`@media (max-width: ${this.props.breakPoints.medium}px)`]: {
          paddingLeft: 10
        }
      },
      header: {
        alignItems: 'center',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.LARGE,
        justifyContent: 'center',
        padding: '7px 7px',
        position: 'relative',
        minHeight: StyleConstants.Spacing.XLARGE
      },
      title: {
        overflow: 'hidden',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        width: '50%',
        whiteSpace: 'nowrap'
      },
      headerMenu: {
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
        position: 'relative',
        bottom: 5,

        '@media (max-width: 750px)': {
          display: 'none',
          padding: 0
        }
      }
    }, this.props.styles);
  }
});

module.exports = Drawer;
