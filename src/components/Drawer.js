const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _isNumber = require('lodash/isNumber');
const _merge = require('lodash/merge');
const _throttle = require('lodash/throttle');
const FocusTrap = require('focus-trap-react');
const keycode = require('keycode');
const PropTypes = require('prop-types');
const React = require('react');
const Velocity = require('velocity-animate');
const { StyleRoot } = require('radium');

const Button = require('../components/Button');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class Drawer extends React.Component {
  static propTypes = {
    animateLeftDistance: PropTypes.number,
    beforeClose: PropTypes.func,
    breakPoints: PropTypes.shape({
      large: PropTypes.number,
      medium: PropTypes.number
    }),
    buttonPrimaryColor: PropTypes.string,
    closeOnScrimClick: PropTypes.bool,
    contentStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    duration: PropTypes.number,
    easing: PropTypes.array,
    focusOnLoad: PropTypes.bool,
    headerMenu: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    headerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    maxWidth: PropTypes.number,
    navConfig: PropTypes.shape({
      label: PropTypes.string.isRequired,
      onNextClick: PropTypes.func.isRequired,
      onPreviousClick: PropTypes.func.isRequired
    }),
    onClose: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func,
    onOpen: PropTypes.func,
    showCloseButton: PropTypes.bool,
    showScrim: PropTypes.bool,
    styles: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string
  };

  static defaultProps = {
    beforeClose: () => {},
    closeOnScrimClick: true,
    duration: 500,
    easing: [0.28, 0.14, 0.34, 1.04],
    focusOnLoad: true,
    maxWidth: 960,
    onOpen: () => {},
    showCloseButton: true,
    showScrim: true,
    title: ''
  };

  constructor (props) {
    super(props);

    const theme = StyleUtils.mergeTheme(props.theme, props.buttonPrimaryColor);
    const breakPoints = props.breakPoints || theme.BreakPoints;

    this.state = { breakPoints, theme };
  }

  componentWillMount () {
    this._resizeThrottled = _throttle(this._resize, 100);
  }

  componentDidMount () {
    deprecatePrimaryColor(this.props, 'buttonPrimaryColor');
    this.open();
    window.addEventListener('resize', this._resizeThrottled);

    if (this.props.focusOnLoad) {
      this._component.focus();
    }
  }

  componentWillReceiveProps (newProps) {
    if (!_isEqual(newProps.breakPoints, this.props.breakPoints)) {
      this.setState({
        breakPoints: this.props.breakPoints
      });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._resizeThrottled);
  }

  _getAnimationDistance = () => {
    if (_isNumber(this.props.animateLeftDistance)) {
      return this.props.animateLeftDistance + '%';
    }

    const windowWidth = window.innerWidth;

    if (windowWidth >= this.state.breakPoints.large) {
      //Resolution - maxWidth
      return windowWidth - this.props.maxWidth;
    } else if (windowWidth <= this.state.breakPoints.medium) {
      //All the way over to the left
      return 0;
    } else {
      //20% from the left
      const newLeft = windowWidth * 0.2;

      return Math.max(newLeft, windowWidth - this.props.maxWidth);
    }
  };

  _getExposedDrawerFunctions = () => {
    return { close: this.close };
  };

  /**
   * Figure out the height of the header. This can come from either:
   *
   * this.props.headerStyle.height
   * this.props.header.height
   *
   * If neither are set, default to 50px
   */
  _getHeaderHeight = () => {
    return _get(this.props, ['headerStyle', 'height'],
                _get(this.props,
                     ['styles', 'header', 'height'],
                     '50px'));
  };

  /**
   * Animate the Drawer closed and then call the onClose callback.
   *
   * @returns {Promise} that is resolved when the animation finishes
   */
  close = () => {
    this.props.beforeClose();
    return this._animateComponent({ left: '100%' })
      .then(() => {
        this.props.onClose();
      });
  };

  open = () => {
    return this._animateComponent({ left: this._getAnimationDistance() })
      .then(() => {
        this.props.onOpen();
      });
  };

  _animateComponent = (transition, extraOptions) => {
    const el = this._component;
    const options = Object.assign({
      duration: this.props.duration,
      easing: this.props.easing
    }, extraOptions);

    return Velocity(el, transition, options);
  };

  _handleKeyUp = e => {
    e.preventDefault();
    e.stopPropagation();

    if (keycode(e) === 'esc') this.close();
  };

  _resize = () => {
    this._animateComponent({ left: this._getAnimationDistance() }, { duration: 0 });
  };

  _renderNav = (navConfig, styles, theme) => {
    return (
      <nav style={styles.nav}>
        <Button
          icon='caret-left'
          onClick={navConfig.onPreviousClick}
          theme={theme}
          type='base'
        />
        <span style={styles.navLabel}>
          {navConfig.label}
        </span>
        <Button
          icon='caret-right'
          onClick={navConfig.onNextClick}
          theme={theme}
          type='base'
        />
      </nav>
    );
  };

  render () {
    const { theme } = this.state;
    const styles = this.styles(theme);
    const { headerMenu, navConfig } = this.props;
    let menu = null;

    // If headerMenu is a function then we want to pass the Drawer's
    // exposed functions to the call.
    if (typeof headerMenu === 'function') {
      menu = headerMenu(this._getExposedDrawerFunctions());
    // If headerMenu is a normal node/element then use directly.
    } else if (headerMenu) {
      menu = headerMenu;
    // If no headerMenu and navConfig passed then use Drawer's
    // _renderNav function to generate the menu.
    } else if (navConfig) {
      menu = this._renderNav(navConfig, styles, theme);
    }

    return (
      <StyleRoot>
        <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
          <div onKeyUp={typeof this.props.onKeyUp === 'function' ? this.props.onKeyUp : this._handleKeyUp} style={styles.componentWrapper}>
            <div
              onClick={() => {
                if (this.props.closeOnScrimClick) this.close();
              }}
              style={styles.scrim}
            />
            <div
              aria-label={this.props.title}
              ref={(ref) => (this._component = ref)}
              role='dialog'
              style={Object.assign({}, styles.component, this.props.style)}
              tabIndex={0}
            >
              <header style={Object.assign({}, styles.header, this.props.headerStyle)}>
                <span style={styles.backArrow}>
                  {this.props.showCloseButton &&
                    <Button
                      aria-label={`Close ${this.props.title} Drawer`}
                      icon='go-back'
                      onClick={this.close}
                      theme={theme}
                      type={'base'}
                    />
                  }
                </span>
                <h1 style={styles.title}>
                  {this.props.title}
                </h1>
                <div style={styles.headerMenu}>
                  {menu}
                </div>
              </header>
              <div style={Object.assign({}, styles.content, this.props.contentStyle)}>
                {typeof this.props.children === 'function' ? this.props.children(this._getExposedDrawerFunctions()) : this.props.children}
              </div>
            </div>
          </div>
        </FocusTrap>
      </ StyleRoot>
    );
  }

  styles = (theme) => {
    const HEADER_HEIGHT = this._getHeaderHeight();

    return _merge({}, {
      component: {
        border: '1px solid ' + theme.Colors.GRAY_300,
        boxSizing: 'border-box',
        zIndex: 1001,
        top: 0,
        bottom: 0,
        left: '100%',
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.Colors.GRAY_100,
        boxShadow: theme.ShadowHigh,

        [`@media (max-width: ${this.state.breakPoints.medium}px)`]: {
          width: '100%'
        },
        [`@media (min-width: ${this.state.breakPoints.large}px)`]: {
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
        backgroundColor: theme.Colors.WHITE,
        overflow: 'auto',
        height: `calc(100% - ${HEADER_HEIGHT})`
      },
      scrim: {
        zIndex: 1000,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: 'center',
        backgroundColor: this.props.showScrim ? theme.Colors.SCRIM : 'transparent'
      },
      icons: {
        color: theme.Colors.GRAY_500
      },
      backArrow: {
        textAlign: 'left',
        width: '25%'
      },
      header: {
        alignItems: 'center',
        backgroundColor: theme.Colors.WHITE,
        borderBottom: 'solid 1px ' + theme.Colors.GRAY_300,
        color: theme.Colors.GRAY_500,
        display: 'flex',
        fontFamily: theme.Fonts.REGULAR,
        fontSize: theme.FontSizes.LARGE,
        justifyContent: 'center',
        padding: '0 20px',
        position: 'relative',
        height: HEADER_HEIGHT,
        boxSizing: 'border-box',
        [`@media (max-width: ${this.state.breakPoints.medium}px)`]: {
          padding: '0 10px'
        }
      },
      title: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 0 auto',
        fontSize: theme.FontSizes.LARGE,
        height: '100%',
        justifyContent: 'center',
        marginBottom: 0,
        overflow: 'hidden',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      headerMenu: {
        textAlign: 'right',
        whiteSpace: 'nowrap',
        width: '25%'
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
  };
}

module.exports = Drawer;
