"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _get = require('lodash/get');

var _isEqual = require('lodash/isEqual');

var _isNumber = require('lodash/isNumber');

var _merge = require('lodash/merge');

var _throttle = require('lodash/throttle');

var _uniqueId = require('lodash/uniqueId');

var keycode = require('keycode');

var PropTypes = require('prop-types');

var React = require('react');

var Velocity = require('velocity-animate');

var _require = require('radium'),
    StyleRoot = _require.StyleRoot;

var Button = require('../components/Button');

var MXFocusTrap = require('../components/MXFocusTrap');

var _require2 = require('../constants/App'),
    themeShape = _require2.themeShape;

var StyleUtils = require('../utils/Style');

var Drawer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Drawer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getAnimationDistance", function () {
      if (_isNumber(_this.props.animateLeftDistance)) {
        return _this.props.animateLeftDistance + '%';
      }

      var windowWidth = window.innerWidth;

      if (windowWidth >= _this.state.breakPoints.large) {
        //Resolution - maxWidth
        return windowWidth - _this.props.maxWidth;
      } else if (windowWidth <= _this.state.breakPoints.medium) {
        //All the way over to the left
        return 0;
      } else {
        //20% from the left
        var newLeft = windowWidth * 0.2;
        return Math.max(newLeft, windowWidth - _this.props.maxWidth);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getExposedDrawerFunctions", function () {
      return {
        close: _this.close
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getHeaderHeight", function () {
      return _get(_this.props, ['headerStyle', 'height'], _get(_this.props, ['styles', 'header', 'height'], '50px'));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function () {
      _this.props.beforeClose();

      if (_this.props.animateOnClose) {
        return _this._animateComponent({
          left: '100%'
        }).then(function () {
          _this.props.onClose();
        });
      } else {
        // To keep close's api normalized we return a promise just
        // as the _animateComponent function does above.
        return Promise.resolve().then(function () {
          _this.props.onClose();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "open", function () {
      return _this._animateComponent({
        left: _this._getAnimationDistance()
      }).then(function () {
        _this.props.onOpen();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_animateComponent", function (transition, extraOptions) {
      var el = _this._component;

      var options = _extends({
        duration: _this.props.duration,
        easing: _this.props.easing
      }, extraOptions);

      return Velocity(el, transition, options);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleKeyUp", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (keycode(e) === 'esc') _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_resize", function () {
      _this._animateComponent({
        left: _this._getAnimationDistance()
      }, {
        duration: 0
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var _component;

      var HEADER_HEIGHT = _this._getHeaderHeight();

      return _merge({}, {
        component: (_component = {
          border: '1px solid ' + theme.Colors.GRAY_300,
          boxSizing: 'border-box',
          zIndex: 1001,
          top: 0,
          bottom: 0,
          left: '100%',
          position: 'absolute',
          width: '80%',
          backgroundColor: theme.Colors.GRAY_100,
          boxShadow: theme.ShadowHigh
        }, _defineProperty(_component, "@media (max-width: ".concat(_this.state.breakPoints.medium, "px)"), {
          width: '100%'
        }), _defineProperty(_component, "@media (min-width: ".concat(_this.state.breakPoints.large, "px)"), {
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
          backgroundColor: theme.Colors.WHITE,
          overflow: 'auto',
          height: "calc(100% - ".concat(HEADER_HEIGHT, ")")
        },
        scrim: {
          zIndex: 1000,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          textAlign: 'center',
          backgroundColor: _this.props.showScrim ? theme.Colors.SCRIM : 'transparent'
        },
        icons: {
          color: theme.Colors.GRAY_500
        },
        backArrow: {
          textAlign: 'left',
          width: '25%'
        },
        header: _defineProperty({
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
          boxSizing: 'border-box'
        }, "@media (max-width: ".concat(_this.state.breakPoints.medium, "px)"), {
          padding: '0 10px'
        }),
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
        }
      }, _this.props.styles);
    });

    var _theme = StyleUtils.mergeTheme(props.theme);

    var breakPoints = props.breakPoints || _theme.BreakPoints;
    _this.state = {
      breakPoints: breakPoints,
      theme: _theme
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this._resizeThrottled = _throttle(this._resize, 100);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.open();
      window.addEventListener('resize', this._resizeThrottled);

      if (this.props.focusOnLoad) {
        // Close button might not be present depending on showCloseButton Prop
        if (this.props.showCloseButton && this._closeButton) {
          this._closeButton.focus(); // Fall back to focusing the component if no close button

        } else if (this._component) {
          this._component.focus();
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (!_isEqual(newProps.breakPoints, this.props.breakPoints)) {
        this.setState({
          breakPoints: this.props.breakPoints
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._resizeThrottled);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = this.state.theme;
      var styles = this.styles(theme);
      var _this$props = this.props,
          closeButtonAriaLabel = _this$props.closeButtonAriaLabel,
          headerMenu = _this$props.headerMenu,
          focusTrapProps = _this$props.focusTrapProps,
          portalTo = _this$props.portalTo;

      var mergedFocusTrapProps = _objectSpread({
        focusTrapOptions: {
          clickOutsideDeactivates: true,
          portalTo: portalTo
        },
        paused: false
      }, focusTrapProps);

      var menu = typeof headerMenu === 'function' ? headerMenu(this._getExposedDrawerFunctions()) : headerMenu;

      var titleUniqueId = _uniqueId('mx-drawer-title-');

      return React.createElement(StyleRoot, null, React.createElement(MXFocusTrap, mergedFocusTrapProps, React.createElement("div", {
        className: "mx-drawer",
        onKeyUp: typeof this.props.onKeyUp === 'function' ? this.props.onKeyUp : this._handleKeyUp,
        style: styles.componentWrapper
      }, React.createElement("div", {
        className: "mx-drawer-scrim",
        onClick: function onClick() {
          if (_this2.props.closeOnScrimClick) _this2.close();
        },
        style: styles.scrim
      }), React.createElement("div", {
        "aria-describedby": this.props['aria-describedby'],
        "aria-labelledby": this.props['aria-labelledby'] || titleUniqueId,
        ref: function ref(_ref) {
          return _this2._component = _ref;
        },
        role: this.props.role,
        style: _objectSpread({}, styles.component, this.props.style),
        tabIndex: 0
      }, React.createElement("header", {
        className: "mx-drawer-header",
        style: _objectSpread({}, styles.header, this.props.headerStyle)
      }, React.createElement("span", {
        style: styles.backArrow
      }, this.props.showCloseButton && React.createElement(Button, {
        "aria-label": closeButtonAriaLabel || "Close ".concat(this.props.title, " Drawer"),
        buttonRef: function buttonRef(ref) {
          return _this2._closeButton = ref;
        },
        className: "mx-drawer-close",
        icon: "go-back",
        onClick: this.close,
        theme: theme,
        type: 'base'
      })), React.createElement("h2", {
        id: titleUniqueId,
        style: styles.title
      }, this.props.title), React.createElement("div", {
        className: "mx-drawer-header-menu",
        style: styles.headerMenu
      }, menu)), React.createElement("div", {
        className: "mx-drawer-content",
        style: _objectSpread({}, styles.content, this.props.contentStyle)
      }, typeof this.props.children === 'function' ? this.props.children(this._getExposedDrawerFunctions()) : this.props.children)))));
    }
  }]);

  return Drawer;
}(React.Component);

_defineProperty(Drawer, "propTypes", {
  'aria-describedby': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  animateLeftDistance: PropTypes.number,
  animateOnClose: PropTypes.bool,
  beforeClose: PropTypes.func,
  breakPoints: PropTypes.shape({
    large: PropTypes.number,
    medium: PropTypes.number
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
  title: PropTypes.string
});

_defineProperty(Drawer, "defaultProps", {
  animateOnClose: true,
  beforeClose: function beforeClose() {},
  closeOnScrimClick: true,
  duration: 500,
  easing: [0.28, 0.14, 0.34, 1.04],
  focusOnLoad: true,
  focusTrapProps: {},
  maxWidth: 960,
  onOpen: function onOpen() {},
  role: 'dialog',
  showCloseButton: true,
  showScrim: true,
  title: ''
});

module.exports = (0, _Theme.withTheme)(Drawer);