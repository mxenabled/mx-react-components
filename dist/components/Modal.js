'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Button = require('./Button');
var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Modal = React.createClass({
  displayName: 'Modal',

  propTypes: {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      actionText: React.PropTypes.string,
      className: React.PropTypes.string,
      isActive: React.PropTypes.bool,
      icon: React.PropTypes.string,
      label: React.PropTypes.string,
      onClick: React.PropTypes.func,
      primaryColor: React.PropTypes.string,
      style: React.PropTypes.object,
      type: React.PropTypes.oneOf(['primary', 'secondary'])
    })),
    color: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    footerContent: React.PropTypes.node,
    footerStyle: React.PropTypes.object,
    isRelative: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    showCloseIcon: React.PropTypes.bool,
    showFooter: React.PropTypes.bool,
    showScrim: React.PropTypes.bool,
    showTitleBar: React.PropTypes.bool,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    tooltipLabel: React.PropTypes.string,
    tooltipTitle: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
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
  },
  getInitialState: function getInitialState() {
    return {
      showTooltip: false
    };
  },
  componentDidMount: function componentDidMount() {
    /*eslint-disable */
    if (this.props.hasOwnProperty('isOpen')) {
      console.warn('WARNING: The prop "isOpen" is deprecated in this version of the component. Please handle Modal opening from its parent.');
    }
    /*eslint-enable */
  },
  _handleTooltipToggle: function _handleTooltipToggle(show) {
    this.setState({
      showTooltip: show
    });
  },
  _renderTitleBar: function _renderTitleBar() {
    if (this.props.showTitleBar) {
      var styles = this.styles();

      return React.createElement(
        'div',
        { className: 'mx-modal-title-bar', style: styles.titleBar },
        this.props.title
      );
    } else {
      return null;
    }
  },
  _renderFooter: function _renderFooter() {
    var _this = this;

    if (this.props.showFooter) {
      var _ret = function () {
        var styles = _this.styles();

        return {
          v: React.createElement(
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
          )
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return null;
    }
  },
  _renderFooterContent: function _renderFooterContent() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { className: 'mx-modal-footer-content', style: styles.footerContent },
      this.props.footerContent
    );
  },
  _renderTooltip: function _renderTooltip() {
    if (this.state.showTooltip) {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.tooltip },
        React.createElement(
          'div',
          { className: 'mx-modal-tooltip-title', style: _extends({}, styles.tooltipTitle, { color: this.props.color }) },
          this.props.tooltipTitle
        ),
        React.createElement(
          'div',
          { className: 'mx-modal-tooltip-content', style: styles.tooltipContent },
          this.props.tooltip
        )
      );
    } else {
      return null;
    }
  },
  _renderTooltipIconAndLabel: function _renderTooltipIconAndLabel() {
    if (this.props.tooltip) {
      var styles = this.styles();

      return React.createElement(
        'div',
        { className: 'mx-modal-tooltip-label', style: styles.tooltipLabel },
        React.createElement(Icon, {
          className: 'mx-modal-tooltip-label-icon',
          elementProps: {
            onMouseOut: this._handleTooltipToggle.bind(null, false),
            onMouseOver: this._handleTooltipToggle.bind(null, true)
          },
          size: 18,
          style: { color: this.props.color },
          type: 'info'
        }),
        React.createElement(
          'span',
          {
            className: 'mx-modal-tooltip-label-text',
            onMouseOut: this._handleTooltipToggle.bind(null, false),
            onMouseOver: this._handleTooltipToggle.bind(null, true),
            style: _extends({}, styles.tooltipLabelText, { color: this.props.color })
          },
          this.props.tooltipLabel
        )
      );
    } else {
      return null;
    }
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { className: 'mx-modal', style: _extends({}, styles.scrim, this.props.isRelative && styles.relative) },
      React.createElement('div', { className: 'mx-modal-scrim', onClick: this.props.onRequestClose, style: _extends({}, styles.scrim, styles.overlay, this.props.isRelative && styles.relative) }),
      React.createElement(
        'div',
        {
          className: 'mx-modal-container',
          style: _extends({}, styles.container, this.props.style)
        },
        this.props.showCloseIcon ? React.createElement(Icon, {
          className: 'mx-modal-close',
          elementProps: {
            onClick: this.props.onRequestClose
          },
          size: 24,
          style: styles.close,
          type: 'close-solid'
        }) : null,
        this._renderTitleBar(),
        React.createElement(
          'div',
          { className: 'mx-modal-content', style: _extends({}, styles.content, this.props.contentStyle) },
          this.props.children,
          this._renderTooltip()
        ),
        this._renderFooter()
      )
    );
  },
  styles: function styles() {
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
        backgroundColor: this.props.showScrim ? StyleConstants.Colors.SCRIM : 'transparent'
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
  }
});

module.exports = Modal;