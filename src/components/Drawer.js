const _isNumber = require('lodash/isNumber');
const { StyleSheet, css } = require('aphrodite/no-important');
const React = require('react');
const Velocity = require('velocity-animate');
const _throttle = require('lodash/throttle');

const Button = require('../components/Button');

const StyleConstants = require('../constants/Style');

const Drawer = React.createClass({
  propTypes: {
    animateLeftDistance: React.PropTypes.number,
    breakPoints: React.PropTypes.shape({
      large: React.PropTypes.number,
      medium: React.PropTypes.number,
      small: React.PropTypes.number
    }),
    buttonPrimaryColor: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    headerStyle: React.PropTypes.object,
    maxWidth: React.PropTypes.number,
    navConfig: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      onNextClick: React.PropTypes.func.isRequired,
      onPreviousClick: React.PropTypes.func.isRequired
    }),
    onClose: React.PropTypes.func.isRequired,
    showScrim: React.PropTypes.bool,
    title: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      buttonPrimaryColor: StyleConstants.Colors.PRIMARY,
      breakPoints: StyleConstants.BreakPoints,
      duration: 500,
      easing: [0.28, 0.14, 0.34, 1.04],
      maxWidth: 960,
      showScrim: true,
      title: ''
    };
  },

  componentWillMount () {
    this._resizeThrottled = _throttle(this._resize, 100);
  },

  componentDidMount () {
    // Aphrodite Buffers injecting styles so on componentDidMount
    // styles may not be ready.  setTimeout is their suggested
    // solution. https://github.com/Khan/aphrodite#style-injection-and-buffering
    setTimeout(() => {
      this._animateComponent({ left: this._getAnimationDistance() });
    }, 0);

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

    return this.props.navConfig ? (
      <nav className={css(styles.nav)}>
        <Button
          icon='caret-left'
          onClick={this.props.navConfig.onPreviousClick}
          primaryColor={this.props.buttonPrimaryColor}
          type='base'
        />
        <span className={css(styles.navLabel)}>
          {this.props.navConfig.label}
        </span>
        <Button
          icon='caret-right'
          onClick={this.props.navConfig.onNextClick}
          primaryColor={this.props.buttonPrimaryColor}
          type='base'
        />
      </nav>
    ) : <div className={css(styles.nav)} />;
  },

  render () {
    const styles = this.styles();

    return (
      <div className={css(styles.componentWrapper)}>
        <div className={css(styles.scrim)} onClick={this.close} />
        <div className={css(styles.component)} ref={(ref) => (this._component = ref)}>
          <header className={css(styles.header)}>
            <span className={css(styles.backArrow)}>
              <Button
                icon='arrow-left'
                onClick={this.close}
                primaryColor={this.props.buttonPrimaryColor}
                type={'base'}
              />
            </span>
            <span className={css(styles.title)}>
              {this.props.title}
            </span>
            {this._renderNav()}
          </header>
          <div className={css(styles.content)}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  styles () {
    return StyleSheet.create({
      component: Object.assign({}, {
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
      }, this.props.style),
      componentWrapper: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 999
      },
      content: Object.assign({}, {
        backgroundColor: StyleConstants.Colors.WHITE,
        height: '100%'
      }, this.props.contentStyle),
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
      header: Object.assign({}, {
        alignItems: 'center',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.LARGE,
        justifyContent: 'center',
        padding: '7px 7px',
        position: 'relative'
      }, this.props.headerStyle),
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
        position: 'relative',
        bottom: 5,

        '@media (max-width: 750px)': {
          display: 'none',
          padding: 0
        }
      }
    });
  }
});

module.exports = Drawer;