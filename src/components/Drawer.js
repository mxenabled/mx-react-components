const _get = require('lodash/get')
const _isEqual = require('lodash/isEqual')
const _isNumber = require('lodash/isNumber')
const _merge = require('lodash/merge')
const _throttle = require('lodash/throttle')
const _uniqueId = require('lodash/uniqueId')
const keycode = require('keycode')
const PropTypes = require('prop-types')
const React = require('react')
const Velocity = require('velocity-animate')
import { css } from 'glamor'

import { withTheme } from './Theme'
const Button = require('../components/Button')
const MXFocusTrap = require('../components/MXFocusTrap')

const { themeShape } = require('../constants/App')

const StyleUtils = require('../utils/Style')

class Drawer extends React.Component {
  static propTypes = {
    animateLeftDistance: PropTypes.number,
    animateOnClose: PropTypes.bool,
    'aria-describedby': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    beforeClose: PropTypes.func,
    breakPoints: PropTypes.shape({
      large: PropTypes.number,
      medium: PropTypes.number,
    }),
    closeButtonAriaLabel: PropTypes.string,
    closeOnScrimClick: PropTypes.bool,
    contentStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    duration: PropTypes.number,
    easing: PropTypes.array,
    focusOnLoad: PropTypes.bool,
    focusTrapProps: PropTypes.object,
    headerMenu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    headerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    maxWidth: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func,
    onOpen: PropTypes.func,
    portalTo: PropTypes.string,
    role: PropTypes.string,
    showCloseButton: PropTypes.bool,
    showScrim: PropTypes.bool,
    styles: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string,
  }

  static defaultProps = {
    animateOnClose: true,
    beforeClose: () => {},
    closeOnScrimClick: true,
    duration: 500,
    easing: [0.28, 0.14, 0.34, 1.04],
    focusOnLoad: true,
    focusTrapProps: {},
    maxWidth: 960,
    onOpen: () => {},
    role: 'dialog',
    showCloseButton: true,
    showScrim: true,
    title: '',
  }

  constructor(props) {
    super(props)

    const theme = StyleUtils.mergeTheme(props.theme)
    const breakPoints = props.breakPoints || theme.BreakPoints

    this.state = { breakPoints, theme }
  }

  UNSAFE_componentWillMount() {
    this._resizeThrottled = _throttle(this._resize, 100)
  }

