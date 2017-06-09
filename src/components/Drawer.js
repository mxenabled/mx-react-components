const _isEqual = require('lodash/isEqual');
const _isNumber = require('lodash/isNumber');
const _merge = require('lodash/merge');
const _throttle = require('lodash/throttle');
const FocusTrap = require('focus-trap-react');
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
    headerMenu: PropTypes.element,
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
    showCloseButton: PropTypes.bool,
    showScrim: PropTypes.bool,
    styles: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string
  };

  static defaultProps = {
    closeOnScrimClick: true,
    duration: 500,
    easing: [0.28, 0.14, 0.34, 1.04],
    maxWidth: 960,
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
    this._animateComponent({ left: this._getAnimationDistance() });
    window.addEventListener('resize', this._resizeThrottled);
    this._component.focus();
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

  /**
   * Animate the Drawer closed and then call the onClose callback.
   *
   * @returns {Promise} that is resolved when the animation finishes
   */
  close = () => {
    return this._animateComponent({ left: '100%' })
      .then(() => {
        this.props.onClose();
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

  _resize = () => {
    this._animateComponent({ left: this._getAnimationDistance() }, { duration: 0 });
  };

  _renderNav = (styles, theme) => {
    return (
      <nav style={styles.nav}>
        <Button
          icon='caret-left'
          onClick={this.props.navConfig.onPreviousClick}
          theme={theme}
          type='base'
        />
        <span style={styles.navLabel}>
          {this.props.navConfig.label}
        </span>
        <Button
          icon='caret-right'
          onClick={this.props.navConfig.onNextClick}
          theme={theme}
          type='base'
        />
      </nav>
    );
  };

  render () {
    const { theme } = this.state;
    const styles = this.styles(theme);

    return (
      <StyleRoot>
        <FocusTrap>
          <div style={styles.componentWrapper}>
            <div onClick={this.props.closeOnScrimClick && this.close} style={styles.scrim} />
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
                      icon='arrow-left'
                      onClick={this.close}
                      theme={theme}
                      type={'base'}
                    >
                      <span className='visuallyHidden' style={styles.visuallyHidden}>Close Drawer</span>
                    </Button>
                  }
                </span>
                <span style={styles.title}>
                  {this.props.title}
                </span>
                <div style={styles.headerMenu}>
                  {this.props.headerMenu ? this.props.headerMenu : this.props.navConfig && this._renderNav(styles, theme)}
                </div>
              </header>
              <div style={Object.assign({}, styles.content, this.props.contentStyle)}>
                {this.props.children}
              </div>
            </div>
          </div>
        </FocusTrap>
      </ StyleRoot>
    );
  }

  styles = (theme) => {
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
        backgroundColor: this.props.showScrim ? theme.Colors.SCRIM : 'transparent'
      },
      icons: {
        color: theme.Colors.GRAY_500
      },
      backArrow: {
        paddingLeft: 20,
        textAlign: 'left',
        width: '25%',

        [`@media (max-width: ${this.state.breakPoints.medium}px)`]: {
          paddingLeft: 10
        }
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
        padding: '7px 7px',
        position: 'relative',
        minHeight: theme.Spacing.XLARGE
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
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        clipPath: 'insert(50%)',
        height: 1,
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: 1
      }
    }, this.props.styles);
  };
}

module.exports = Drawer;
