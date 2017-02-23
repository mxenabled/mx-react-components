'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _isNumber = require('lodash/isNumber');

var _require = require('radium'),
    StyleRoot = _require.StyleRoot;

var React = require('react');
var Velocity = require('velocity-animate');
var _throttle = require('lodash/throttle');
var _merge = require('lodash/merge');

var Button = require('../components/Button');

var StyleConstants = require('../constants/Style');

var Drawer = React.createClass({
  displayName: 'Drawer',

  propTypes: {
    animateLeftDistance: React.PropTypes.number,
    breakPoints: React.PropTypes.shape({
      large: React.PropTypes.number,
      medium: React.PropTypes.number
    }),
    buttonPrimaryColor: React.PropTypes.string,
    closeOnScrimClick: React.PropTypes.bool,
    contentStyle: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    headerMenu: React.PropTypes.element,
    headerStyle: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
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

  getDefaultProps: function getDefaultProps() {
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
  componentWillMount: function componentWillMount() {
    this._resizeThrottled = _throttle(this._resize, 100);
  },
  componentDidMount: function componentDidMount() {
    this._animateComponent({ left: this._getAnimationDistance() });
    window.addEventListener('resize', this._resizeThrottled);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._resizeThrottled);
  },
  _getAnimationDistance: function _getAnimationDistance() {
    if (_isNumber(this.props.animateLeftDistance)) {
      return this.props.animateLeftDistance + '%';
    }

    var windowWidth = window.innerWidth;

    if (windowWidth >= this.props.breakPoints.large) {
      //Resolution - maxWidth
      return windowWidth - this.props.maxWidth;
    } else if (windowWidth <= this.props.breakPoints.medium) {
      //All the way over to the left
      return 0;
    } else {
      //20% from the left
      var newLeft = windowWidth * 0.2;

      return Math.max(newLeft, windowWidth - this.props.maxWidth);
    }
  },


  /**
   * Animate the Drawer closed and then call the onClose callback.
   *
   * @returns {Promise} that is resolved when the animation finishes
   */
  close: function close() {
    var _this = this;

    return this._animateComponent({ left: '100%' }).then(function () {
      _this.props.onClose();
    });
  },
  _animateComponent: function _animateComponent(transition, extraOptions) {
    var el = this._component;
    var options = _extends({
      duration: this.props.duration,
      easing: this.props.easing
    }, extraOptions);

    return Velocity(el, transition, options);
  },
  _resize: function _resize() {
    this._animateComponent({ left: this._getAnimationDistance() }, { duration: 0 });
  },
  _renderNav: function _renderNav() {
    var styles = this.styles();

    return React.createElement(
      'nav',
      { style: styles.nav },
      React.createElement(Button, {
        icon: 'caret-left',
        onClick: this.props.navConfig.onPreviousClick,
        primaryColor: this.props.buttonPrimaryColor,
        type: 'base'
      }),
      React.createElement(
        'span',
        { style: styles.navLabel },
        this.props.navConfig.label
      ),
      React.createElement(Button, {
        icon: 'caret-right',
        onClick: this.props.navConfig.onNextClick,
        primaryColor: this.props.buttonPrimaryColor,
        type: 'base'
      })
    );
  },
  render: function render() {
    var _this2 = this;

    var styles = this.styles();

    return React.createElement(
      StyleRoot,
      null,
      React.createElement(
        'div',
        { style: styles.componentWrapper },
        React.createElement('div', { onClick: this.props.closeOnScrimClick && this.close, style: styles.scrim }),
        React.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this2._component = _ref;
            }, style: _extends({}, styles.component, this.props.style) },
          React.createElement(
            'header',
            { style: _extends({}, styles.header, this.props.headerStyle) },
            React.createElement(
              'span',
              { style: styles.backArrow },
              this.props.showCloseButton && React.createElement(Button, {
                icon: 'arrow-left',
                onClick: this.close,
                primaryColor: this.props.buttonPrimaryColor,
                type: 'base'
              })
            ),
            React.createElement(
              'span',
              { style: styles.title },
              this.props.title
            ),
            React.createElement(
              'div',
              { style: styles.headerMenu },
              this.props.headerMenu ? this.props.headerMenu : this.props.navConfig && this._renderNav()
            )
          ),
          React.createElement(
            'div',
            { style: _extends({}, styles.content, this.props.contentStyle) },
            this.props.children
          )
        )
      )
    );
  },
  styles: function styles() {
    var _component;

    return _merge({}, {
      component: (_component = {
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
        boxShadow: StyleConstants.ShadowHigh

      }, _defineProperty(_component, '@media (max-width: ' + this.props.breakPoints.medium + 'px)', {
        width: '100%'
      }), _defineProperty(_component, '@media (min-width: ' + this.props.breakPoints.large + 'px)', {
        width: this.props.maxWidth
      }), _component),
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
      backArrow: _defineProperty({
        paddingLeft: 20,
        textAlign: 'left',
        width: '25%'

      }, '@media (max-width: ' + this.props.breakPoints.medium + 'px)', {
        paddingLeft: 10
      }),
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