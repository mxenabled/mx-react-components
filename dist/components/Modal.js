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

var PropTypes = require('prop-types');

var React = require('react');

var Button = require('./Button');

var Icon = require('./Icon');

var MXFocusTrap = require('../components/MXFocusTrap');

var _merge = require('lodash/merge');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      showTooltip: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleTooltipToggle", function (show) {
      _this.setState({
        showTooltip: show
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderTitleBar", function (styles) {
      if (_this.props.showTitleBar) {
        return React.createElement("div", {
          className: "mx-modal-title-bar",
          style: styles.titleBar
        }, _this.props.title);
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderFooter", function (styles, theme) {
      if (_this.props.showFooter) {
        return React.createElement("div", {
          className: "mx-modal-footer",
          style: _extends({}, styles.footer, _this.props.footerStyle)
        }, _this._renderTooltipIconAndLabel(styles, theme), _this._renderFooterContent(styles), React.createElement("div", {
          className: "mx-modal-buttons"
        }, _this.props.buttons.map(function (button, i) {
          return React.createElement(Button, {
            actionText: button.actionText,
            className: 'mx-modal-button ' + button.className,
            icon: button.icon,
            isActive: button.isActive,
            key: button.type + i,
            onClick: button.onClick,
            style: _extends({}, styles.button, button.style),
            theme: theme,
            type: button.type
          }, button.label);
        })));
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderFooterContent", function (styles) {
      return React.createElement("div", {
        className: "mx-modal-footer-content",
        style: styles.footerContent
      }, _this.props.footerContent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderTooltip", function (styles, theme) {
      if (_this.state.showTooltip) {
        return React.createElement("div", {
          style: styles.tooltip
        }, React.createElement("div", {
          className: "mx-modal-tooltip-title",
          style: _extends({}, styles.tooltipTitle, {
            color: theme.Colors.PRIMARY
          })
        }, _this.props.tooltipTitle), React.createElement("div", {
          className: "mx-modal-tooltip-content",
          style: styles.tooltipContent
        }, _this.props.tooltip));
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderTooltipIconAndLabel", function (styles, theme) {
      if (_this.props.tooltip) {
        return React.createElement("div", {
          className: "mx-modal-tooltip-label",
          style: styles.tooltipLabel
        }, React.createElement(Icon, {
          className: "mx-modal-tooltip-label-icon",
          elementProps: {
            onMouseOut: _this._handleTooltipToggle.bind(null, false),
            onMouseOver: _this._handleTooltipToggle.bind(null, true)
          },
          size: 18,
          style: {
            color: theme.Colors.PRIMARY
          },
          type: "info"
        }), React.createElement("span", {
          className: "mx-modal-tooltip-label-text",
          onMouseOut: _this._handleTooltipToggle.bind(null, false),
          onMouseOver: _this._handleTooltipToggle.bind(null, true),
          style: _extends({}, styles.tooltipLabelText, {
            color: theme.Colors.PRIMARY
          })
        }, _this.props.tooltipLabel));
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _merge({}, {
        scrim: {
          zIndex: 1000,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          textAlign: 'center'
        },
        relative: {
          position: 'absolute'
        },
        overlay: {
          backgroundColor: _this.props.showScrim ? theme.Colors.SCRIM : 'transparent'
        },
        close: {
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '-12px -12px 0 0',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent'
        },
        closeIcon: {
          color: theme.Colors.GRAY_700
        },
        container: {
          fontFamily: theme.FontFamily,
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1001,
          backgroundColor: theme.Colors.WHITE,
          boxShadow: theme.ShadowHigh,
          borderRadius: 2,
          top: 20,
          maxWidth: 'calc(100% - 40px)',
          display: 'inline-block',
          textAlign: 'left'
        },
        titleBar: {
          backgroundColor: theme.Colors.GRAY_100,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          padding: '15px 20px',
          color: theme.Colors.GRAY_500,
          fontSize: theme.FontSizes.SMALL,
          textTransform: 'uppercase',
          letterSpacing: 1
        },
        content: {
          position: 'relative',
          maxHeight: 'calc(100% - 140px)',
          overflow: 'auto'
        },
        footer: {
          backgroundColor: theme.Colors.GRAY_100,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between'
        },
        footerContent: {
          padding: '5px 0',
          textAlign: 'left'
        },
        tooltipLabel: {
          padding: '5px 0'
        },
        tooltipLabelText: {
          fontSize: theme.FontSizes.SMALL
        },
        tooltip: {
          backgroundColor: theme.Colors.GRAY_100,
          borderColor: theme.Colors.GRAY_300,
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
          bottom: 10,
          left: 10,
          position: 'absolute',
          width: 250,
          maxWidth: '100%',
          padding: 10
        },
        tooltipTitle: {
          fontSize: theme.FontSizes.MEDIUM,
          marginBottom: 5
        },
        tooltipContent: {
          color: theme.Colors.GRAY_500,
          fontSize: theme.FontSizes.SMALL,
          lineHeight: '1.5em',
          textAlign: 'left'
        },
        buttons: {
          textAlign: 'right'
        },
        button: {
          marginLeft: 5
        },
        small: {
          width: 400,
          textAlign: 'center'
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnLoad) this._modalContent.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);

      var mergedFocusTrapProps = _objectSpread({
        focusTrapOptions: {
          clickOutsideDeactivates: true,
          portalTo: this.props.portalTo
        }
      }, this.props.focusTrapProps);

      return React.createElement(MXFocusTrap, mergedFocusTrapProps, React.createElement("div", {
        className: "mx-modal",
        style: _extends({}, styles.scrim, this.props.isRelative && styles.relative)
      }, React.createElement("div", {
        className: "mx-modal-scrim",
        onClick: this.props.onRequestClose,
        style: _extends({}, styles.scrim, styles.overlay, this.props.isRelative && styles.relative)
      }), React.createElement("div", {
        style: _extends({}, styles.container, this.props.style)
      }, this._renderTitleBar(styles), React.createElement("div", {
        "aria-describedby": this.props['aria-describedby'],
        "aria-label": this.props['aria-label'],
        "aria-labelledby": this.props['aria-labelledby'],
        className: "mx-modal-content",
        ref: function ref(_ref) {
          return _this2._modalContent = _ref;
        },
        role: this.props.role,
        style: _extends({}, styles.content, this.props.contentStyle),
        tabIndex: 0
      }, this.props.children, this._renderTooltip(styles, theme)), this._renderFooter(styles, theme), this.props.showCloseIcon && React.createElement("button", {
        "aria-label": "Close Modal",
        className: "mx-modal-close",
        onClick: this.props.onRequestClose,
        onKeyUp: function onKeyUp(e) {
          return e.keyCode === 13 && _this2.props.onRequestClose();
        },
        role: "button",
        style: styles.close,
        tabIndex: 0
      }, React.createElement(Icon, {
        size: 24,
        style: styles.closeIcon,
        type: "close-solid"
      })))));
    }
  }]);

  return Modal;
}(React.Component);

_defineProperty(Modal, "propTypes", {
  'aria-describedby': PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    actionText: PropTypes.string,
    className: PropTypes.string,
    isActive: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    type: PropTypes.oneOf(['primary', 'secondary'])
  })),
  contentStyle: PropTypes.object,
  focusOnLoad: PropTypes.bool,
  focusTrapProps: PropTypes.object,
  footerContent: PropTypes.node,
  footerStyle: PropTypes.object,
  isRelative: PropTypes.bool,
  onRequestClose: PropTypes.func,
  portalTo: PropTypes.string,
  role: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  showFooter: PropTypes.bool,
  showScrim: PropTypes.bool,
  showTitleBar: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.object,
  theme: themeShape,
  title: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipLabel: PropTypes.string,
  tooltipTitle: PropTypes.string
});

_defineProperty(Modal, "defaultProps", {
  buttons: [],
  focusOnLoad: true,
  focusTrapProps: {},
  isRelative: false,
  role: 'dialog',
  showCloseIcon: true,
  showFooter: false,
  showScrim: true,
  showTitleBar: false,
  title: '',
  tooltip: null,
  tooltipLabel: '',
  tooltipTitle: null
});

module.exports = (0, _Theme.withTheme)(Modal);