  componentDidMount() {
    this.open()
    window.addEventListener('resize', this._resizeThrottled)

    if (this.props.focusOnLoad) {
      // Close button might not be present depending on showCloseButton Prop
      if (this.props.showCloseButton && this._closeButton) {
        this._closeButton.focus()
        // Fall back to focusing the component if no close button
      } else if (this._component) {
        this._component.focus()
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (!_isEqual(newProps.breakPoints, this.props.breakPoints)) {
      this.setState({
        breakPoints: this.props.breakPoints,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeThrottled)
  }

  _getAnimationDistance = () => {
    if (_isNumber(this.props.animateLeftDistance)) {
      return this.props.animateLeftDistance + '%'
    }

    const windowWidth = window.innerWidth

    if (windowWidth >= this.state.breakPoints.large) {
      //Resolution - maxWidth
      return windowWidth - this.props.maxWidth
    } else if (windowWidth <= this.state.breakPoints.medium) {
      //All the way over to the left
      return 0
    } else {
      //20% from the left
      const newLeft = windowWidth * 0.2

      return Math.max(newLeft, windowWidth - this.props.maxWidth)
    }
  }

  _getExposedDrawerFunctions = () => {
    return { close: this.close }
  }

  /**
   * Figure out the height of the header. This can come from either:
   *
   * this.props.headerStyle.height
   * this.props.header.height
   *
   * If neither are set, default to 50px
   */
  _getHeaderHeight = () => {
    return _get(
      this.props,
      ['headerStyle', 'height'],
      _get(this.props, ['styles', 'header', 'height'], '50px'),
    )
  }

  /**
   * Animate the Drawer closed and then call the onClose callback.
   *
   * @returns {Promise} that is resolved when the animation finishes
   */
  close = () => {
    this.props.beforeClose()

    if (this.props.animateOnClose) {
      return this._animateComponent({ left: '100%' }).then(() => {
        this.props.onClose()
      })
    } else {
      // To keep close's api normalized we return a promise just
      // as the _animateComponent function does above.
      return Promise.resolve().then(() => {
        this.props.onClose()
      })
    }
  }

  open = () => {
    return this._animateComponent({ left: this._getAnimationDistance() }).then(() => {
      this.props.onOpen()
    })
  }

  _animateComponent = (transition, extraOptions) => {
    const el = this._component
    const options = Object.assign(
      {
        duration: this.props.duration,
        easing: this.props.easing,
      },
      extraOptions,
    )

    return Velocity(el, transition, options)
  }

  _handleKeyUp = (e) => {
    if (keycode(e) === 'esc') {
      e.preventDefault()
      e.stopPropagation()
      this.close()
    }
  }

  _resize = () => {
    this._animateComponent({ left: this._getAnimationDistance() }, { duration: 0 })
  }

  render() {
    const { theme } = this.state
    const styles = this.styles(theme)
    const { closeButtonAriaLabel, headerMenu, focusTrapProps, portalTo } = this.props
    const mergedFocusTrapProps = {
      focusTrapOptions: {
        clickOutsideDeactivates: true,
        portalTo,
      },
      paused: false,
      ...focusTrapProps,
    }

    const menu =
      typeof headerMenu === 'function' ? headerMenu(this._getExposedDrawerFunctions()) : headerMenu

    const titleUniqueId = _uniqueId('mx-drawer-title-')

    return (
      <MXFocusTrap {...mergedFocusTrapProps}>
        <div
          className="mx-drawer"
          onKeyUp={
            typeof this.props.onKeyUp === 'function' ? this.props.onKeyUp : this._handleKeyUp
          }
          style={styles.componentWrapper}
        >
          <div
            className="mx-drawer-scrim"
            onClick={() => {
              if (this.props.closeOnScrimClick) this.close()
            }}
            style={styles.scrim}
          />
          <div
            aria-describedby={this.props['aria-describedby']}
            aria-labelledby={this.props['aria-labelledby'] || titleUniqueId}
            className={css({ ...styles.component, ...this.props.styles })}
            ref={(ref) => (this._component = ref)}
            role={this.props.role}
            tabIndex={0}
          >
            <header
              className={`mx-drawer-header ${css({
                ...styles.header,
                ...this.props.headerStyle,
              })}`}
            >
              <span style={styles.backArrow}>
                {this.props.showCloseButton && (
                  <Button
                    aria-label={closeButtonAriaLabel || `Close ${this.props.title} Drawer`}
                    buttonRef={(ref) => (this._closeButton = ref)}
                    className="mx-drawer-close"
                    icon="go-back"
                    onClick={this.close}
                    theme={theme}
                    type={'base'}
                  />
                )}
              </span>
              <h2 id={titleUniqueId} style={styles.title}>
                {this.props.title}
              </h2>
              <div className="mx-drawer-header-menu" style={styles.headerMenu}>
                {menu}
              </div>
            </header>
            <div
              className="mx-drawer-content"
              style={{ ...styles.content, ...this.props.contentStyle }}
            >
              {typeof this.props.children === 'function'
                ? this.props.children(this._getExposedDrawerFunctions())
                : this.props.children}
            </div>
          </div>
        </div>
      </MXFocusTrap>
    )
  }

  styles = (theme) => {
    const HEADER_HEIGHT = this._getHeaderHeight()

    return _merge(
      {},
      {
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
            width: '100%',
          },
          [`@media (min-width: ${this.state.breakPoints.large}px)`]: {
            width: this.props.maxWidth,
          },
        },
        componentWrapper: {
          bottom: 0,
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 999,
        },
        content: {
          backgroundColor: theme.Colors.WHITE,
          overflow: 'auto',
          height: `calc(100% - ${HEADER_HEIGHT})`,
        },
        scrim: {
          zIndex: 1000,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          textAlign: 'center',
          backgroundColor: this.props.showScrim ? theme.Colors.SCRIM : 'transparent',
        },
        icons: {
          color: theme.Colors.GRAY_500,
        },
        backArrow: {
          textAlign: 'left',
          width: '25%',
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
            padding: '0 10px',
          },
        },
        title: {
          flex: '1 0 auto',
          maxWidth: '90%',
          overflow: 'hidden',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        headerMenu: {
          textAlign: 'right',
          whiteSpace: 'nowrap',
          width: '25%',
        },
      },
      this.props.styles,
    )
  }
}

module.exports = withTheme(Drawer)
