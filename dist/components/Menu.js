'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Icon = require('../components/Icon');

var StyleConstants = require('../constants/Style');

var Menu = React.createClass({
  displayName: 'Menu',

  propTypes: {
    alignItems: React.PropTypes.oneOf(['left', 'right']),
    isOpen: React.PropTypes.bool,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      icon: React.PropTypes.string,
      label: React.PropTypes.string,
      onClick: React.PropTypes.func
    })).isRequired,
    onClick: React.PropTypes.func,
    primaryColor: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      alignItems: 'left',
      primaryColor: StyleConstants.Colors.PRIMARY,
      isOpen: false,
      onClick: function onClick() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      hoverItemIndex: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!nextProps.isOpen) {
      this.setState({
        hoverItemIndex: null
      });
    }
  },
  _handleMouseOver: function _handleMouseOver(hoverItemIndex) {
    this.setState({
      hoverItemIndex: hoverItemIndex
    });
  },
  _handleMouseOut: function _handleMouseOut() {
    this.setState({
      hoverItemIndex: null
    });
  },
  _renderItems: function _renderItems() {
    var _this = this;

    var styles = this.styles();

    return this.props.items.map(function (item, index) {
      return React.createElement(
        'div',
        {
          key: item.label,
          onClick: item.onClick,
          onMouseOut: _this._handleMouseOut,
          onMouseOver: _this._handleMouseOver.bind(null, index),
          style: _extends({}, styles.menuItem, {
            backgroundColor: index === _this.state.hoverItemIndex ? _this.props.primaryColor : 'transparent',
            color: index === _this.state.hoverItemIndex ? StyleConstants.Colors.WHITE : StyleConstants.Colors.ASH
          })
        },
        React.createElement(Icon, {
          size: 20,
          style: _extends({}, styles.itemIcon, { fill: index === _this.state.hoverItemIndex ? StyleConstants.Colors.WHITE : StyleConstants.Colors.CHARCOAL }),
          type: item.icon
        }),
        React.createElement(
          'span',
          { style: styles.itemLabel },
          item.label
        )
      );
    });
  },
  render: function render() {
    var _props = this.props,
        isOpen = _props.isOpen,
        alignItems = _props.alignItems;

    var styles = this.styles();

    return React.createElement(
      'div',
      {
        onClick: this.props.onClick,
        style: _extends({}, styles.component, this.props.style)
      },
      React.createElement(
        'div',
        { style: styles.dotsWrapper },
        React.createElement(Icon, {
          size: 20,
          style: styles.menuIcon,
          type: 'kabob_horizontal'
        })
      ),
      isOpen ? React.createElement(
        'div',
        { style: _extends({}, styles.menu, alignItems === 'right' ? { right: 3 } : { left: 3 }) },
        this._renderItems()
      ) : null
    );
  },
  styles: function styles() {
    return {
      component: {
        display: 'block',
        position: 'relative',
        width: 40
      },
      dotsWrapper: {
        backgroundColor: this.props.isOpen ? StyleConstants.Colors.PORCELAIN : 'transparent',
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        cursor: 'pointer',
        margin: 3,
        padding: 6
      },
      menu: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        position: 'absolute',
        top: 40,
        padding: 10,
        maxWidth: 260,
        zIndex: 10
      },
      menuIcon: {
        fill: this.props.primaryColor
      },
      menuItem: {
        color: StyleConstants.Colors.ASH,
        cursor: 'pointer',
        marginRight: 5,
        whiteSpace: 'nowrap'
      },
      itemIcon: {
        padding: '10px 5px',
        opacity: 0.5
      },
      itemLabel: {
        paddingRight: 10,
        position: 'relative',
        top: 3
      }
    };
  }
});

module.exports = Menu;