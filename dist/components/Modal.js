'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var FocusTrap = require('focus-trap-react');

var Button = require('./Button');
var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showTooltip: false
    }, _this._handleTooltipToggle = function (show) {
      _this.setState({
        showTooltip: show
      });
    }, _this._renderTitleBar = function () {
      if (_this.props.showTitleBar) {
        var styles = _this.styles();

        return React.createElement(
          'div',
          { className: 'mx-modal-title-bar', style: styles.titleBar },
          _this.props.title
        );
      } else {
        return null;
      }
    }, _this._renderFooter = function () {
      if (_this.props.showFooter) {
        var styles = _this.styles();

        return React.createElement(
          'div',
          { className: 'mx-modal-footer', style: _extends({}, styles.footer, _this.props.footerStyle) },
          _this._renderTooltipIconAndLabel(),
          _this._renderFooterContent(),
          React.createElement(
            'div',
            { className: 'mx-modal-buttons' },
            _this.props.buttons.map(function (button, i) {
              return React.createElement(
                Button,
                {
                  actionText: button.actionText,
                  className: 'mx-modal-button ' + button.className,
                  icon: button.icon,
                  isActive: button.isActive,
                  key: button.type + i,
                  onClick: button.onClick,
                  primaryColor: button.primaryColor,
                  style: _extends({}, styles.button, button.style),
                  type: button.type
                },
                button.label
              );
            })
          )
        );
      } else {
        return null;
      }
    }, _this._renderFooterContent = function () {
      var styles = _this.styles();

      return React.createElement(
        'div',
        { className: 'mx-modal-footer-content', style: styles.footerContent },
        _this.props.footerContent
      );
    }, _this._renderTooltip = function () {
      if (_this.state.showTooltip) {
        var styles = _this.styles();

        return React.createElement(
          'div',
          { style: styles.tooltip },
          React.createElement(
            'div',
            { className: 'mx-modal-tooltip-title', style: _extends({}, styles.tooltipTitle, { color: _this.props.color }) },
            _this.props.tooltipTitle
          ),
          React.createElement(
            'div',
            { className: 'mx-modal-tooltip-content', style: styles.tooltipContent },
            _this.props.tooltip
          )
        );
      } else {
        return null;
      }
    }, _this._renderTooltipIconAndLabel = function () {
      if (_this.props.tooltip) {
        var styles = _this.styles();

        return React.createElement(
          'div',
          { className: 'mx-modal-tooltip-label', style: styles.tooltipLabel },
          React.createElement(Icon, {
            className: 'mx-modal-tooltip-label-icon',
            elementProps: {
              onMouseOut: _this._handleTooltipToggle.bind(null, false),
              onMouseOver: _this._handleTooltipToggle.bind(null, true)
            },
            size: 18,
            style: { color: _this.props.color },
            type: 'info'
          }),
          React.createElement(
            'span',
            {
              className: 'mx-modal-tooltip-label-text',
              onMouseOut: _this._handleTooltipToggle.bind(null, false),
              onMouseOver: _this._handleTooltipToggle.bind(null, true),
              style: _extends({}, styles.tooltipLabelText, { color: _this.props.color })
            },
            _this.props.tooltipLabel
          )
        );
      } else {
        return null;
      }
    }, _this.styles = function () {
      return {
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
          backgroundColor: _this.props.showScrim ? StyleConstants.Colors.SCRIM : 'transparent'
        },
        close: {
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '-12px -12px 0 0',
          cursor: 'pointer',
          color: StyleConstants.Colors.CHARCOAL
        },
        container: {
          fontFamily: StyleConstants.FontFamily,
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1001,
          backgroundColor: StyleConstants.Colors.WHITE,
          boxShadow: StyleConstants.ShadowHigh,
          borderRadius: 2,
          top: 20,
          maxWidth: 'calc(100% - 40px)',
          display: 'inline-block',
          textAlign: 'left'
        },
        titleBar: {
          backgroundColor: StyleConstants.Colors.PORCELAIN,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          padding: '15px 20px',
          color: StyleConstants.Colors.ASH,
          fontSize: StyleConstants.FontSizes.SMALL,
          textTransform: 'uppercase',
          letterSpacing: 1
        },
        content: {
          position: 'relative',
          maxHeight: 'calc(100% - 140px)',
          overflow: 'auto'
        },
        footer: {
          backgroundColor: StyleConstants.Colors.PORCELAIN,
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
          fontSize: StyleConstants.FontSizes.SMALL
        },
        tooltip: {
          backgroundColor: StyleConstants.Colors.PORCELAIN,
          borderColor: StyleConstants.Colors.FOG,
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
          fontSize: StyleConstants.FontSizes.MEDIUM,
          marginBottom: 5
        },
        tooltipContent: {
          color: StyleConstants.Colors.ASH,
          fontSize: StyleConstants.FontSizes.SMALL,
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
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._modalContent.focus();
      /*eslint-disable */
      if (this.props.hasOwnProperty('isOpen')) {
        console.warn('WARNING: The prop "isOpen" is deprecated in this version of the component. Please handle Modal opening from its parent.');
      }
      /*eslint-enable */
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();

      return React.createElement(
        FocusTrap,
        null,
        React.createElement(
          'div',
          { className: 'mx-modal', style: _extends({}, styles.scrim, this.props.isRelative && styles.relative) },
          React.createElement('div', { className: 'mx-modal-scrim', onClick: this.props.onRequestClose, style: _extends({}, styles.scrim, styles.overlay, this.props.isRelative && styles.relative) }),
          React.createElement(
            'div',
            {
              className: 'mx-modal-container',
              style: _extends({}, styles.container, this.props.style)
            },
            this._renderTitleBar(),
            React.createElement(
              'div',
              {
                'aria-label': this.props['aria-label'],
                className: 'mx-modal-content',
                ref: function ref(_ref2) {
                  return _this2._modalContent = _ref2;
                },
                style: _extends({}, styles.content, this.props.contentStyle),
                tabIndex: 0
              },
              this.props.children,
              this._renderTooltip()
            ),
            this._renderFooter(),
            this.props.showCloseIcon && React.createElement(Icon, {
              className: 'mx-modal-close',
              elementProps: {
                tabIndex: 0,
                'aria-label': 'Close Modal',
                role: 'button',
                onClick: this.props.onRequestClose,
                onKeyUp: function onKeyUp(e) {
                  return e.keyCode === 13 && _this2.props.onRequestClose();
                }
              },
              size: 24,
              style: styles.close,
              type: 'close-solid'
            })
          )
        )
      );
    }
  }]);

  return Modal;
}(React.Component);

Modal.propTypes = {
  'aria-label': PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    actionText: PropTypes.string,
    className: PropTypes.string,
    isActive: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.oneOf(['primary', 'secondary'])
  })),
  color: PropTypes.string,
  contentStyle: PropTypes.object,
  footerContent: PropTypes.node,
  footerStyle: PropTypes.object,
  isRelative: PropTypes.bool,
  onRequestClose: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  showFooter: PropTypes.bool,
  showScrim: PropTypes.bool,
  showTitleBar: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipLabel: PropTypes.string,
  tooltipTitle: PropTypes.string
};
Modal.defaultProps = {
  'aria-label': '',
  buttons: [],
  color: StyleConstants.Colors.PRIMARY,
  isRelative: false,
  showCloseIcon: true,
  showFooter: false,
  showScrim: true,
  showTitleBar: false,
  title: '',
  tooltip: null,
  tooltipLabel: '',
  tooltipTitle: null
};


module.exports = Modal;