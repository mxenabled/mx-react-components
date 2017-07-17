'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _isNumber = require('lodash/isNumber');
var PropTypes = require('prop-types');

var _require = require('radium'),
    StyleRoot = _require.StyleRoot;

var FocusTrap = require('focus-trap-react');
var React = require('react');
var Velocity = require('velocity-animate');
var _throttle = require('lodash/throttle');
var _merge = require('lodash/merge');

var Button = require('../components/Button');

var StyleConstants = require('../constants/Style');

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Drawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this._getAnimationDistance = function () {
      if (_isNumber(_this.props.animateLeftDistance)) {
        return _this.props.animateLeftDistance + '%';
      }

      var windowWidth = window.innerWidth;

      if (windowWidth >= _this.props.breakPoints.large) {
        //Resolution - maxWidth
        return windowWidth - _this.props.maxWidth;
      } else if (windowWidth <= _this.props.breakPoints.medium) {
        //All the way over to the left
        return 0;
      } else {
        //20% from the left
        var newLeft = windowWidth * 0.2;

        return Math.max(newLeft, windowWidth - _this.props.maxWidth);
      }
    }, _this.close = function () {
      return _this._animateComponent({ left: '100%' }).then(function () {
        _this.props.onClose();
      });
    }, _this._animateComponent = function (transition, extraOptions) {
      var el = _this._component;
      var options = _extends({
        duration: _this.props.duration,
        easing: _this.props.easing
      }, extraOptions);

      return Velocity(el, transition, options);
    }, _this._resize = function () {
      _this._animateComponent({ left: _this._getAnimationDistance() }, { duration: 0 });
    }, _this._renderNav = function () {
      var styles = _this.styles();

      return React.createElement(
        'nav',
        { style: styles.nav },
        React.createElement(Button, {
          icon: 'caret-left',
          onClick: _this.props.navConfig.onPreviousClick,
          primaryColor: _this.props.buttonPrimaryColor,
          type: 'base'
        }),
        React.createElement(
          'span',
          { style: styles.navLabel },
          _this.props.navConfig.label
        ),
        React.createElement(Button, {
          icon: 'caret-right',
          onClick: _this.props.navConfig.onNextClick,
          primaryColor: _this.props.buttonPrimaryColor,
          type: 'base'
        })
      );
    }, _this.styles = function () {
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
          backgroundColor: StyleConstants.Colors.PORCELAIN,
          boxShadow: StyleConstants.ShadowHigh

        }, _defineProperty(_component, '@media (max-width: ' + _this.props.breakPoints.medium + 'px)', {
          width: '100%'
        }), _defineProperty(_component, '@media (min-width: ' + _this.props.breakPoints.large + 'px)', {
          width: _this.props.maxWidth
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
          backgroundColor: _this.props.showScrim ? StyleConstants.Colors.SCRIM : 'transparent'
        },
        icons: {
          color: StyleConstants.Colors.ASH
        },
        backArrow: _defineProperty({
          paddingLeft: 20,
          textAlign: 'left',
          width: '25%'

        }, '@media (max-width: ' + _this.props.breakPoints.medium + 'px)', {
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
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Drawer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._resizeThrottled = _throttle(this._resize, 100);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._animateComponent({ left: this._getAnimationDistance() });
      window.addEventListener('resize', this._resizeThrottled);
      this._component.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._resizeThrottled);
    }

    /**
     * Animate the Drawer closed and then call the onClose callback.
     *
     * @returns {Promise} that is resolved when the animation finishes
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();

      return React.createElement(
        StyleRoot,
        null,
        React.createElement(
          FocusTrap,
          null,
          React.createElement(
            'div',
            { style: styles.componentWrapper },
            React.createElement('div', { onClick: this.props.closeOnScrimClick && this.close, style: styles.scrim }),
            React.createElement(
              'div',
              {
                'aria-label': this.props.title,
                ref: function ref(_ref2) {
                  return _this2._component = _ref2;
                },
                role: 'dialog',
                style: _extends({}, styles.component, this.props.style),
                tabIndex: 0
              },
              React.createElement(
                'header',
                { style: _extends({}, styles.header, this.props.headerStyle) },
                React.createElement(
                  'span',
                  { style: styles.backArrow },
                  this.props.showCloseButton && React.createElement(
                    Button,
                    {
                      icon: 'arrow-left',
                      onClick: this.close,
                      primaryColor: this.props.buttonPrimaryColor,
                      type: 'base'
                    },
                    React.createElement(
                      'span',
                      { className: 'visuallyHidden', style: styles.visuallyHidden },
                      'Close Drawer'
                    )
                  )
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
        )
      );
    }
  }]);

  return Drawer;
}(React.Component);

Drawer.propTypes = {
  animateLeftDistance: PropTypes.number,
  breakPoints: PropTypes.shape({
    large: PropTypes.number,
    medium: PropTypes.number
  }),
  buttonPrimaryColor: PropTypes.string,
  closeOnScrimClick: PropTypes.bool,
  contentStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  duration: PropTypes.number,
  easing: PropTypes.array,
  headerMenu: PropTypes.element,
  headerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
  title: PropTypes.string
};
Drawer.defaultProps = {
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


module.exports = Drawer;